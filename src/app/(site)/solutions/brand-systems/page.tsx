import type { Metadata } from "next";
import BrandSystemsClient from "./BrandSystemsClient";

export const metadata: Metadata = {
  title: "Brand Systems & Creative",
  description: "Build trust and recall. We create compelling brand narratives, creatives, and creator campaigns that capture attention.",
  alternates: {
    canonical: "https://godigitalagency.in/solutions/brand-systems",
  },
  openGraph: {
    title: "Brand Systems & Creative | GoDigital",
    description: "Build trust and recall. We create compelling brand narratives, creatives, and creator campaigns that capture attention.",
    url: "https://godigitalagency.in/solutions/brand-systems",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Systems & Creative | GoDigital",
    description: "Build trust and recall. We create compelling brand narratives, creatives, and creator campaigns that capture attention.",
    images: ["/og-image.png"],
  },
};

export default function BrandSystemsPage() {
  return <BrandSystemsClient />;
}