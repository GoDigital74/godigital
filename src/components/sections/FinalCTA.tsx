// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ArrowRight, Calendar, Sparkles } from "lucide-react";
// import { TransitionLink } from "@/components/layout/PageTransition";

// const FRAME_COUNT = 14;

// const TUNNEL_COLORS = [
//   "#020617",
//   "#06102b",
//   "#0a1a40",
//   "#0e2456",
//   "#122f6c",
//   "#163a83",
//   "#1a459a",
//   "#1e51b1",
//   "#2563eb",
//   "#3b82f6",
//   "#60a5fa",
//   "#93c5fd",
//   "#bfdbfe",
//   "#dbeafe",
// ];

// export function FinalCTA() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const stickyRef = useRef<HTMLDivElement>(null);
//   const cardRef = useRef<HTMLDivElement>(null);
//   const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "bottom bottom",
//           // CHANGED: Reduced from 1 to 0.15. This removes almost exactly 1 second of "catch-up" delay.
//           scrub: 0.15, 
//           pin: stickyRef.current,
//         },
//       });

//       const reversedIndices = Array.from({ length: FRAME_COUNT }).map(
//         (_, i) => FRAME_COUNT - 1 - i
//       );

//       reversedIndices.forEach((index, iteration) => {
//         const frame = frameRefs.current[index];
//         if (!frame) return;

//         tl.to(
//           frame,
//           {
//             scale: 8, 
//             opacity: 0, 
//             ease: "power2.in",
//           },
//           iteration * 0.08 
//         );
//       });

//       if (cardRef.current) {
//         tl.fromTo(
//           cardRef.current,
//           { 
//             scale: 0.15, 
//             opacity: 0.4, 
//             y: 0 
//           },
//           { 
//             scale: 1, 
//             opacity: 1, 
//             y: 0, 
//             ease: "power1.inOut" 
//           },
//           0 
//         );
//       }
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     // CHANGED: Reduced from h-[300vh] to h-[200vh] so the user finishes the scroll faster
//     <section ref={sectionRef} className="relative h-[200vh] bg-[#020617]">
//       <div
//         ref={stickyRef}
//         className="relative flex h-screen items-center justify-center overflow-hidden bg-[#020617]"
//       >
//         <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
//           {Array.from({ length: FRAME_COUNT }).map((_, i) => {
//             const sizeProgress = i / (FRAME_COUNT - 1);
//             return (
//               <div
//                 key={i}
//                 ref={(el) => {
//                   frameRefs.current[i] = el;
//                 }}
//                 className="absolute rounded-[2rem] md:rounded-[4rem]"
//                 style={{
//                   width: `${15 + sizeProgress * 75}vw`,
//                   height: `${25 + sizeProgress * 65}vh`,
//                   borderStyle: "solid",
//                   borderWidth: "clamp(12px, 3vw, 45px)",
//                   borderColor: TUNNEL_COLORS[i],
//                   boxShadow: `0 0 30px ${TUNNEL_COLORS[i]}40`,
//                   zIndex: i,
//                 }}
//               />
//             );
//           })}
          
//           <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020617_85%)]" />
//         </div>

//         <div
//           ref={cardRef}
//           className="relative z-20 mx-6 w-full max-w-2xl"
//           style={{ transform: "scale(0.15)", opacity: 0.4 }}
//         >
//           <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-brand-navy shadow-2xl shadow-blue-900/40 md:rounded-[2.5rem]">
//             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%)]" />
//             <div className="relative px-8 py-16 text-center text-white md:px-14 md:py-20">
//               <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-blue-200 backdrop-blur-sm">
//                 <Sparkles className="h-3.5 w-3.5" />
//                 Let&apos;s Talk
//               </div>

//               <h2 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
//                 Ready to Build
//                 <br />
//                 <span className="bg-gradient-to-r from-blue-200 via-white to-blue-100 bg-clip-text text-transparent">
//                   Something Bigger?
//                 </span>
//               </h2>

//               <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
//                 <TransitionLink
//                   href="/contact"
//                   className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-navy shadow-lg transition-all hover:scale-[1.02]"
//                 >
//                   <Calendar className="h-4 w-4" />
//                   Book a Call
//                 </TransitionLink>
//                 <TransitionLink
//                   href="/contact"
//                   className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
//                 >
//                   Contact Us
//                   <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//                 </TransitionLink>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { TransitionLink } from "@/components/layout/PageTransition";

const FRAME_COUNT = 14;

const TUNNEL_COLORS = [
  "#020617",
  "#06102b",
  "#0a1a40",
  "#0e2456",
  "#122f6c",
  "#163a83",
  "#1a459a",
  "#1e51b1",
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#bfdbfe",
  "#dbeafe",
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
          scrub: 0.15, 
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
          },
          iteration * 0.08 
        );
      });

      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { 
            scale: 0.15, 
            opacity: 0.4, 
            y: 0 
          },
          { 
            scale: 1, 
            opacity: 1, 
            y: 0, 
            ease: "power1.inOut" 
          },
          0 
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-[#020617]">
      <div
        ref={stickyRef}
        className="relative flex h-screen items-center justify-center overflow-hidden bg-[#020617]"
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {Array.from({ length: FRAME_COUNT }).map((_, i) => {
            const sizeProgress = i / (FRAME_COUNT - 1);
            return (
              <div
                key={i}
                ref={(el) => {
                  frameRefs.current[i] = el;
                }}
                className="absolute rounded-[2rem] md:rounded-[4rem]"
                style={{
                  width: `${15 + sizeProgress * 75}vw`,
                  height: `${25 + sizeProgress * 65}vh`,
                  borderStyle: "solid",
                  borderWidth: "clamp(12px, 3vw, 45px)",
                  borderColor: TUNNEL_COLORS[i],
                  boxShadow: `0 0 30px ${TUNNEL_COLORS[i]}40`,
                  zIndex: i,
                }}
              />
            );
          })}
          
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020617_85%)]" />
        </div>

        <div
          ref={cardRef}
          className="relative z-20 mx-6 w-full max-w-2xl"
          style={{ transform: "scale(0.15)", opacity: 0.4 }}
        >
          {/* Card Background: Gradient #6495ED to #4F7DF3 */}
          <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-[#6495ED] to-[#4F7DF3] shadow-2xl shadow-blue-900/30 md:rounded-[2.5rem]">
            <div className="relative px-8 py-16 text-center text-white md:px-14 md:py-20">
              <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Let&apos;s Talk
              </div>

              {/* Text: White, Big Bold */}
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Ready to Build
                <br />
                Something Bigger?
              </h2>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                {/* CTA Button 1 */}
                <TransitionLink
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#6495ED] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#4F7DF3] active:scale-[0.98]"
                >
                  <Calendar className="h-4 w-4" />
                  Book a Call
                </TransitionLink>
                
                {/* CTA Button 2 */}
                <TransitionLink
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#6495ED] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#4F7DF3] active:scale-[0.98]"
                >
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