// // import { client } from "@/sanity/lib/client";
// // import { Check } from "lucide-react";
// // import { Header } from "@/components/layout/Header";
// // import { Footer } from "@/components/layout/Footer";
// // import { JobAccordion } from "./JobAccordion";

// // export const revalidate = 60; // Revalidate every minute

// // async function getJobs() {
// //   const query = `
// //     *[_type == "job"] | order(postedDate desc) {
// //       _id,
// //       title,
// //       location,
// //       employmentType,
// //       department,
// //       postedDate,
// //       description,
// //       responsibilities
// //     }
// //   `;
// //   return client.fetch(query);
// // }

// // export default async function CareersPage() {
// //   const jobs = await getJobs();

// //   return (
// //     <>
// //       <Header />
// //       <main className="min-h-screen bg-white pb-24">

// //         {/* HERO SECTION */}
// //         <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center md:py-40 bg-gradient-to-b from-[#eef4f9] via-[#f4f8fb] to-white">
// //           <h1 className="mb-4 text-4xl font-bold text-[#0A192F] md:text-5xl lg:text-6xl tracking-tight">
// //             Join Our Team
// //           </h1>
// //           <p className="mb-8 max-w-2xl text-lg text-slate-500 md:text-xl font-medium">
// //             Be part of our mission to transform retail operations across India
// //           </p>
// //           <a
// //             href="#open-positions"
// //             className="rounded-md bg-[#0056b3] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#004494]"
// //           >
// //             View Open Positions
// //           </a>
// //         </section>

// //         {/* WHY WORK WITH US SECTION */}
// //         <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
// //           <h2 className="mb-12 text-center text-3xl font-bold text-[#0A192F] md:text-4xl">
// //             Why Work With Us
// //           </h2>
// //           <div className="grid gap-6 md:grid-cols-3">

// //             {/* Card 1 */}
// //             <div className="rounded-xl bg-[#f5f8ff] p-8 transition-shadow hover:shadow-md">
// //               <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#dbe8ff] text-[#0056b3]">
// //                 <Check className="h-5 w-5" strokeWidth={2.5} />
// //               </div>
// //               <h3 className="mb-3 text-lg font-bold text-[#0A192F]">Innovation Focus</h3>
// //               <p className="text-slate-500 leading-relaxed text-sm">
// //                 Work on cutting-edge solutions that are transforming retail operations across India.
// //               </p>
// //             </div>

// //             {/* Card 2 */}
// //             <div className="rounded-xl bg-[#f5f8ff] p-8 transition-shadow hover:shadow-md">
// //               <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#dbe8ff] text-[#0056b3]">
// //                 <Check className="h-5 w-5" strokeWidth={2.5} />
// //               </div>
// //               <h3 className="mb-3 text-lg font-bold text-[#0A192F]">Growth Opportunities</h3>
// //               <p className="text-slate-500 leading-relaxed text-sm">
// //                 Continuous learning and development paths to advance your skills and career.
// //               </p>
// //             </div>

// //             {/* Card 3 */}
// //             <div className="rounded-xl bg-[#f5f8ff] p-8 transition-shadow hover:shadow-md">
// //               <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#dbe8ff] text-[#0056b3]">
// //                 <Check className="h-5 w-5" strokeWidth={2.5} />
// //               </div>
// //               <h3 className="mb-3 text-lg font-bold text-[#0A192F]">Inclusive Culture</h3>
// //               <p className="text-slate-500 leading-relaxed text-sm">
// //                 Join a diverse team that values collaboration, respect, and work-life balance.
// //               </p>
// //             </div>

// //           </div>
// //         </section>

// //         {/* OPEN POSITIONS SECTION */}
// //         <section id="open-positions" className="px-6 py-16 md:py-20 scroll-mt-24">
// //           <div className="mb-12 text-center">
// //             <h2 className="mb-4 text-3xl font-bold text-[#0A192F] md:text-4xl">
// //               Open Positions
// //             </h2>
// //             <p className="text-slate-500 text-lg">
// //               Explore our current openings and find the role that matches your skills and aspirations
// //             </p>
// //           </div>

// //           {jobs.length === 0 ? (
// //             <div className="text-center text-gray-500 py-10">
// //               No open positions at the moment. Please check back later!
// //             </div>
// //           ) : (
// //             <JobAccordion jobs={jobs} />
// //           )}
// //         </section>
// //       </main>
// //       <Footer />
// //     </>
// //   );
// // }


import { client } from "@/sanity/lib/client";
import { Check } from "lucide-react"; 
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JobAccordion } from "./JobAccordion";
import Image from "next/image";
import Particles from "@/components/Particles";

