import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import ProjectTemplate from "./ProjectTemplate";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const query = `*[_type == "project" && slug.current == $id][0]{
    brand,
    desc,
    "imageUrl": coverImage.asset->url
  }`;
  const project = await client.fetch(query, { id });

  if (!project) {
    return { title: { absolute: "Case Study Not Found | GoDigital" } };
  }

  const title = `${project.brand} | GoDigital Case Study`;
  const description =
    project.desc || "Explore this GoDigital case study and the growth systems behind it.";
  const url = `https://godigitalagency.in/work/${id}`;
  const images = project.imageUrl ? [project.imageUrl] : ["/og-image.png"];

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

// Note the updated type: params is a Promise
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await the params object to extract the ID safely
  const { id } = await params;

  // 2. Fetch the dynamically managed project from Sanity
  const query = `*[_type == "project" && slug.current == $id][0]{
    ...,
    "bannerImage": bannerImage.asset->url,
    
    "videoUrl": video, 
    
    "images": images[]{
      title,
      desc,
      "url": image.asset->url
    }
  }`;
  
  const project = await client.fetch(query, { id });

  // 3. If Sanity doesn't have the data, throw a clean 404
  if (!project) {
    notFound();
  }

  // 4. Render the purely dynamic template
  return <ProjectTemplate project={project} />;
}
