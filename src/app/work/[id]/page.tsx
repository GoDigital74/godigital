
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import ProjectTemplate from "./ProjectTemplate";

export const revalidate = 60; 

// Note the updated type: params is a Promise
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await the params object to extract the ID safely
  const { id } = await params;

  // 2. Fetch the dynamically managed project from Sanity
  const query = `*[_type == "project" && slug.current == $id][0]{
    ...,
    "bannerImage": bannerImage.asset->url,
    "videoUrl": video.asset->url,
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

