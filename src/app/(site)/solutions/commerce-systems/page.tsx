import type { Metadata } from "next";
import CommerceSystemsClient from "./CommerceSystemsClient";

export const metadata: Metadata = {
  title: "Commerce Systems | GoDigital",
  description: "End-to-end commerce solutions designed to scale your brand, optimize conversions, and maximize revenue.",
  alternates: {
    canonical: "https://godigitalagency.in/solutions/commerce-systems",
  },
  openGraph: {
    title: "Commerce Systems | GoDigital",
    description: "End-to-end commerce solutions designed to scale your brand, optimize conversions, and maximize revenue.",
    url: "https://godigitalagency.in/solutions/commerce-systems",
  },
};

export default function CommerceSystemsPage() {
  return <CommerceSystemsClient />;
}