export const revalidate = 60;

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

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-24">
        {/* ========================================= */}
        {/* HERO SECTION (DARK BANNER WITH PARTICLES) */}
        {/* ========================================= */}
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-6 py-32 text-center md:py-40">
          {/* React Bits Particles Background */}
          <div className="absolute inset-0 z-0">
            <Particles
              particleColors={["#ffffff", "#6495ED"]} // Using white and your brand green
              particleCount={150}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={true}
              disableRotation={false}
              className="w-full h-full"
            />
          </div>

          {/* Background Ambient Blobs (Kept for that nice soft glow behind the particles) */}
          <div className="absolute -left-[10%] top-0 h-[600px] w-[600px] rounded-full bg-[#6495ED]/5 blur-[120px] pointer-events-none z-0"></div>
          <div className="absolute -right-[10%] bottom-0 h-[600px] w-[600px] rounded-full bg-[#6495ED]/5 blur-[120px] pointer-events-none z-0"></div>

          {/* Floating Avatars */}
          <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
            {/* Top Left */}
            <div className="absolute left-[15%] top-[18%] flex h-28 w-28 items-center justify-center rounded-full bg-[#0A0A0A] overflow-hidden border-[6px] border-[#0A0A0A]">
              <Image
                unoptimized
                src="https://randomuser.me/api/portraits/women/42.jpg"
                alt="Team member"
                fill
                className="object-cover"
              />
            </div>

            {/* Mid Left */}
            <div className="absolute left-[8%] top-[50%] flex h-32 w-32 items-center justify-center rounded-full bg-[#0A0A0A] overflow-hidden border-[6px] border-[#0A0A0A]">
              <Image
                unoptimized
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Team member"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-[10%] left-[22%] flex h-24 w-24 items-center justify-center rounded-full bg-[#0A0A0A] overflow-hidden border-[6px] border-[#0A0A0A]">
              <Image
                unoptimized
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Team member"
                fill
                className="object-cover"
              />
            </div>

            {/* Top Right */}
            <div className="absolute right-[18%] top-[12%] flex h-28 w-28 items-center justify-center rounded-full bg-[#0A0A0A] overflow-hidden border-[6px] border-[#0A0A0A]">
              <Image
                unoptimized
                src="https://randomuser.me/api/portraits/men/46.jpg"
                alt="Team member"
                fill
                className="object-cover"
              />
            </div>

            {/* Mid Right */}
            <div className="absolute right-[8%] top-[45%] flex h-24 w-24 items-center justify-center rounded-full bg-[#0A0A0A] overflow-hidden border-[6px] border-[#0A0A0A]">
              <Image
                unoptimized
                src="https://randomuser.me/api/portraits/women/17.jpg"
                alt="Team member"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-[20%] right-[22%] flex h-32 w-32 items-center justify-center rounded-full bg-[#0A0A0A] overflow-hidden border-[6px] border-[#0A0A0A]">
              <Image
                unoptimized
                src="https://randomuser.me/api/portraits/men/22.jpg"
                alt="Team member"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom Far Right */}
            <div className="absolute bottom-[10%] right-[12%] flex h-20 w-20 items-center justify-center rounded-full bg-[#0A0A0A] overflow-hidden border-[6px] border-[#0A0A0A]">
              <Image
                unoptimized
                src="https://randomuser.me/api/portraits/women/91.jpg"
                alt="Team member"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-20 flex max-w-4xl flex-col items-center pt-10 pointer-events-auto">
            <span className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#6495ED]">
              Careers at Go Digital
            </span>

            <h1 className="mb-8 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-[4rem] leading-[1.1]">
              Build your career.
              <br />
              <span className="text-[#6495ED]">Build what matters.</span>
            </h1>

            <p className="mb-12 max-w-2xl text-lg font-medium text-gray-300 md:text-xl leading-relaxed">
              We're a young, fast-moving team working on real brands, real
              campaigns and real growth.
            </p>
          </div>
        </section>

        {/* ========================================= */}
        {/* WHY WORK WITH US SECTION */}
        {/* ========================================= */}
        {/* <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <h2 className="mb-16 text-center text-4xl font-bold text-[#0A0A0A] md:text-5xl">
            Why Work With Us
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
           
            <div className="rounded-[2rem] bg-[#f8fafc] p-10 transition-shadow hover:shadow-lg border border-gray-100">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#6495ED]/20 text-[#6495ED]">
                <Check className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0A0A0A]">
                Innovation Focus
              </h3>
              <p className="text-gray-500 leading-relaxed text-base font-medium">
                Work on cutting-edge solutions that are transforming retail
                operations across India.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#f8fafc] p-10 transition-shadow hover:shadow-lg border border-gray-100">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#6495ED]/20 text-[#6495ED]">
                <Check className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0A0A0A]">
                Growth Opportunities
              </h3>
              <p className="text-gray-500 leading-relaxed text-base font-medium">
                Continuous learning and development paths to advance your skills
                and career.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#f8fafc] p-10 transition-shadow hover:shadow-lg border border-gray-100">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#6495ED]/20 text-[#6495ED]">
                <Check className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0A0A0A]">
                Inclusive Culture
              </h3>
              <p className="text-gray-500 leading-relaxed text-base font-medium">
                Join a diverse team that values collaboration, respect, and
                work-life balance.
              </p>
            </div>
          </div>
        </section> */}

        {/* ========================================= */}
        {/* OPEN POSITIONS SECTION */}
        {/* ========================================= */}
        <section
          id="open-positions"
          className="px-6 py-16 md:py-20 scroll-mt-24 bg-[#F4F4F0] rounded-[3rem] mx-4 md:mx-8 mb-8"
        >
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="mb-6 text-4xl font-bold text-[#0A0A0A] md:text-5xl">
              Open Positions
            </h2>
            <p className="text-gray-500 text-lg font-medium">
              Explore our current openings and find the role that matches your
              skills and aspirations.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {jobs.length === 0 ? (
              <div className="text-center text-gray-500 py-10 font-medium">
                No open positions at the moment. Please check back later!
              </div>
            ) : (
              <JobAccordion jobs={jobs} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
