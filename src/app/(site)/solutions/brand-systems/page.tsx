import type { Metadata } from "next";
import BrandSystemsClient from "./BrandSystemsClient";

export const metadata: Metadata = {
  title: "Brand Systems & Creative | GoDigital",
  description: "Build trust and recall. We create compelling brand narratives, creatives, and creator campaigns that capture attention.",
  alternates: {
    canonical: "https://godigitalagency.in/solutions/brand-systems",
  },
  openGraph: {
    title: "Brand Systems & Creative | GoDigital",
    description: "Build trust and recall. We create compelling brand narratives, creatives, and creator campaigns that capture attention.",
    url: "https://godigitalagency.in/solutions/brand-systems",
  },
};

export default function BrandSystemsPage() {
  return <BrandSystemsClient />;
}