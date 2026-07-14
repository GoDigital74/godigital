import type { Metadata } from "next";
import GrowthSystemsClient from "./GrowthSystemsClient";

export const metadata: Metadata = {
  title: "Growth Systems | GoDigital",
  description: "We build data-driven growth systems that acquire the right customers, improve conversions, and generate predictable, compounding growth.",
  alternates: {
    canonical: "https://godigitalagency.in/solutions/growth-systems", 
  },
  openGraph: {
    title: "Growth Systems | GoDigital",
    description: "We build data-driven growth systems that acquire the right customers, improve conversions, and generate predictable, compounding growth.",
    url: "https://godigitalagency.in/solutions/growth-systems",
  },
};

export default function GrowthSystemsPage() {
  return <GrowthSystemsClient />;
}

