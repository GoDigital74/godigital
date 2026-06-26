"use client";

import { useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

import { Play } from "lucide-react";

// =========================================
// ANIMATION VARIANTS
// =========================================
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// =========================================
// YOUTUBE VIDEO COMPONENT
// =========================================
function YouTubeShowcase({ url }: { url: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  // Extract YouTube ID from various URL formats
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <div className="w-full aspect-video md:aspect-[21/9] bg-slate-100 rounded-[2rem] flex items-center justify-center border border-slate-200 text-slate-500 font-medium">
        Valid YouTube URL required.
      </div>
    );
  }

  return (
    <div 
      className="relative w-full aspect-video md:aspect-[21/9] bg-[#111] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group"
      onClick={() => setIsPlaying(true)}
    >
      {!isPlaying ? (
        <>
          <Image 
            // 1. Try High-Res first. If it fails, fallback to HQ default.
            src={useFallback ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video Thumbnail" 
            fill
            unoptimized
            onError={() => setUseFallback(true)}
            // 2. If we are using the fallback, zoom in by 1.35x to perfectly crop out YouTube's built-in black bars!
            className={`object-cover object-center opacity-80 transition-transform duration-700 ${
              useFallback ? "scale-[1.35] group-hover:scale-[1.40]" : "group-hover:scale-105"
            }`} 
          />
          <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-[#6495ED] fill-[#6495ED] ml-1.5" />
            </div>
          </div>
        </>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full z-20"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}


// =========================================
// MAIN TEMPLATE COMPONENT
// =========================================
export default function ProjectTemplate({ project }: { project: any }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const hasBannerImage = Boolean(project.bannerImage);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        
        {/* 1. INITIAL TEXT SECTION (Visible on Load) */}
        <section className="pt-32 md:pt-44 pb-12 px-4 md:px-8 mx-auto w-full max-w-[1300px] flex flex-col items-start">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full"
          >
            {/* Dynamic Services Pills */}
            <motion.div variants={fadeUpVariant} className="mb-6 flex flex-wrap gap-3">
              {(project.services || []).map((service: string) => (
                <span 
                  key={service} 
                  className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-500"
                >
                  {service}
                </span>
              ))}
            </motion.div>
            
            {/* Dynamic Hero Title */}
            <motion.h1 variants={fadeUpVariant} className="text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-4xl lg:text-5xl leading-[1.2]">
              {project.heroPreTitle}
              {project.heroHighlight && (
                <span className="text-[#6495ED]"> {project.heroHighlight} </span>
              )}
              {project.heroPostTitle}
            </motion.h1>
            
            {/* Dynamic Description */}
            <motion.p variants={fadeUpVariant} className="mt-6 w-full text-base md:text-lg font-medium text-slate-600 leading-relaxed">
              {project.description}
            </motion.p>
          </motion.div>
        </section>

        {/* 2. SCROLL-REVEAL BANNER SECTION */}
        <div className="px-4 md:px-8 mx-auto w-full max-w-[1600px] pb-12">
          <motion.section 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative isolate flex min-h-[400px] md:min-h-[650px] flex-col justify-center overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-2xl border border-slate-200"
          >
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
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </>
            )}
          </motion.section>
        </div>

        {/* 3. RESULTS GRID */}
        {project.stats && project.stats.length > 0 && (
          <div className="mx-auto max-w-7xl px-6 md:px-12 pb-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rounded-[2rem] bg-[#0B1120] p-8 md:p-12 shadow-xl"
            >
              {project.stats.map((result: any, i: number) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl font-bold text-[#6495ED] md:text-4xl mb-2">
                    {result.stat}
                  </span>
                  <span className="text-base font-medium text-slate-300 leading-snug">
                    {result.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        )}

        {/* 4. CHALLENGE & STRATEGY */}
        <section className="px-6 py-20 md:py-20">
          <div className="mx-auto max-w-7xl">
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

        {/* 5. FEATURED IMAGES */}
        {project.images && project.images.length > 0 && (
          <section className="bg-slate-50 px-6 py-14 md:py-12">
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
                    <div className="w-full rounded-3xl overflow-hidden flex items-center justify-center">
                      {img.url ? (
                        <Image
                          src={img.url}
                          alt={img.title || `Featured work ${i + 1}`}
                          width={1200}
                          height={1200}
                          className="w-full h-auto object-contain"
                        />
                      ) : (
                        <div className="aspect-video w-full flex items-center justify-center bg-slate-200 rounded-3xl">
                           <span className="text-slate-400 font-medium">[ Image Placeholder ]</span>
                        </div>
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

        {/* 6. YOUTUBE VIDEO SHOWCASE */}
        {project.videoUrl && (
          <section className="bg-white py-12 md:py-16 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8 }}
              >
                <YouTubeShowcase url={project.videoUrl} />
              </motion.div>
            </div>
          </section>
        )}

        {/* 7. OUTCOME & LEARNINGS */}
        <section className="px-6 py-14 md:py-10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid gap-16 md:grid-cols-2 md:gap-24"
            >
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

        {/* 8. BOTTOM QUOTE */}
        {project.quote && (
          <section className="bg-[#0A0A0A] px-6 py-20 md:py-22">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <svg className="mx-auto mb-8 h-7 w-12 text-[#6495ED]/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <h2 className="text-2xl font-medium leading-relaxed text-white md:text-2xl md:leading-snug">
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