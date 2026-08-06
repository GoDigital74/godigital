import type { Metadata } from "next";
import AboutClient from "./AboutClient";

// 1. Export your unique SEO metadata (Server-side)
export const metadata: Metadata = {
  title: "About Us",
  description: "We combine strategy, creativity and performance to build systems that attract, convert and scale for brands that aim higher.",
  alternates: {
    canonical: "https://godigitalagency.in/about",
  },
  openGraph: {
    title: "About Us | GoDigital",
    description: "We combine strategy, creativity and performance to build systems that attract, convert and scale.",
    url: "https://godigitalagency.in/about",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | GoDigital",
    description: "We combine strategy, creativity and performance to build systems that attract, convert and scale.",
    images: ["/og-image.png"],
  },
};

// 2. Render your animated client component
export default function AboutPage() {
  return <AboutClient />;
}

