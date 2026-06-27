"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section 
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white font-sora"
    >
      {/* Centered Content Container */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        
        {/* Headline: Black text with Blue highlight */}
        <h1
          className="animate-fade-up mb-4 text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] opacity-0 md:mb-6"
          style={{ animationDelay: "0.2s" }}
        >
          We Build <span className="text-[#6495ED]">Brands</span>
          <br className="hidden md:block" /> That People Remember.
        </h1>

        {/* Subheading: Dark grey text for contrast against white background */}
        <p
          className="animate-fade-up mb-10 text-[clamp(1.25rem,2.5vw,1.75rem)] font-light text-gray-600 opacity-0 md:mb-12"
          style={{ animationDelay: "0.4s" }}
        >
          Strategy. Creativity. Growth.
        </p>

        {/* CTA Button */}
        <div
          className="animate-fade-up opacity-0"
          style={{ animationDelay: "0.6s" }}
        >
          <Link
            href="https://calendly.com/godigital74/30min"
            className="inline-flex items-center justify-center rounded-lg bg-[#6495ED] px-8 py-4 text-base font-medium text-white transition-all hover:bg-[#4F7DF3] hover:shadow-[0_0_20px_rgba(100,149,237,0.3)] active:scale-[0.98]"
          >
            Book a Call
          </Link>
        </div>

      </div>
    </section>
  );
}