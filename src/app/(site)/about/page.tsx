import type { Metadata } from "next";
import AboutClient from "./AboutClient";

// 1. Export your unique SEO metadata (Server-side)
export const metadata: Metadata = {
  title: "About Us | GoDigital",
  description: "We combine strategy, creativity and performance to build systems that attract, convert and scale for brands that aim higher.",
  alternates: {
    canonical: "https://godigitalagency.in/about",
  },
  openGraph: {
    title: "About Us | GoDigital",
    description: "We combine strategy, creativity and performance to build systems that attract, convert and scale.",
    url: "https://godigitalagency.in/about",
  },
};

// 2. Render your animated client component
export default function AboutPage() {
  return <AboutClient />;
}

