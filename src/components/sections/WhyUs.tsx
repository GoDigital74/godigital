"use client";

import { motion, Variants } from "framer-motion";
import { whyUs } from "@/lib/data";

// Consistent Framer Motion reveal orchestration
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function WhyUs() {
  return (
    <section
      // Applied the exact dark gradient background
      className="py-6 md:py-16 relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#111827]"
    >
      {/* Subtle blue accent glow on the right side */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#6495ED]/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading Module matching other sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-md font-semibold uppercase tracking-[0.2em] text-[#6495ED]">
            Why Brands Work With Us
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
            One partner. Every capability.
          </h2>
        </motion.div>

        {/* Instanced Framer Motion Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="px-2 sm:px-4 lg:px-8 grid gap-4 md:grid-cols-2"
        >
          {whyUs.map((item, i) => (
            <motion.div
              variants={cardVariants}
              key={item.title}
              // Dark cards matching the Insights/Work sections with smooth glass hover states
              className="group flex gap-6 rounded-3xl border border-white/5 bg-[#111827]/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#6495ED]/50 hover:bg-[#111827] hover:shadow-lg hover:shadow-[#6495ED]/10"
            >
              {/* Stats / Numbers: Blue */}
              <div className="text-4xl font-bold tracking-tighter text-[#6495ED] transition-transform duration-300 group-hover:-translate-y-1 md:text-5xl">
                0{i + 1}
              </div>
              
              <div>
                {/* Text: White title, Slate-400 description */}
                <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#6495ED]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
