import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Sora } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css"; 

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
    "branding",
    "marketing",
    "agency",
    "growth",
    "strategy",
    "Landing Page",
    "SEO",
    "Paid Media",
    "design",
    "Go Digital",
    "PPC & Paid Ads",
    "BusinessGrowth",
    "web development",
    "Brand Positioning",
    "Go Digital Agency",
    "Content Marketing",
    "Shopify Development",
    "Social Media Marketing",
    "Digital Marketing Agency",
    "Digital Marketing Services",
    "Influencer Marketing & UGC",
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
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GoDigital Agency",
      },
    ], // Added OG Image
  },
  twitter: {
    card: "summary_large_image",
    title: "GoDigital | Performance & Brand Growth Agency",
    description:
      "Digital ecosystems engineered for scale. GoDigital combines paid media, Shopify development, and brand strategy to drive real, measurable impact.",
    creator: "@godigital",
    images: ["/og-image.jpg"], // Added Twitter Image
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon1.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Added Structured Data for Google (Update address/details as needed)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "GoDigital Agency",
    description: "Digital Marketing, Strategy, and Growth Agency.",
    image: "https://godigitalagency.in/og-image.jpg",
    url: "https://godigitalagency.in",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Your City",
      addressRegion: "Your State",
      addressCountry: "IN",
    },
    priceRange: "$$",
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${sora.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground overflow-x-hidden selection:bg-[#6495ED] selection:text-white">
         
          <Header />
        <SmoothScroll>
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </SmoothScroll>
      </body>
    </html>
  );
}
