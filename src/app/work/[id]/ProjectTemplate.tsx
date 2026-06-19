"use client";

import { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

// =========================================
// ANIMATION VARIANTS
// =========================================
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function ProjectTemplate({ project }: { project: any }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const hasBannerImage = Boolean(project.bannerImage);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        
        {/* 1. HERO SECTION */}
        <div className="pt-20 md:pt-24 pb-12 px-4 md:px-8 mx-auto w-full max-w-[100vw]">
          <section className="relative isolate flex min-h-[500px] md:min-h-[620px] flex-col justify-center overflow-hidden rounded-[2rem] bg-slate-50 px-6 py-20 md:p-20 shadow-xl border border-slate-100">
            {hasBannerImage && (
              <>
                <Image
                  src={project.bannerImage}
                  alt={`${project.brand || "Case study"} banner`}
                  fill
                  priority
                  sizes="100vw"
                  className="absolute inset-0 z-0 object-cover"
                />
                {/* NEW: Subtle gradient overlay for text readability.
                  Fades from dark slate on the left to transparent on the right. 
                */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-900/60 via-slate-900/20 to-transparent pointer-events-none" />
              </>
            )}

            <div className="relative z-[2] mx-auto w-full max-w-7xl">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="max-w-4xl"
              >
                {/* Dynamic Services Pills */}
                <motion.div variants={fadeUpVariant} className="mb-6 flex flex-wrap gap-3">
                  {(project.services || []).map((service: string) => (
                    <span 
                      key={service} 
                      className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${
                        hasBannerImage
                          ? "border-slate-200 bg-white/95 text-[#0f172a]"
                          : "border-[#6495ED] bg-[#6495ED]/10 text-[#6495ED]"
                      }`}
                    >
                      {service}
                    </span>
                  ))}
                </motion.div>
                
                {/* Dynamic Hero Title */}
                {/* Changed base text color to white when there's an image to contrast with the dark gradient */}
                <motion.h1 variants={fadeUpVariant} className={`text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl ${hasBannerImage ? 'text-white' : 'text-[#0f172a]'}`}>
                  {project.heroPreTitle}
                  {project.heroHighlight && (
                    <span className="text-[#6495ED]">{project.heroHighlight}</span>
                  )}
                  {project.heroPostTitle}
                </motion.h1>
                
                {/* Dynamic Description */}
                {/* Changed base text color to a light slate when there's an image */}
                <motion.p variants={fadeUpVariant} className={`mt-8 max-w-2xl text-lg leading-relaxed md:text-xl font-medium ${hasBannerImage ? 'text-slate-200' : 'text-slate-800'}`}>
                  {project.description}
                </motion.p>
              </motion.div>
            </div>
          </section>
        </div>

        {/* 2. RESULTS GRID (FLOATING OVERLAY) */}
        {project.stats && project.stats.length > 0 && (
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="-mt-24 relative z-10 grid grid-cols-2 gap-4 rounded-3xl bg-[#111827] p-6 shadow-2xl shadow-slate-200/50 border border-white/5 md:grid-cols-3 md:gap-8 md:p-12"
            >
              {project.stats.map((result: any, i: number) => (
                <div key={i} className="flex flex-col border-l border-white/10 pl-4 md:pl-6">
                  <span className="text-2xl font-bold text-[#6495ED] md:text-4xl">{result.stat}</span>
                  <span className="mt-2 text-xs font-medium text-gray-400 md:text-sm">{result.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        )}

        {/* 3. CHALLENGE & STRATEGY (WHITE) */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            
            {/* Dynamic Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="mb-24 grid gap-12 md:grid-cols-12 md:gap-20"
              >
                <motion.div variants={fadeUpVariant} className="md:col-span-4">
                  <h2 className="text-3xl font-bold tracking-tight text-[#0f172a] md:text-5xl">The Challenge</h2>
                </motion.div>
                <motion.div variants={fadeUpVariant} className="grid gap-8 md:col-span-8 md:grid-cols-2">
                  {project.challenges.map((challenge: any, i: number) => (
                    <div key={i}>
                      <h3 className="text-xl font-bold text-[#0f172a]">{challenge.title}</h3>
                      <p className="mt-3 text-slate-600">{challenge.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Dynamic Strategy */}
            {project.strategies && project.strategies.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="grid gap-12 border-t border-slate-200 pt-24 md:grid-cols-12 md:gap-20"
              >
                <motion.div variants={fadeUpVariant} className="md:col-span-4">
                  <h2 className="text-3xl font-bold tracking-tight text-[#0f172a] md:text-5xl">Our Strategy</h2>
                </motion.div>
                <motion.div variants={fadeUpVariant} className="grid gap-8 md:col-span-8 md:grid-cols-2">
                  {project.strategies.map((strat: any, i: number) => (
                    <div key={i} className="rounded-2xl bg-slate-50 p-8 border border-slate-100">
                      <h3 className="text-xl font-bold text-[#0f172a]">{strat.title}</h3>
                      <p className="mt-3 text-slate-600 leading-relaxed">{strat.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>

        {/* 4. FEATURED IMAGES */}
        {project.images && project.images.length > 0 && (
          <section className="bg-slate-50 px-6 py-24 md:py-32">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <h2 className="text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">Featured Work</h2>
              </motion.div>
              <div className="grid gap-8 md:grid-cols-2">
                {project.images.map((img: any, i: number) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="aspect-video w-full rounded-3xl overflow-hidden bg-slate-200 flex items-center justify-center border border-slate-300">
                      {img.url ? (
                        <Image
                          src={img.url}
                          alt={img.title || `Featured work ${i + 1}`}
                          width={800}
                          height={450}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-slate-400 font-medium">[ Image Placeholder ]</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0f172a]">{img.title}</h4>
                      <p className="text-sm text-slate-500">{img.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. OUTCOME & LEARNINGS */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid gap-16 md:grid-cols-2 md:gap-24"
            >
              {/* Dynamic Outcomes */}
              <motion.div variants={fadeUpVariant}>
                <h2 className="mb-8 text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">The Outcome</h2>
                <ul className="space-y-6">
                  {(project.outcomes || []).map((item: any, i: number) => (
                    <li key={i} className="flex flex-col">
                      <span className="font-bold text-[#6495ED]">{item.title}</span>
                      <span className="text-slate-600 font-medium">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Dynamic Learnings */}
              <motion.div variants={fadeUpVariant}>
                <h2 className="mb-8 text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">Key Learnings</h2>
                <div className="space-y-8">
                  {(project.learnings || []).map((learning: any, i: number) => (
                    <div key={i}>
                      <h4 className="font-bold text-[#0f172a]">{learning.title}</h4>
                      <p className="mt-1 text-slate-600">{learning.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 6. BOTTOM QUOTE (DARK) */}
        {project.quote && (
          <section className="bg-[#0A0A0A] px-6 py-24 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <svg className="mx-auto mb-8 h-12 w-12 text-[#6495ED]/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <h2 className="text-2xl font-medium leading-relaxed text-white md:text-4xl md:leading-snug">
                  "{project.quote}"
                </h2>
              </motion.div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}