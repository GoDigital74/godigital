"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { industries } from "@/lib/data";

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".industry-card", {
        opacity: 0,
        scale: 0.9,
        stagger: 0.07,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-blue-50/50 to-white"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Industries
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-brand-navy md:text-5xl">
            Deep expertise across verticals.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            From boutique hospitality to fast-scaling D2C — we understand the
            nuances that drive growth in your category.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              className={`industry-card group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 ${
                i === industries.length - 1 && industries.length % 2 !== 0
                  ? "col-span-2 sm:col-span-1 lg:col-span-1"
                  : ""
              }`}
              whileHover={{ y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="text-3xl">{industry.icon}</span>
              <h3 className="relative mt-4 text-base font-semibold text-brand-navy">
                {industry.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
