import { client } from "@/sanity/lib/client";
import InsightsClient from "./InsightsClient";

// Fetch all posts, ordered by newest first
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