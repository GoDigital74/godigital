import { client } from "@/sanity/lib/client";
import WorkClient from "./WorkClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work & Case Studies",
  description: "Explore our portfolio of systems that create real impact across platforms and industries. One purpose - growth.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Our Work & Case Studies | GoDigital",
    description: "Explore our portfolio of systems that create real impact across platforms and industries. One purpose - growth.",
    url: "https://godigitalagency.in/work",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work & Case Studies | GoDigital",
    description: "Explore our portfolio of systems that create real impact across platforms and industries. One purpose - growth.",
    images: ["/og-image.png"],
  },
};
// Fetch data from Sanity on the server
async function getCaseStudies() {
  const query = `
    *[_type == "project"] | order(date desc) {
      "id": slug.current,
      "title": brand,
      desc,
      category,
      date,
      "metrics": cardMetrics[]{value, label},
      "image": coverImage.asset->url
    }
  `;
  return client.fetch(query);
}

// Revalidate the page every 60 seconds to catch new publishes
export const revalidate = 60;

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  // Pass the fetched Sanity data into your animated Client component
  return <WorkClient initialCaseStudies={caseStudies} />;
}