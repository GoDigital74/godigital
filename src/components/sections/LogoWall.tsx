"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { partners } from "@/lib/data";

export function LogoWall() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".logo-wall-item", {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const doubled = [...partners, ...partners];

  return (
    <section
      ref={sectionRef}
      className="section-padding overflow-hidden border-y border-slate-100 bg-white"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
        >
          Our Partners
        </motion.p>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <div className="flex overflow-hidden">
            <div className="marquee-track flex shrink-0 items-center gap-16 px-8">
              {doubled.map((partner, i) => (
                <div
                  key={`${partner}-${i}`}
                  className="logo-wall-item flex shrink-0 items-center justify-center"
                >
                  <span className="text-2xl font-bold tracking-tight text-slate-300 transition-colors duration-300 hover:text-brand md:text-3xl">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
