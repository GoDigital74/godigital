// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Force Node runtime so the in-memory rate limiter behaves predictably.
export const runtime = "nodejs";

/* ------------------------------------------------------------------ */
/* 1. Rate limiting (in-memory)                                        */
/* ------------------------------------------------------------------ */
// NOTE: on serverless this resets per cold start and isn't shared across
// instances. It still kills the "same bot hammers one lambda" case. If spam
// volume is high, swap this for @upstash/ratelimit + Vercel KV.

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3; // submissions per IP per hour
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Cheap cleanup so the map can't grow forever.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t > RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

/* ------------------------------------------------------------------ */
/* 2. Origin check                                                     */
/* ------------------------------------------------------------------ */
// Browsers always attach Origin to a POST; curl/python scripts usually don't.
// The allowlist is built from server-side env only — never from the request's
// own Host header, which a script can set to anything it likes.

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;

  // Any localhost port in dev, so `next dev --port 3001` still works.
  if (
    process.env.NODE_ENV === "development" &&
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
  ) {
    return true;
  }

  const allowed = [
    "https://godigitalagency.in",
    "https://www.godigitalagency.in",
    process.env.NEXT_PUBLIC_SITE_URL,
    // Vercel injects these; they cover preview deploys without hardcoding.
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`,
    process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.NODE_ENV === "development" && "http://localhost:3000",
  ].filter((v): v is string => typeof v === "string" && v.length > 0);

  return allowed.includes(origin);
}

/* ------------------------------------------------------------------ */
/* 3. Cloudflare Turnstile                                             */
/* ------------------------------------------------------------------ */

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY missing — skipping captcha check.");
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
        signal: AbortSignal.timeout(8000),
      }
    );
    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (!data.success) console.warn("Turnstile rejected:", data["error-codes"]);
    return data.success === true;
  } catch (err) {
    console.error("Turnstile request failed:", err);
    return false; // fail closed — a bot shouldn't benefit from an outage
  }
}

/* ------------------------------------------------------------------ */
/* 4. Spam heuristics                                                  */
/* ------------------------------------------------------------------ */

// Keyword lists are deliberately split. GoDigital *sells* SEO, ranking and web
// design, so those words are what genuine leads say — scoring them as spam
// would eat real business. Only the outreach-spam phrasing gets weighted.

/** Essentially never appears in a real inquiry to this agency. */
const SPAM_KEYWORDS_STRONG = [
  "viagra", "cialis", "escort", "casino", "payday loan", "porn",
  "cheap traffic", "buy followers", "bulk email", "mass dm",
];

/** Suspicious in aggregate, but individually plausible from a real client. */
const SPAM_KEYWORDS_SOFT = [
  "rank #1", "rank you", "guaranteed ranking", "increase sales guaranteed",
  "guest post", "backlink", "dofollow", "crypto", "bitcoin", "forex",
  "telegram", "whatsapp me",
];

/** Gmail ignores dots and everything after `+`. Normalize so aliases collapse. */
function normalizeEmail(email: string): string {
  const [rawLocal, rawDomain] = email.toLowerCase().trim().split("@");
  if (!rawDomain) return email.toLowerCase().trim();

  let local = rawLocal.split("+")[0];
  if (rawDomain === "gmail.com" || rawDomain === "googlemail.com") {
    local = local.replace(/\./g, "");
    return `${local}@gmail.com`;
  }
  return `${local}@${rawDomain}`;
}

interface SpamResult {
  score: number;
  reasons: string[];
}

function scoreSubmission(
  firstName: string,
  lastName: string,
  email: string,
  message: string
): SpamResult {
  let score = 0;
  const reasons: string[] = [];
  const add = (points: number, why: string) => {
    score += points;
    reasons.push(`${why} (+${points})`);
  };

  const fullName = `${firstName} ${lastName}`.trim();
  const msg = message.trim();
  const lowerMsg = msg.toLowerCase();

  // Message is nothing but a phone number / digit blob — the exact pattern
  // in the spam that prompted this.
  if (/^[\d\s()+.\-]{6,}$/.test(msg)) add(6, "message is only digits");

  // Real inquiries are basically never this short.
  if (msg.length < 15) add(2, "message under 15 chars");

  // Link dropping.
  const links = msg.match(/https?:\/\/|www\.|\[url|href\s*=/gi);
  if (links) add(3 * links.length, `${links.length} link(s) in message`);

  // Gibberish name: long consonant runs like "Diqrxjhxy". `y` is excluded from
  // the run because it acts as a vowel in plenty of real names (Vyshnavi,
  // Jyoti) — including it produced false positives at 5+.
  if (/[bcdfghjklmnpqrstvwxz]{6,}/i.test(fullName))
    add(4, "consonant run in name");

  // A name part with no vowel at all (skip short names like "Ng", "Wu").
  for (const part of [firstName, lastName]) {
    if (part.length >= 4 && !/[aeiouy]/i.test(part))
      add(3, `no vowels in "${part}"`);
  }

  if (/\d/.test(fullName)) add(3, "digits in name");

  // Cyrillic / CJK in a name on an English-language site.
  if (/[\u0400-\u04FF\u4E00-\u9FFF]/.test(fullName)) add(2, "non-latin name");

  const [local = "", domain = ""] = email.toLowerCase().split("@");

  // Gmail dot abuse: zi.j.e.ruhog.ev8.5@gmail.com
  if (
    (domain === "gmail.com" || domain === "googlemail.com") &&
    (local.match(/\./g) ?? []).length >= 3
  ) {
    add(4, "gmail dot-alias abuse");
  }

  // Random-looking local part: digits jammed into letters, no real words.
  if (/^[a-z]{2,}\d+[a-z]*\d*$/.test(local.replace(/\./g, "")) && local.length > 12)
    add(2, "random-looking email local part");

  for (const kw of SPAM_KEYWORDS_STRONG) {
    if (lowerMsg.includes(kw)) add(5, `spam keyword "${kw}"`);
  }
  for (const kw of SPAM_KEYWORDS_SOFT) {
    if (lowerMsg.includes(kw)) add(2, `soft keyword "${kw}"`);
  }

  return { score, reasons };
}

const SPAM_THRESHOLD = 6;

/* ------------------------------------------------------------------ */
/* 5. Handler                                                          */
/* ------------------------------------------------------------------ */

// Generic reply for every rejection. Never tell a bot *why* it failed — that's
// free debugging info for whoever is tuning the script. These are functions,
// not shared constants: a NextResponse body can only be consumed once, so
// reusing one instance would break every request after the first.
const reject = () =>
  NextResponse.json(
    { error: "We couldn't send your message. Please check your details and try again." },
    { status: 400 }
  );

/** Pretend it worked. Used when we're confident it's a bot. */
const silentDrop = () => NextResponse.json({ success: true });

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    /* --- Origin check: block direct POSTs from curl/scripts --- */
    const origin = request.headers.get("origin");
    if (!isAllowedOrigin(origin)) {
      console.warn("Blocked: bad origin", { origin, ip });
      return reject();
    }

    /* --- Rate limit --- */
    if (isRateLimited(ip)) {
      console.warn("Blocked: rate limit", { ip });
      return NextResponse.json(
        { error: "Too many messages from this connection. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      firstName = "",
      lastName = "",
      email = "",
      message = "",
      website = "", // honeypot — must stay empty
      company = "", // second honeypot name, kept for older cached bundles
      startedAt, // client timestamp (ms) from when the form mounted
      turnstileToken = "",
    } = body ?? {};

    /* --- Honeypot --- */
    // `website` rather than `company`: Chrome autofills organization fields
    // from the saved address profile, which would silently drop real leads.
    for (const [field, value] of [
      ["website", website],
      ["company", company],
    ] as const) {
      if (typeof value === "string" && value.trim() !== "") {
        console.warn("Blocked: honeypot filled", { ip, field });
        return silentDrop();
      }
    }

    /* --- Timing trap: humans don't fill a 4-field form in 3 seconds --- */
    const elapsed = Date.now() - Number(startedAt ?? 0);
    if (!startedAt || Number.isNaN(elapsed) || elapsed < 3000) {
      console.warn("Blocked: submitted too fast", { ip, elapsed });
      return reject();
    }
    // Stale form / replayed payload (older than 3 hours).
    if (elapsed > 3 * 60 * 60 * 1000) {
      return NextResponse.json(
        { error: "This form expired. Please refresh the page and try again." },
        { status: 400 }
      );
    }

    /* --- Captcha --- */
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      console.warn("Blocked: turnstile failed", { ip });
      return reject();
    }

    /* --- Shape validation --- */
    const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const fn = clean(firstName);
    const ln = clean(lastName);
    const em = clean(email);
    const msg = clean(message);

    if (!fn || !ln || !em || !msg) return reject();
    if (fn.length > 60 || ln.length > 60 || em.length > 120 || msg.length > 5000)
      return reject();
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(em)) return reject();
    // Header-injection guard.
    if (/[\r\n]/.test(fn + ln + em)) return reject();

    /* --- Heuristics --- */
    const { score, reasons } = scoreSubmission(fn, ln, em, msg);
    if (score >= SPAM_THRESHOLD) {
      console.warn("Blocked: spam score", { ip, email: em, score, reasons });
      return silentDrop();
    }

    /* --- Email existence check (last, because it costs an API call) --- */
    const verifierKey = process.env.MYEMAILVERIFIER_API_KEY;
    if (verifierKey) {
      try {
        const verifyRes = await fetch(
          `https://client.myemailverifier.com/verifier/validate_single/${encodeURIComponent(
            em
          )}/${verifierKey}`,
          { signal: AbortSignal.timeout(8000) }
        );
        const verifyData = await verifyRes.json();

        if (verifyData.Status === "Invalid") {
          return NextResponse.json(
            { error: "That email address doesn't appear to exist. Please check it." },
            { status: 400 }
          );
        }
        // Disposable inboxes (mailinator, temp-mail, etc.)
        if (verifyData.Disposable_Domain === "true") {
          return NextResponse.json(
            { error: "Please use a permanent email address." },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error("Verifier unavailable, continuing:", err);
      }
    }

    /* --- Send --- */
    const normalized = normalizeEmail(em);
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Once godigitalagency.in is a verified domain in Resend, set
    // CONTACT_FROM_EMAIL to "GoDigital Website <contact@godigitalagency.in>".
    // Sending from an unverified domain makes Resend reject with 403, so the
    // default stays on the shared resend.dev sender.
    const from =
      process.env.CONTACT_FROM_EMAIL || "GoDigital Website <onboarding@resend.dev>";

    const resendResponse = await resend.emails.send({
      from,
      to: ["godigital74@gmail.com"],
      replyTo: em,
      subject: `New Project Inquiry from ${fn} ${ln}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${esc(fn)} ${esc(ln)}</p>
        <p><strong>Email:</strong> ${esc(em)}</p>
        <p><strong>Message:</strong><br/>${esc(msg).replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p style="color:#888;font-size:12px">
          IP: ${esc(ip)} &middot; spam score: ${score} &middot;
          normalized: ${esc(normalized)} &middot; filled in ${Math.round(elapsed / 1000)}s
        </p>
      `,
    });

    if (resendResponse.error) {
      console.error("Resend API Error:", resendResponse.error);
      return NextResponse.json(
        { error: "Failed to send your message. Please email us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Something went wrong processing your request." },
      { status: 500 }
    );
  }
}
