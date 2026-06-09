// "use client";

// import { Suspense, MouseEvent } from "react";
// import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
// import { HeroSplineBackground } from "./HeroSplineBackground";

// export function Hero() {
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
//     const { currentTarget, clientX, clientY } = e;
//     const { left, top } = currentTarget.getBoundingClientRect();
    
//     mouseX.set(clientX - left);
//     mouseY.set(clientY - top);
//   };

//   return (
//     <section 
//       className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-bg font-sora"
//       onMouseMove={handleMouseMove}
//     >
//       {/* 3D Background */}
//       <Suspense fallback={<div className="absolute inset-0 bg-hero-bg" />}>
//         <HeroSplineBackground />
//       </Suspense>

//       {/* Interactive Blue Mouse Hover Effect */}
//       <motion.div
//         className="pointer-events-none absolute inset-0 z-[1]"
//         style={{
//           background: useMotionTemplate`radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
//         }}
//       />

//       {/* Dark overlay to ensure text readability */}
//       <div className="pointer-events-none absolute inset-0 z-[1] bg-hero-bg/40" />

//       {/* Centered Content Container */}
//       <div className="pointer-events-none relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        
//         {/* Headline: White text with Blue highlight */}
//         <h1
//           className="animate-fade-up mb-4 text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white opacity-0 md:mb-6"
//           style={{ animationDelay: "0.2s" }}
//         >
//           We Build <span className="text-[#6495ED]">Brands</span>
//           <br className="hidden md:block" /> That People Remember.
//         </h1>

//         {/* Subheading: Grey text */}
//         <p
//           className="animate-fade-up mb-10 text-[clamp(1.25rem,2.5vw,1.75rem)] font-light text-gray-400 opacity-0 md:mb-12"
//           style={{ animationDelay: "0.4s" }}
//         >
//           Strategy. Creativity. Growth.
//         </p>

//       </div>
//     </section>
//   );
// }

"use client";

import { Suspense, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { HeroSplineBackground } from "./HeroSplineBackground";
import { TransitionLink } from "@/components/layout/PageTransition";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <section 
      className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-bg font-sora"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-hero-bg" />}>
        <HeroSplineBackground />
      </Suspense>

      {/* Interactive Blue Mouse Hover Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: useMotionTemplate`radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
      />

      {/* Dark overlay to ensure text readability */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-hero-bg/40" />

      {/* Centered Content Container */}
      <div className="pointer-events-none relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        
        {/* Headline: White text with Blue highlight */}
        <h1
          className="animate-fade-up mb-4 text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white opacity-0 md:mb-6"
          style={{ animationDelay: "0.2s" }}
        >
          We Build <span className="text-[#6495ED]">Brands</span>
          <br className="hidden md:block" /> That People Remember.
        </h1>

        {/* Subheading: Grey text */}
        <p
          className="animate-fade-up mb-10 text-[clamp(1.25rem,2.5vw,1.75rem)] font-light text-gray-400 opacity-0 md:mb-12"
          style={{ animationDelay: "0.4s" }}
        >
          Strategy. Creativity. Growth.
        </p>

        {/* CTA Button */}
        <div
          className="animate-fade-up opacity-0"
          style={{ animationDelay: "0.6s" }}
        >
          <TransitionLink
            href="/contact"
            // pointer-events-auto is required so the button is clickable despite the container being pointer-events-none
            className="pointer-events-auto inline-flex items-center justify-center rounded-lg bg-[#6495ED] px-8 py-4 text-base font-medium text-white transition-all hover:bg-[#4F7DF3] hover:shadow-[0_0_20px_rgba(100,149,237,0.3)] active:scale-[0.98]"
          >
            Book a Call
          </TransitionLink>
        </div>

      </div>
    </section>
  );
}