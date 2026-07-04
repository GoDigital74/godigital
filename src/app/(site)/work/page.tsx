import { client } from "@/sanity/lib/client";
import WorkClient from "./WorkClient";

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