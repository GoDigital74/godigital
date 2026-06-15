"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* ========================================= */}
        {/* 1. HERO SECTION (DARK) */}
        {/* ========================================= */}
        <section className="relative flex min-h-[70vh] flex-col justify-center bg-[#0A0A0A] px-6 pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.p variants={fadeUpVariant} className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6495ED]">
                About Us
              </motion.p>
              <motion.h1 variants={fadeUpVariant} className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                We are a team of specialists delivering <span className="text-[#6495ED]">award-winning</span> work.
              </motion.h1>
              <motion.p variants={fadeUpVariant} className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
                We believe in the power of digital experiences to transform businesses, elevate brands, and connect with people on a global scale.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. CONTENT SECTION (WHITE) */}
        {/* ========================================= */}
        <section className="bg-white px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid gap-12 md:grid-cols-2 md:gap-20"
            >
              <motion.div variants={fadeUpVariant}>
                <h2 className="text-3xl font-bold tracking-tight text-[#0f172a] md:text-5xl">
                  Driven by Data.<br />Inspired by Creativity.
                </h2>
              </motion.div>
              <motion.div variants={fadeUpVariant} className="flex flex-col gap-6 text-lg text-slate-600">
                <p>
                  At Go Digital, we don't just build websites or run campaigns; we build digital ecosystems. Our approach bridges the gap between deep analytical thinking and high-end creative execution.
                </p>
                <p>
                  Every strategy we develop is rooted in your business goals, ensuring that every pixel, word, and line of code contributes directly to your bottom line.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 3. TIMELINE SECTION (BLUE) */}
        {/* ========================================= */}
        <section className="bg-[#6495ED] px-6 py-24 text-white md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUpVariant} className="mb-16 text-3xl font-bold tracking-tight md:text-5xl">
                Our Journey
              </motion.h2>

              <div className="relative border-l border-white/30 pl-8 md:pl-12">
                {[
                  { year: "2018", title: "The Beginning", desc: "Founded with a mission to bring enterprise-level digital strategies to ambitious startups." },
                  { year: "2020", title: "Global Expansion", desc: "Opened our first international remote hubs, collaborating with brands across 3 continents." },
                  { year: "2023", title: "The 100th Client", desc: "Reached a major milestone of scaling 100 unique brands past their revenue targets." },
                  { year: "2025", title: "Industry Leaders", desc: "Recognized as a top-tier digital growth agency, continuing to push the boundaries of the web." },
                ].map((item, index) => (
                  <motion.div key={item.year} variants={fadeUpVariant} className="mb-12 relative last:mb-0">
                    <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-white md:-left-[57px] shadow-[0_0_0_4px_rgba(100,149,237,1)]" />
                    
                    <span className="mb-2 block text-sm font-bold tracking-widest text-white/80">
                      {item.year}
                    </span>
                    <h3 className="mb-3 text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="max-w-xl text-white/90 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 4. FOUNDER SECTION (FULL WIDTH IMAGE) */}
        {/* ========================================= */}
        <section className="bg-white py-24 md:py-14">
          <div className="mx-auto w-full px-4 md:px-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUpVariant}
              className="relative w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-gray-100"
            >
              {/* Replace '/founder-note.jpg' with the actual filename you saved in the public folder */}
              <Image
                src="/about/Founder Note.png" 
                alt="Founder's Note - Aman Agarwal"
                width={1920}
                height={600}
                quality={100}
                className="h-auto w-full object-cover"
              />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}