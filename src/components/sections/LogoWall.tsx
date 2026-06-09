// // // "use client";

// // // import { useRef, useEffect } from "react";
// // // import { motion } from "framer-motion";
// // // import gsap from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import { partners } from "@/lib/data";

// // // export function LogoWall() {
// // //   const sectionRef = useRef<HTMLElement>(null);

// // //   useEffect(() => {
// // //     gsap.registerPlugin(ScrollTrigger);
// // //     const ctx = gsap.context(() => {
// // //       gsap.from(".logo-wall-item", {
// // //         opacity: 0,
// // //         y: 30,
// // //         stagger: 0.08,
// // //         duration: 0.8,
// // //         ease: "power2.out",
// // //         scrollTrigger: {
// // //           trigger: sectionRef.current,
// // //           start: "top 80%",
// // //         },
// // //       });
// // //     }, sectionRef);
// // //     return () => ctx.revert();
// // //   }, []);

// // //   const doubled = [...partners, ...partners];

// // //   return (
// // //     <section
// // //       ref={sectionRef}
// // //       // Reverted to white background with subtle top/bottom borders
// // //       className="section-padding overflow-hidden border-y border-slate-100 bg-white"
// // //     >
// // //       <div className="mx-auto max-w-7xl">
// // //         <motion.p
// // //           initial={{ opacity: 0, y: 20 }}
// // //           whileInView={{ opacity: 1, y: 0 }}
// // //           viewport={{ once: true }}
// // //           className="mb-12 text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
// // //         >
// // //           Our Partners
// // //         </motion.p>

// // //         <div className="relative">
// // //           {/* Gradients updated to fade into white */}
// // //           <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
// // //           <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

// // //           <div className="flex overflow-hidden">
// // //             <div className="marquee-track flex shrink-0 items-center gap-16 px-8">
// // //               {doubled.map((partner, i) => (
// // //                 <div
// // //                   key={`${partner}-${i}`}
// // //                   className="logo-wall-item flex shrink-0 items-center justify-center"
// // //                 >
// // //                   {/* Logos: Soft grey fading to brand blue on hover */}
// // //                   <span className="text-2xl font-bold tracking-tight text-slate-300 transition-colors duration-300 hover:text-brand md:text-3xl">
// // //                     {partner}
// // //                   </span>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // "use client";

// // import { useRef } from "react";
// // import { motion } from "framer-motion";
// // import { partners } from "@/lib/data";

// // export function LogoWall() {
// //   const sectionRef = useRef<HTMLElement>(null);
// //   const doubled = [...partners, ...partners];

// //   return (
// //     <section
// //       ref={sectionRef}
// //       className="section-padding overflow-hidden border-y border-slate-100 bg-white"
// //     >
// //       <div className="mx-auto max-w-7xl">
// //         <motion.p
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           className="mb-12 text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
// //         >
// //           Our Partners
// //         </motion.p>

// //         <div className="relative">
// //           {/* Edge Gradients */}
// //           <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
// //           <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

// //           {/* Wrapper with a simple fade-in so we don't cause layout thrashing */}
// //           <motion.div 
// //             initial={{ opacity: 0 }}
// //             whileInView={{ opacity: 1 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.8 }}
// //             className="flex overflow-hidden"
// //           >
// //             {/* GPU-Accelerated Infinite Marquee */}
// //             <motion.div 
// //               className="flex w-max shrink-0 items-center gap-16 px-8"
// //               animate={{ x: ["0%", "-50%"] }}
// //               transition={{
// //                 duration: 25, // Increase to slow down, decrease to speed up
// //                 ease: "linear",
// //                 repeat: Infinity,
// //               }}
// //               style={{ willChange: "transform" }}
// //             >
// //               {doubled.map((partner, i) => (
// //                 <div
// //                   key={`${partner}-${i}`}
// //                   className="logo-wall-item flex shrink-0 items-center justify-center"
// //                 >
// //                   <span className="text-2xl font-bold tracking-tight text-slate-300 transition-colors duration-300 hover:text-brand md:text-3xl">
// //                     {partner}
// //                   </span>
// //                 </div>
// //               ))}
// //             </motion.div>
// //           </motion.div>

// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import { partners } from "@/lib/data";

// export function LogoWall() {
//   const sectionRef = useRef<HTMLElement>(null);
  
//   // Quadruple the array to create a long continuous strip to scroll through
//   const extendedPartners = [...partners, ...partners, ...partners, ...partners];

//   // 1. Track how far the user has scrolled past this specific section
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"], // Animates while the section is anywhere in the viewport
//   });

//   // 2. Apply spring physics to the scroll progress for a buttery smooth glide/deceleration
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   // 3. Map the vertical scroll progress (0 to 1) to horizontal movement (0% to -25%)
//   const x = useTransform(smoothProgress, [0, 1], ["0%", "-25%"]);

//   return (
//     <section
//       ref={sectionRef}
//       className="section-padding overflow-hidden border-y border-slate-100 bg-white"
//     >
//       <div className="mx-auto max-w-7xl">
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-12 text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
//         >
//           Our Partners
//         </motion.p>

//         <div className="relative">
//           {/* Edge Gradients */}
//           <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
//           <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

//           {/* Wrapper Fade-in */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="flex overflow-hidden"
//           >
//             {/* Scroll-Driven Parallax Track */}
//             <motion.div 
//               className="flex w-max shrink-0 items-center gap-16 px-8"
//               // The x position is completely controlled by the user's scroll wheel
//               style={{ x, willChange: "transform" }}
//             >
//               {extendedPartners.map((partner, i) => (
//                 <motion.div
//                   key={`${partner}-${i}`}
//                   className="logo-wall-item flex shrink-0 items-center justify-center cursor-default"
//                   // Added a subtle pop effect when hovering over individual logos
//                   whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
//                 >
//                   <span className="text-2xl font-bold tracking-tight text-slate-300 transition-colors duration-300 hover:text-brand md:text-3xl">
//                     {partner}
//                   </span>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { partners } from "@/lib/data";

export function LogoWall() {
  const marqueePartners = [...partners, ...partners];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="section-padding overflow-hidden border-y border-slate-100 bg-white"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
        >
          Our Partners
        </motion.p>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <motion.div
            className="flex w-max items-center gap-16 px-8"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              willChange: "transform",
            }}
          >
            {marqueePartners.map((partner, i) => (
              <motion.div
                key={`${partner}-${i}`}
                className="flex shrink-0 items-center justify-center"
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <span className="text-2xl font-bold tracking-tight text-slate-300 transition-colors duration-300 hover:text-brand md:text-3xl">
                  {partner}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}