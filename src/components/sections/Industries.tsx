"use client";

import { motion, Variants } from "framer-motion";
import { industries } from "@/lib/data";

// Match the precise reveal stagger choreography from the Work section
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

export function Industries() {
  return (
    <section
      id="industries"
      // Section background set to pure dark
      className="py-10 md:py-16 bg-[#0A0A0A]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Heading Module matching FeaturedWork scroll reveal */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-10 text-center"
        >
          <p className="text-md font-semibold uppercase tracking-[0.2em] text-[#6495ED]">
            Industries
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Deep expertise across verticals.
          </h2>
          <p className="mx-auto mt-4 max-w-5xl text-gray-300">
            From boutique hospitality to fast scaling D2C - we understand the
            nuances that drive growth in your category.
          </p>
        </motion.div>

        {/* Instanced Framer Motion Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 px-6 sm:px-6 lg:px-8"
        >
          {industries.map((industry, i) => (
            <motion.div
              variants={cardVariants}
              key={industry.name}
              // Card set to #111827 with a very subtle blue hover border and faint glow
              className={`industry-card group relative overflow-hidden rounded-2xl border border-white/5 bg-[#111827] p-6 shadow-sm transition-all duration-500 hover:border-[#6495ED]/40 hover:shadow-lg hover:shadow-[#6495ED]/5 ${
                i === industries.length - 1 && industries.length % 2 !== 0
                  ? "col-span-2 sm:col-span-1 lg:col-span-1"
                  : ""
              }`}
            >
              {/* Very subtle inner gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6495ED]/0 to-[#6495ED]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <span className="relative z-10 text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-lg inline-block">
                {industry.icon}
              </span>
              
              <h3 className="relative z-10 mt-4 text-base font-semibold text-gray-200 transition-colors duration-300 group-hover:text-[#6495ED]">
                {industry.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}