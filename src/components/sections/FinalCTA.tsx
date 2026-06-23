// "use client";

// import { useEffect, useRef } from "react";
// import { ArrowRight, Calendar, Sparkles } from "lucide-react";
// import { TransitionLink } from "@/components/layout/PageTransition";

// export function FinalCTA() {
//   // Inner ref for 3D Hover Tracking
//   const innerCardRef = useRef<HTMLDivElement>(null);
//   const frameRef = useRef<number | null>(null);

//   // 1. 3D Hover Tracking Cleanup
//   useEffect(() => {
//     return () => {
//       if (frameRef.current) cancelAnimationFrame(frameRef.current);
//     };
//   }, []);

//   // 2. Hover Math
//   const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!innerCardRef.current) return;
//     const rect = innerCardRef.current.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;

//     if (frameRef.current) cancelAnimationFrame(frameRef.current);

//     frameRef.current = requestAnimationFrame(() => {
//       if (!innerCardRef.current) return;
//       const centerX = rect.width / 2;
//       const centerY = rect.height / 2;
      
//       // Subtle tilt: 4 degrees max rotation
//       const rotateX = ((mouseY - centerY) / centerY) * -4;
//       const rotateY = ((mouseX - centerX) / centerX) * 4;

//       innerCardRef.current.style.transform = `
//         perspective(1000px)
//         rotateX(${rotateX}deg)
//         rotateY(${rotateY}deg)
//         translateZ(0)
//         scale3d(1.02, 1.02, 1.02)
//       `;
//     });
//   };

//   const handleLeave = () => {
//     if (!innerCardRef.current) return;
//     innerCardRef.current.style.transform = `
//       perspective(1000px)
//       rotateX(0deg)
//       rotateY(0deg)
//       translateZ(0)
//       scale3d(1, 1, 1)
//     `;
//   };

//   return (
//     <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#0A0A0A] py-24 md:py-32">
//       {/* Subtle background glow */}
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,149,237,0.08)_0%,#0A0A0A_70%)]" />

//       {/* OUTER WRAPPER */}
//       <div className="relative z-20 mx-4 w-full max-w-4xl md:mx-6">
        
//         {/* INNER CARD: Handles the 3D Hover Tracking */}
//         <div 
//           ref={innerCardRef}
//           onMouseMove={handleMove}
//           onMouseLeave={handleLeave}
//           style={{
//             transition: "transform 0.15s ease-out",
//             transformStyle: "preserve-3d",
//             willChange: "transform",
//           }}
//           className="group overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-[#6495ED] to-[#4F7DF3] shadow-2xl shadow-[#6495ED]/20 md:rounded-[3rem] transform-gpu"
//         >
//           {/* Interactive Glass Reflection Overlay */}
//           <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/20 via-transparent to-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

//           <div className="relative z-20 px-6 py-16 text-center text-white md:px-20 md:py-24">
//             <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm md:mb-8 md:px-5 md:text-xs">
//               <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
//               Let&apos;s Talk
//             </div>
            
//             <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
//               Ready to Build<br />Something Bigger?
//             </h2>
            
//             <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12">
//               <TransitionLink 
//                 href="/contact" 
//                 className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0A0A0A] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#111827] hover:border-[#6495ED]/50 active:scale-[0.98] sm:w-auto md:text-base"
//               >
//                 <Calendar className="h-5 w-5 text-[#6495ED]" />
//                 Book a Call
//               </TransitionLink>
              
//               <TransitionLink 
//                 href="/contact" 
//                 className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-white/20 active:scale-[0.98] sm:w-auto md:text-base"
//               >
//                 Contact Us
//                 <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
//               </TransitionLink>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { TransitionLink } from "@/components/layout/PageTransition";

export function FinalCTA() {
  // Inner ref for 3D Hover Tracking
  const innerCardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  // 1. 3D Hover Tracking Cleanup
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // 2. Hover Math
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerCardRef.current) return;
    const rect = innerCardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      if (!innerCardRef.current) return;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Subtle tilt: 4 degrees max rotation
      const rotateX = ((mouseY - centerY) / centerY) * -4;
      const rotateY = ((mouseX - centerX) / centerX) * 4;

      innerCardRef.current.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(0)
        scale3d(1.02, 1.02, 1.02)
      `;
    });
  };

  const handleLeave = () => {
    if (!innerCardRef.current) return;
    innerCardRef.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0)
      scale3d(1, 1, 1)
    `;
  };

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#0A0A0A] py-24 md:py-32">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,149,237,0.08)_0%,#0A0A0A_70%)]" />

      {/* OUTER WRAPPER */}
      <div className="relative z-20 mx-4 w-full max-w-4xl md:mx-6">
        
        {/* INNER CARD: Handles the 3D Hover Tracking */}
        <div 
          ref={innerCardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            transition: "transform 0.15s ease-out",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="group overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-[#6495ED] to-[#4F7DF3] shadow-2xl shadow-[#6495ED]/20 md:rounded-[3rem] transform-gpu"
        >
          {/* Interactive Glass Reflection Overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/20 via-transparent to-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-20 px-6 py-16 text-center text-white md:px-20 md:py-24">
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm md:mb-8 md:px-5 md:text-xs">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
              Let&apos;s Talk
            </div>
            
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              Ready to Build<br />Something Bigger?
            </h2>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12">
              
              {/* External Calendly Link */}
              <a 
                href="https://calendly.com/godigital74/30min" 
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0A0A0A] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#111827] hover:border-[#6495ED]/50 active:scale-[0.98] sm:w-auto md:text-base"
              >
                <Calendar className="h-5 w-5 text-[#6495ED]" />
                Book a Call
              </a>
              
              {/* Internal Contact Link */}
              <TransitionLink 
                href="/contact" 
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-white/20 active:scale-[0.98] sm:w-auto md:text-base"
              >
                Contact Us
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}