"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { featuredWork, solutions } from "@/lib/data";
import { TransitionLink } from "@/components/layout/PageTransition";

function TiltCard({
  brand,
  industry,
  result,
  slug,
}: {
  brand: string;
  industry: string;
  result: string;
  slug: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className="group relative rounded-3xl glass-dark p-8 text-white shadow-2xl shadow-blue-900/20"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-blue-900/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-blue-300">
              {industry}
            </p>
            <h3 className="mt-1 text-2xl font-bold">{brand}</h3>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <p className="mb-8 text-sm leading-relaxed text-slate-300">{result}</p>
        <TransitionLink
          href={`/work/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition-colors hover:text-white"
        >
          View Case Study
          <ArrowUpRight className="h-3.5 w-3.5" />
        </TransitionLink>
      </div>
    </motion.div>
  );
}

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".featured-reveal", {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.9,
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
      className="section-padding relative overflow-hidden bg-brand-navy text-white"
    >
      <div className="pointer-events-none absolute inset-0 mesh-blue opacity-40" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="featured-reveal mb-16 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Featured Work
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Results that speak louder than pitches.
          </h2>
        </div>

        <div className="featured-reveal mb-20 grid gap-6 md:grid-cols-3">
          {featuredWork.map((item) => (
            <TiltCard key={item.slug} {...item} />
          ))}
        </div>

        <div className="featured-reveal">
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            What We Solve
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {solutions.map((sol) => (
              <div
                key={sol.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-blue-400/30 hover:bg-white/10"
              >
                <p className="text-sm font-medium text-blue-300">
                  {sol.question}
                </p>
                <h3 className="mt-2 text-xl font-bold">{sol.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {sol.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
