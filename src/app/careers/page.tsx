import { client } from "@/sanity/lib/client";
import { Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JobAccordion } from "./JobAccordion";

export const revalidate = 60; // Revalidate every minute

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
        
        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center md:py-40 bg-gradient-to-b from-[#eef4f9] via-[#f4f8fb] to-white">
          <h1 className="mb-4 text-4xl font-bold text-[#0A192F] md:text-5xl lg:text-6xl tracking-tight">
            Join Our Team
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-slate-500 md:text-xl font-medium">
            Be part of our mission to transform retail operations across India
          </p>
          <a
            href="#open-positions"
            className="rounded-md bg-[#0056b3] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#004494]"
          >
            View Open Positions
          </a>
        </section>

        {/* WHY WORK WITH US SECTION */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#0A192F] md:text-4xl">
            Why Work With Us
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            
            {/* Card 1 */}
            <div className="rounded-xl bg-[#f5f8ff] p-8 transition-shadow hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#dbe8ff] text-[#0056b3]">
                <Check className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#0A192F]">Innovation Focus</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Work on cutting-edge solutions that are transforming retail operations across India.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl bg-[#f5f8ff] p-8 transition-shadow hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#dbe8ff] text-[#0056b3]">
                <Check className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#0A192F]">Growth Opportunities</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Continuous learning and development paths to advance your skills and career.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl bg-[#f5f8ff] p-8 transition-shadow hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#dbe8ff] text-[#0056b3]">
                <Check className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#0A192F]">Inclusive Culture</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Join a diverse team that values collaboration, respect, and work-life balance.
              </p>
            </div>

          </div>
        </section>

        {/* OPEN POSITIONS SECTION */}
        <section id="open-positions" className="px-6 py-16 md:py-20 scroll-mt-24">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#0A192F] md:text-4xl">
              Open Positions
            </h2>
            <p className="text-slate-500 text-lg">
              Explore our current openings and find the role that matches your skills and aspirations
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No open positions at the moment. Please check back later!
            </div>
          ) : (
            <JobAccordion jobs={jobs} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
