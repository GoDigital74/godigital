// import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";
// import { Hero } from "@/components/sections/Hero";
// import { LogoWall } from "@/components/sections/LogoWall";
// import { FeaturedWork } from "@/components/sections/FeaturedWork";
// import { Industries } from "@/components/sections/Industries";
// import { Insights } from "@/components/sections/Insights";
// import { WhyUs } from "@/components/sections/WhyUs";
// import { FinalCTA } from "@/components/sections/FinalCTA";
// import { GlobalPresence } from "@/components/sections/GlobalPresence";
// import { AllLogos } from "@/components/sections/AllLogos";
// import { JobAccordion } from "@/app/careers/JobAccordion";


// // 1. IMPORT YOUR SANITY CLIENT
// import { client } from "@/sanity/lib/client";

// // 2. SET REVALIDATION TIME
// export const revalidate = 60; 

// // Fetch the 3 most recent insights posts
// async function getRecentPosts() {
//   const query = `
//     *[_type == "post"] | order(publishedAt desc)[0...3] {
//       "id": _id,
//       title,
//       "slug": slug.current,
//       author,
//       readTime,
//       categories,
//       publishedAt,
//       "image": mainImage.asset->url
//     }
//   `;
//   return client.fetch(query);
// }

// // FIXED: Removed the [0...5] limit to fetch ALL projects
// // FIXED: Changed `image.asset->url` to `bannerImage.asset->url` to map your images correctly
// async function getFeaturedProjects() {
//   const query = `
//     *[_type == "project"] | order(_createdAt desc) {
//       "id": slug.current,
//       "brand": title,
//       "industry": category,
//       "result": desc,
//       "image": bannerImage.asset->url
//     }
//   `;
//   return client.fetch(query);
// }

// // 3. MAKE THE PAGE ASYNC
// export default async function HomePage() {
  
//   // A. Fetch the Logos
//   const logosQuery = `*[_type == "partner"]{
//     _id,
//     name,
//     "logoUrl": logo.asset->url
//   }`;
//   const sanityLogos = await client.fetch(logosQuery);

//   // B. Fetch the Recent Posts & ALL Projects
//   const recentPosts = await getRecentPosts();
//   const featuredProjects = await getFeaturedProjects();

//   return (
//     <>
//       <div className="relative z-10 bg-[#f8fafc]">
//         <Header />
//         <main>
//           <Hero />
          
//           {/* PASS ALL THE SANITY PROJECTS WITH FIXED IMAGES */}
//           <FeaturedWork projects={featuredProjects} /> 
          
//           <GlobalPresence />
//           <LogoWall /> 
//           <Industries /> 
//           <AllLogos sanityLogos={sanityLogos} />
//           <Insights posts={recentPosts} />
//           <WhyUs />
//           <FinalCTA />
//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// }


import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoWall } from "@/components/sections/LogoWall";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Industries } from "@/components/sections/Industries";
import { Insights } from "@/components/sections/Insights";
import { WhyUs } from "@/components/sections/WhyUs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { AllLogos } from "@/components/sections/AllLogos";

// IMPORTANT: Import the JobAccordion component you created earlier!
// Adjust this path if you saved JobAccordion somewhere else.
import { JobAccordion } from "@/app/careers/JobAccordion"; 

// 1. IMPORT YOUR SANITY CLIENT
import { client } from "@/sanity/lib/client";

// 2. SET REVALIDATION TIME
export const revalidate = 60; 

// Fetch the 3 most recent insights posts
async function getRecentPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc)[0...3] {
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

// NEW: Fetch Open Job Positions
async function getJobs() {
  const query = `
    *[_type == "job"] | order(postedDate desc) {
      _id,
      title,
      location,
      employmentType,
      department,
      postedDate,
      description,
      responsibilities
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
  const jobs = await getJobs();

  return (
    <>
      <div className="relative z-10 bg-[#f8fafc]">
        <Header />
        <main>
          <Hero />
          
          <FeaturedWork projects={featuredProjects} /> 
          
          <GlobalPresence />
          <LogoWall /> 
          <Industries /> 
          <AllLogos sanityLogos={sanityLogos} />
          <Insights posts={recentPosts} />
          <WhyUs />

          {/* NEW CAREERS / OPEN POSITIONS SECTION ON HOME PAGE */}
          <section className="bg-white px-6 py-24 md:py-32">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-[#0A192F] md:text-5xl tracking-tight">
                  Join Our Team
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                  Be part of our mission to transform retail operations across India. Explore our current openings and find the role that matches your skills.
                </p>
              </div>

              {jobs.length === 0 ? (
                <div className="text-center text-gray-500 py-10 bg-slate-50 rounded-2xl border border-slate-100">
                  No open positions at the moment. Please check back later!
                </div>
              ) : (
                <JobAccordion jobs={jobs} />
              )}
            </div>
          </section>
          
          <FinalCTA />
        </main>
      </div>
      <Footer />
    </>
  );
}