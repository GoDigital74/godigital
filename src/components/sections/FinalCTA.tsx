"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { TransitionLink } from "@/components/layout/PageTransition";

const FRAME_COUNT = 14;

const TUNNEL_COLORS = [
  "#020617", "#06102b", "#0a1a40", "#0e2456", "#122f6c",
  "#163a83", "#1a459a", "#1e51b1", "#2563eb", "#3b82f6",
  "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe",
];

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,     // Increased from 0.15 → smoother, less jittery
          pin: stickyRef.current,
        },
      });

      const reversedIndices = Array.from({ length: FRAME_COUNT }).map(
        (_, i) => FRAME_COUNT - 1 - i
      );

      reversedIndices.forEach((index, iteration) => {
        const frame = frameRefs.current[index];
        if (!frame) return;

        tl.to(
          frame,
          {
            scale: 8, 
            opacity: 0, 
            ease: "power2.in",
            force3D: true,
          },
          iteration * 0.08 
        );
      });

      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { scale: 0.35, opacity: 0.6, y: 0 },
          { scale: 1, opacity: 1, y: 0, ease: "power1.inOut", force3D: true },
          0 
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-[#020617]">
      <div ref={stickyRef} className="relative flex h-screen items-center justify-center overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {Array.from({ length: FRAME_COUNT }).map((_, i) => {
            const sizeProgress = i / (FRAME_COUNT - 1);
            return (
              <div
                key={i}
                ref={(el) => { frameRefs.current[i] = el; }}
                className="absolute rounded-[1.5rem] md:rounded-[4rem]"
                style={{
                  width: `${15 + sizeProgress * 75}vw`,
                  height: `${25 + sizeProgress * 65}vh`,
                  borderStyle: "solid",
                  borderWidth: "clamp(8px, 2.5vw, 45px)",
                  borderColor: TUNNEL_COLORS[i],
                  zIndex: i,
                  willChange: "transform, opacity", 
                }}
              />
            );
          })}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020617_85%)]" />
        </div>

        <div ref={cardRef} className="relative z-20 mx-4 w-full max-w-2xl md:mx-6" style={{ transform: "scale(0.35)", opacity: 0.6 }}>
          <div className="overflow-hidden rounded-[1.5rem] border border-white/20 bg-gradient-to-br from-[#6495ED] to-[#4F7DF3] shadow-2xl shadow-blue-900/30 md:rounded-[2.5rem]">
            <div className="relative px-6 py-12 text-center text-white md:px-14 md:py-20">
              <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm md:mb-6 md:px-4 md:text-xs">
                <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5" />
                Let&apos;s Talk
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Ready to Build<br />Something Bigger?
              </h2>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-9">
                <TransitionLink href="/contact" className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#6495ED] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#4F7DF3] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4">
                  <Calendar className="h-4 w-4" />
                  Book a Call
                </TransitionLink>
                <TransitionLink href="/contact" className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#6495ED] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#4F7DF3] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4">
                  Contact Us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}