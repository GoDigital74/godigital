// import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoWall } from "@/components/sections/LogoWall";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Industries } from "@/components/sections/Industries";
import { Insights } from "@/components/sections/Insights";
import { WhyUs } from "@/components/sections/WhyUs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { AllLogos } from "@/components/sections/AllLogos";

// 1. IMPORT YOUR SANITY CLIENT
import { client } from "@/sanity/lib/client";

// 2. SET REVALIDATION TIME
export const revalidate = 60; 

// Fetch ALL insights posts
async function getRecentPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      author,
      readTime,
      categories,
      publishedAt,
      "image": mainImage.asset->url
    }
  `;
  return client.fetch(query);
}

// Fetch ALL projects
async function getFeaturedProjects() {
  const query = `
    *[_type == "project"] | order(_createdAt desc) {
      "id": slug.current,
      "brand": title,
      "industry": category,
      "result": desc,
      "image": bannerImage.asset->url
    }
  `;
  return client.fetch(query);
}

// 3. MAKE THE PAGE ASYNC
export default async function HomePage() {
  
  // A. Fetch the Logos
  const logosQuery = `*[_type == "partner"]{
    _id,
    name,
    "logoUrl": logo.asset->url
  }`;
  const sanityLogos = await client.fetch(logosQuery);

  // B. Fetch the Data
  const recentPosts = await getRecentPosts();
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <div className="relative z-10 bg-[#f8fafc]">
        {/* <Header /> */}
        <main>
          <Hero />
          <FeaturedWork projects={featuredProjects} /> 
          <GlobalPresence />
          <LogoWall /> 
          <Industries /> 
          <AllLogos sanityLogos={sanityLogos} />
          <Insights posts={recentPosts} />
          <WhyUs />
          <FinalCTA />
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
}
