"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whyUs } from "@/lib/data";

const icons = ["⚡", "🌐", "🚀", "📊"];

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".why-card", {
        opacity: 0,
        x: -40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
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
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-slate-50"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-100/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Why Brands Work With Us
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-brand-navy md:text-5xl">
            One partner. Every capability.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {whyUs.map((item, i) => (
            <div
              key={item.title}
              className="why-card group flex gap-5 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl transition-colors group-hover:bg-brand group-hover:text-white">
                {icons[i]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
