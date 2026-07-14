import { client } from "@/sanity/lib/client";
import InsightsClient from "./InsightsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Strategies | The GoDigital Journal",
  description: "Ideas, strategies, and lessons that drive growth. Real insights from the trenches of performance, branding, and commerce.",
  alternates: {
    canonical: "/insights",
  },
};

async function getPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      author,
      readTime,
      categories,
      publishedAt,
      "image": mainImage.asset->url,
      "imageAlt": mainImage.alt
    }
  `;
  return client.fetch(query);
}


export const revalidate = 60; // Revalidate every 60 seconds


export default async function InsightsPage() {
  const posts = await getPosts();
  return <InsightsClient initialPosts={posts} />;
}
