"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { insights } from "@/lib/data";
import { TransitionLink } from "@/components/layout/PageTransition";

export function Insights() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".insight-card", {
        opacity: 0,
        y: 50,
        stagger: 0.12,
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
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Insights
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-brand-navy md:text-5xl">
              Ideas worth sharing.
            </h2>
          </div>
          <TransitionLink
            href="/insights"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
          >
            View all insights
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </TransitionLink>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {insights.map((post) => (
            <article
              key={post.title}
              className="insight-card group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                <div className="absolute inset-0 mesh-blue opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <time className="text-xs text-slate-400">{post.date}</time>
                <h3 className="mt-2 text-lg font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>
                <TransitionLink
                  href="/insights"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
                >
                  Read more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </TransitionLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
