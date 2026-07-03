import { client } from "@/sanity/lib/client";
// import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";
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
      {/* <Header /> */}
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
      {/* <Footer /> */}
    </>
  );
}
