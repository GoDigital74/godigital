import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Sora } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://godigitalagency.in",
  ),
  title: {
    default: "GoDigital | Performance & Brand Growth Agency",
    template: "%s | GoDigital",
  },
  description:
   "Digital ecosystems engineered for scale. GoDigital combines paid media, Shopify development, and brand strategy to drive real, measurable impact.",
  keywords: [
    "digital marketing",
    "agency",
    "SEO",
    "Paid Media",
    "Go Digital",
    "go-digitalagency",
    "Go Digital: Home",
    "web development",
    "Brand Positioning",
    "Go Digital Agency",
    "Shopify Development",
    "Social Media Marketing",
    "Digital Marketing Agency",
    "Digital Marketing Services",
    "Email & WhatsApp Marketing",
  ],

  authors: [{ name: "GoDigital Agency" }],
  creator: "GoDigital",
  alternates: {
    canonical: "https://godigitalagency.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "GoDigital | Performance & Brand Growth Agency",
    description:
      "Digital ecosystems engineered for scale. GoDigital combines paid media, Shopify development, and brand strategy to drive real, measurable impact.",
    siteName: "GoDigital",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GoDigital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoDigital | Performance & Brand Growth Agency",
    description:
      "Digital ecosystems engineered for scale. GoDigital combines paid media, Shopify development, and brand strategy to drive real, measurable impact.",
    creator: "@godigital",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground overflow-x-hidden selection:bg-[#6495ED] selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-2TE1DNHCG7" />
      </body>
    </html>
  );
}
