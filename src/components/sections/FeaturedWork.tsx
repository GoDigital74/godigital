// // // // // "use client";

// // // // // import { useRef, useEffect, useState } from "react";
// // // // // import { motion } from "framer-motion";
// // // // // import gsap from "gsap";
// // // // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // // // import { ArrowUpRight } from "lucide-react";
// // // // // import { featuredWork, solutions } from "@/lib/data";
// // // // // import { TransitionLink } from "@/components/layout/PageTransition";

// // // // // function TiltCard({
// // // // //   brand,
// // // // //   industry,
// // // // //   result,
// // // // //   slug,
// // // // // }: {
// // // // //   brand: string;
// // // // //   industry: string;
// // // // //   result: string;
// // // // //   slug: string;
// // // // // }) {
// // // // //   const cardRef = useRef<HTMLDivElement>(null);
// // // // //   const [transform, setTransform] = useState("");

// // // // //   const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
// // // // //     const card = cardRef.current;
// // // // //     if (!card) return;
// // // // //     const rect = card.getBoundingClientRect();
// // // // //     const x = e.clientX - rect.left;
// // // // //     const y = e.clientY - rect.top;
// // // // //     const centerX = rect.width / 2;
// // // // //     const centerY = rect.height / 2;
// // // // //     const rotateX = ((y - centerY) / centerY) * -8;
// // // // //     const rotateY = ((x - centerX) / centerX) * 8;
// // // // //     setTransform(
// // // // //       `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
// // // // //     );
// // // // //   };

// // // // //   const handleLeave = () => {
// // // // //     setTransform(
// // // // //       "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <motion.div
// // // // //       ref={cardRef}
// // // // //       onMouseMove={handleMove}
// // // // //       onMouseLeave={handleLeave}
// // // // //       style={{ transform, transition: "transform 0.15s ease-out" }}
// // // // //       className="group relative rounded-3xl glass-dark p-8 text-white shadow-2xl shadow-blue-900/20"
// // // // //     >
// // // // //       <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-blue-900/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
// // // // //       <div className="relative z-10">
// // // // //         <div className="mb-6 flex items-start justify-between">
// // // // //           <div>
// // // // //             <p className="text-xs font-medium uppercase tracking-widest text-blue-300">
// // // // //               {industry}
// // // // //             </p>
// // // // //             <h3 className="mt-1 text-2xl font-bold">{brand}</h3>
// // // // //           </div>
// // // // //           <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
// // // // //             <ArrowUpRight className="h-4 w-4" />
// // // // //           </div>
// // // // //         </div>
// // // // //         <p className="mb-8 text-sm leading-relaxed text-slate-300">{result}</p>
// // // // //         <TransitionLink
// // // // //           href={`/work/${slug}`}
// // // // //           className="inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition-colors hover:text-white"
// // // // //         >
// // // // //           View Case Study
// // // // //           <ArrowUpRight className="h-3.5 w-3.5" />
// // // // //         </TransitionLink>
// // // // //       </div>
// // // // //     </motion.div>
// // // // //   );
// // // // // }

// // // // // export function FeaturedWork() {
// // // // //   const sectionRef = useRef<HTMLElement>(null);

// // // // //   useEffect(() => {
// // // // //     gsap.registerPlugin(ScrollTrigger);
// // // // //     const ctx = gsap.context(() => {
// // // // //       gsap.from(".featured-reveal", {
// // // // //         opacity: 0,
// // // // //         y: 60,
// // // // //         stagger: 0.12,
// // // // //         duration: 0.9,
// // // // //         ease: "power3.out",
// // // // //         scrollTrigger: {
// // // // //           trigger: sectionRef.current,
// // // // //           start: "top 75%",
// // // // //         },
// // // // //       });
// // // // //     }, sectionRef);
// // // // //     return () => ctx.revert();
// // // // //   }, []);

// // // // //   return (
// // // // //     <section
// // // // //       ref={sectionRef}
// // // // //       className="section-padding relative overflow-hidden bg-brand-navy text-white"
// // // // //     >
// // // // //       <div className="pointer-events-none absolute inset-0 mesh-blue opacity-40" />
// // // // //       <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
// // // // //       <div className="pointer-events-none absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />

// // // // //       <div className="relative mx-auto max-w-7xl">
// // // // //         <div className="featured-reveal mb-16 max-w-2xl">
// // // // //           <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
// // // // //             Featured Work
// // // // //           </p>
// // // // //           <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
// // // // //             Results that speak louder than pitches.
// // // // //           </h2>
// // // // //         </div>

// // // // //         <div className="featured-reveal mb-20 grid gap-6 md:grid-cols-3">
// // // // //           {featuredWork.map((item) => (
// // // // //             <TiltCard key={item.slug} {...item} />
// // // // //           ))}
// // // // //         </div>

// // // // //         <div className="featured-reveal">
// // // // //           <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
// // // // //             What We Solve
// // // // //           </p>
// // // // //           <div className="grid gap-6 md:grid-cols-3">
// // // // //             {solutions.map((sol) => (
// // // // //               <div
// // // // //                 key={sol.title}
// // // // //                 className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-blue-400/30 hover:bg-white/10"
// // // // //               >
// // // // //                 <p className="text-sm font-medium text-blue-300">
// // // // //                   {sol.question}
// // // // //                 </p>
// // // // //                 <h3 className="mt-2 text-xl font-bold">{sol.title}</h3>
// // // // //                 <p className="mt-3 text-sm leading-relaxed text-slate-400">
// // // // //                   {sol.description}
// // // // //                 </p>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { motion } from "framer-motion";
// // // // import { ArrowRight } from "lucide-react";
// // // // import { TransitionLink } from "@/components/layout/PageTransition";

// // // // // Dummy data for the projects. You can move this to your @/lib/data file later.
// // // // const featuredProjects = [
// // // //   {
// // // //     id: 1,
// // // //     brand: "Lumina Edge",
// // // //     industry: "Tech Startup",
// // // //     result: "300% Increase in Inbound Leads",
// // // //     href: "/work/lumina",
// // // //     // Placeholder gradient colors since we don't have images yet
// // // //     gradient: "from-blue-900 to-[#111827]", 
// // // //   },
// // // //   {
// // // //     id: 2,
// // // //     brand: "Aura Wellness",
// // // //     industry: "E-Commerce",
// // // //     result: "$2.4M ARR in 12 Months",
// // // //     href: "/work/aura",
// // // //     gradient: "from-indigo-900 to-[#111827]",
// // // //   },
// // // //   {
// // // //     id: 3,
// // // //     brand: "Finova Capital",
// // // //     industry: "Fintech",
// // // //     result: "-40% Customer Acquisition Cost",
// // // //     href: "/work/finova",
// // // //     gradient: "from-slate-800 to-[#111827]",
// // // //   },
// // // // ];

// // // // const containerVariants = {
// // // //   hidden: { opacity: 0 },
// // // //   visible: {
// // // //     opacity: 1,
// // // //     transition: {
// // // //       staggerChildren: 0.15,
// // // //     },
// // // //   },
// // // // };

// // // // const cardVariants = {
// // // //   hidden: { opacity: 0, y: 30 },
// // // //   visible: { 
// // // //     opacity: 1, 
// // // //     y: 0, 
// // // //     transition: { duration: 0.6, ease: "easeOut" } 
// // // //   },
// // // // };

// // // // export function FeaturedWork() {
// // // //   return (
// // // //     <section className="relative bg-[#0A0A0A] px-6 py-24 md:py-32">
// // // //       <div className="mx-auto max-w-7xl">
        
// // // //         {/* Section Header */}
// // // //         <div className="mb-16 max-w-3xl md:mb-24">
// // // //           <motion.h2 
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             whileInView={{ opacity: 1, y: 0 }}
// // // //             viewport={{ once: true, margin: "-100px" }}
// // // //             className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
// // // //           >
// // // //             Work That Drives <br />
// // // //             <span className="text-[#6495ED]">Business Growth.</span>
// // // //           </motion.h2>
// // // //           <motion.p 
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             whileInView={{ opacity: 1, y: 0 }}
// // // //             viewport={{ once: true, margin: "-100px" }}
// // // //             transition={{ delay: 0.1 }}
// // // //             className="mt-6 text-lg leading-relaxed text-gray-400 md:text-xl"
// // // //           >
// // // //             We partner with ambitious brands to solve growth challenges through strategy, performance marketing, creative execution, and commerce systems.
// // // //           </motion.p>
// // // //         </div>

// // // //         {/* Project Cards Grid */}
// // // //         <motion.div 
// // // //           variants={containerVariants}
// // // //           initial="hidden"
// // // //           whileInView="visible"
// // // //           viewport={{ once: true, margin: "-100px" }}
// // // //           className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
// // // //         >
// // // //           {featuredProjects.map((project) => (
// // // //             <motion.div key={project.id} variants={cardVariants}>
// // // //               <TransitionLink href={project.href} className="block group">
// // // //                 {/* Card Container: #111827 bg, #1F2937 border
// // // //                   Hover: Glass border #6495ED and subtle glow 
// // // //                 */}
// // // //                 <div className="relative h-full overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#6495ED] group-hover:shadow-[0_0_30px_rgba(100,149,237,0.1)]">
                  
// // // //                   {/* Image Placeholder Area (Top Half) */}
// // // //                   <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} opacity-80 transition-opacity duration-300 group-hover:opacity-100`} />
                  
// // // //                   {/* Content Area (Bottom Half) */}
// // // //                   <div className="flex flex-col p-8">
// // // //                     {/* Industry */}
// // // //                     <span className="mb-3 text-xs font-bold uppercase tracking-widest text-[#6495ED]">
// // // //                       {project.industry}
// // // //                     </span>
                    
// // // //                     {/* Brand Name */}
// // // //                     <h3 className="mb-2 text-2xl font-semibold text-white">
// // // //                       {project.brand}
// // // //                     </h3>
                    
// // // //                     {/* Short Result */}
// // // //                     <p className="mb-8 text-gray-400">
// // // //                       {project.result}
// // // //                     </p>
                    
// // // //                     {/* View Case Study CTA */}
// // // //                     <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-[#6495ED]">
// // // //                       View Case Study
// // // //                       <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
// // // //                     </div>
// // // //                   </div>

// // // //                 </div>
// // // //               </TransitionLink>
// // // //             </motion.div>
// // // //           ))}
// // // //         </motion.div>

// // // //         {/* Optional: View All Button at the bottom */}
// // // //         <motion.div 
// // // //           initial={{ opacity: 0, y: 20 }}
// // // //           whileInView={{ opacity: 1, y: 0 }}
// // // //           viewport={{ once: true }}
// // // //           transition={{ delay: 0.4 }}
// // // //           className="mt-16 flex justify-center md:mt-20"
// // // //         >
// // // //           <TransitionLink 
// // // //             href="/work"
// // // //             className="group flex items-center gap-2 rounded-full border border-[#1F2937] bg-transparent px-8 py-4 text-sm font-semibold text-white transition-all hover:border-[#6495ED] hover:bg-[#6495ED]/10"
// // // //           >
// // // //             View All Work
// // // //             <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
// // // //           </TransitionLink>
// // // //         </motion.div>

// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }



// // "use client";

// // import { motion } from "framer-motion";
// // import { ArrowRight } from "lucide-react";
// // import { TransitionLink } from "@/components/layout/PageTransition";

// // const featuredProjects = [
// //   {
// //     id: 1,
// //     brand: "Lumina Edge",
// //     industry: "Tech Startup",
// //     result: "300% Increase in Inbound Leads",
// //     href: "/work/lumina",
// //     gradient: "from-blue-900 to-[#111827]", 
// //   },
// //   {
// //     id: 2,
// //     brand: "Aura Wellness",
// //     industry: "E-Commerce",
// //     result: "$2.4M ARR in 12 Months",
// //     href: "/work/aura",
// //     gradient: "from-indigo-900 to-[#111827]",
// //   },
// //   {
// //     id: 3,
// //     brand: "Finova Capital",
// //     industry: "Fintech",
// //     result: "-40% Customer Acquisition Cost",
// //     href: "/work/finova",
// //     gradient: "from-slate-800 to-[#111827]",
// //   },
// // ];

// // const containerVariants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       // Increased from 0.15 to 0.25 for a more pronounced "one by one" effect
// //       staggerChildren: 0.25, 
// //     },
// //   },
// // };

// // const cardVariants = {
// //   hidden: { opacity: 0, y: 40 }, // Increased drop slightly for more impact
// //   visible: { 
// //     opacity: 1, 
// //     y: 0, 
// //     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } // Buttery smooth custom easing
// //   },
// // };

// // export function FeaturedWork() {
// //   return (
// //     <section className="relative bg-[#0A0A0A] px-6 py-24 md:py-32">
// //       <div className="mx-auto max-w-7xl">
        
// //         {/* Section Header */}
// //         <div className="mb-16 max-w-3xl md:mb-24">
// //           <motion.h2 
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true, margin: "-100px" }}
// //             transition={{ duration: 0.7, ease: "easeOut" }}
// //             className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
// //           >
// //             Work That Drives <br />
// //             <span className="text-[#6495ED]">Business Growth.</span>
// //           </motion.h2>
// //           <motion.p 
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true, margin: "-100px" }}
// //             transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
// //             className="mt-6 text-lg leading-relaxed text-gray-400 md:text-xl"
// //           >
// //             We partner with ambitious brands to solve growth challenges through strategy, performance marketing, creative execution, and commerce systems.
// //           </motion.p>
// //         </div>

// //         {/* Project Cards Grid */}
// //         <motion.div 
// //           variants={containerVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true, margin: "-100px" }}
// //           className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
// //         >
// //           {featuredProjects.map((project) => (
// //             <motion.div 
// //               key={project.id} 
// //               variants={cardVariants}
// //               style={{ willChange: "transform, opacity" }} 
// //             >
// //               <TransitionLink href={project.href} className="block group">
// //                 {/* Inner Div: Handles the Hover Effects. 
// //                   Kept separate from motion.div so the translate-y-2 hover doesn't break! 
// //                 */}
// //                 <div className="relative h-full overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#6495ED] group-hover:shadow-[0_0_30px_rgba(100,149,237,0.1)]">
                  
// //                   <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} opacity-80 transition-opacity duration-300 group-hover:opacity-100`} />
                  
// //                   <div className="flex flex-col p-8">
// //                     <span className="mb-3 text-xs font-bold uppercase tracking-widest text-[#6495ED]">
// //                       {project.industry}
// //                     </span>
                    
// //                     <h3 className="mb-2 text-2xl font-semibold text-white">
// //                       {project.brand}
// //                     </h3>
                    
// //                     <p className="mb-8 text-gray-400">
// //                       {project.result}
// //                     </p>
                    
// //                     <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-[#6495ED]">
// //                       View Case Study
// //                       <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
// //                     </div>
// //                   </div>

// //                 </div>
// //               </TransitionLink>
// //             </motion.div>
// //           ))}
// //         </motion.div>

// //         {/* View All Button */}
// //         <motion.div 
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.7, delay: 0.4 }}
// //           className="mt-16 flex justify-center md:mt-20"
// //         >
// //           <TransitionLink 
// //             href="/work"
// //             className="group flex items-center gap-2 rounded-full border border-[#1F2937] bg-transparent px-8 py-4 text-sm font-semibold text-white transition-all hover:border-[#6495ED] hover:bg-[#6495ED]/10"
// //           >
// //             View All Work
// //             <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
// //           </TransitionLink>
// //         </motion.div>

// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { useRef, useState } from "react";
// import { motion, Variants } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { TransitionLink } from "@/components/layout/PageTransition";

// // Extracted from your original code, updated with the new design data
// const featuredProjects = [
//   {
//     id: "lumina",
//     brand: "Lumina Edge",
//     industry: "Tech Startup",
//     result: "300% Increase in Inbound Leads",
//     href: "/work/lumina",
//   },
//   {
//     id: "aura",
//     brand: "Aura Wellness",
//     industry: "E-Commerce",
//     result: "$2.4M ARR in 12 Months",
//     href: "/work/aura",
//   },
//   {
//     id: "finova",
//     brand: "Finova Capital",
//     industry: "Fintech",
//     result: "-40% Customer Acquisition Cost",
//     href: "/work/finova",
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.2 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { 
//     opacity: 1, 
//     y: 0, 
//     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
//   },
// };

// // Re-implemented your TiltCard with the new dark UI
// function TiltCard({
//   brand,
//   industry,
//   result,
//   href,
// }: {
//   brand: string;
//   industry: string;
//   result: string;
//   href: string;
// }) {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const [transform, setTransform] = useState("");

//   const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const card = cardRef.current;
//     if (!card) return;
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;
//     const rotateX = ((y - centerY) / centerY) * -8;
//     const rotateY = ((x - centerX) / centerX) * 8;
//     setTransform(
//       `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
//     );
//   };

//   const handleLeave = () => {
//     setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
//   };

//   return (
//     <motion.div variants={cardVariants} style={{ willChange: "transform, opacity" }}>
//       <TransitionLink href={href} className="block w-full h-full">
//         <div
//           ref={cardRef}
//           onMouseMove={handleMove}
//           onMouseLeave={handleLeave}
//           style={{ transform, transition: "transform 0.15s ease-out" }}
//           // Base UI: #111827 bg, #1F2937 border. Hover: #6495ED border + glow
//           className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827] transition-colors duration-300 hover:border-[#6495ED] hover:shadow-[0_0_30px_rgba(100,149,237,0.15)]"
//         >
//           {/* Glass Hover Gradient (from your original code, adapted to blue) */}
//           <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#6495ED]/10 via-transparent to-[#111827] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
//           <div className="relative z-10 flex h-full flex-col p-8">
//             <span className="mb-3 text-xs font-bold uppercase tracking-widest text-[#6495ED]">
//               {industry}
//             </span>
            
//             <h3 className="mb-2 text-2xl font-semibold text-white">
//               {brand}
//             </h3>
            
//             <p className="mb-8 text-gray-400">
//               {result}
//             </p>
            
//             <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-[#6495ED]">
//               View Case Study
//               <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//             </div>
//           </div>
//         </div>
//       </TransitionLink>
//     </motion.div>
//   );
// }

// export function FeaturedWork() {
//   return (
//     <section className="relative bg-[#0A0A0A] px-6 py-24 md:py-32">
//       <div className="mx-auto max-w-7xl">
        
//         {/* Section Header */}
//         <div className="mb-16 max-w-3xl md:mb-24">
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//             className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
//           >
//             Work That Drives <br />
//             <span className="text-[#6495ED]">Business Growth.</span>
//           </motion.h2>
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
//             className="mt-6 text-lg leading-relaxed text-gray-400 md:text-xl"
//           >
//             We partner with ambitious brands to solve growth challenges through strategy, performance marketing, creative execution, and commerce systems.
//           </motion.p>
//         </div>

//         {/* Project Cards Grid - Hardware Accelerated Stagger */}
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
//         >
//           {featuredProjects.map((project) => (
//             <TiltCard 
//               key={project.id}
//               brand={project.brand}
//               industry={project.industry}
//               result={project.result}
//               href={project.href}
//             />
//           ))}
//         </motion.div>

//         {/* View All Button */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.4 }}
//           className="mt-16 flex justify-center md:mt-20"
//         >
//           <TransitionLink 
//             href="/work"
//             className="group flex items-center gap-2 rounded-full border border-[#1F2937] bg-transparent px-8 py-4 text-sm font-semibold text-white transition-all hover:border-[#6495ED] hover:bg-[#6495ED]/10"
//           >
//             View All Work
//             <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//           </TransitionLink>
//         </motion.div>

//       </div>
//     </section>
//   );
// }

"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/layout/PageTransition";

const featuredProjects = [
  {
    id: "lumina",
    brand: "Lumina Edge",
    industry: "Tech Startup",
    result: "300% Increase in Inbound Leads",
    href: "/work/lumina",
    gradient: "from-blue-900 to-[#111827]",
  },
  {
    id: "aura",
    brand: "Aura Wellness",
    industry: "E-Commerce",
    result: "$2.4M ARR in 12 Months",
    href: "/work/aura",
    gradient: "from-indigo-900 to-[#111827]",
  },
  {
    id: "finova",
    brand: "Finova Capital",
    industry: "Fintech",
    result: "-40% Customer Acquisition Cost",
    href: "/work/finova",
    gradient: "from-slate-800 to-[#111827]",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    // FIXED: Added "as const" to strictly type this as a 4-item tuple for Framer Motion
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } 
  },
};

function TiltCard({
  brand,
  industry,
  result,
  href,
  gradient,
}: {
  brand: string;
  industry: string;
  result: string;
  href: string;
  gradient: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    // Direct DOM manipulation to prevent React re-render lag
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <motion.div variants={cardVariants} style={{ willChange: "transform, opacity" }}>
      <TransitionLink href={href} className="block w-full h-full">
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ transition: "transform 0.15s ease-out" }}
          className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#1F2937] bg-[#111827] shadow-2xl shadow-blue-900/10 transition-colors duration-300 hover:border-[#6495ED]"
        >
          <div className={`h-48 w-full bg-gradient-to-br ${gradient} opacity-80`} />
          
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-[#6495ED]/20 via-transparent to-[#4F7DF3]/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative z-20 flex h-full flex-col p-8">
            <span className="mb-3 text-xs font-bold uppercase tracking-widest text-[#6495ED]">
              {industry}
            </span>
            
            <h3 className="mb-2 text-2xl font-bold text-white">
              {brand}
            </h3>
            
            <p className="mb-8 text-gray-400">
              {result}
            </p>
            
            <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-[#6495ED]">
              View Case Study
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </TransitionLink>
    </motion.div>
  );
}

export function FeaturedWork() {
  return (
    <section className="relative bg-[#0A0A0A] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-16 max-w-3xl md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Work That Drives <br />
            <span className="text-[#6495ED]">Business Growth.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mt-6 text-lg leading-relaxed text-gray-400 md:text-xl"
          >
            We partner with ambitious brands to solve growth challenges through strategy, performance marketing, creative execution, and commerce systems.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredProjects.map((project) => (
            <TiltCard 
              key={project.id}
              brand={project.brand}
              industry={project.industry}
              result={project.result}
              href={project.href}
              gradient={project.gradient}
            />
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 flex justify-center md:mt-20"
        >
          <TransitionLink 
            href="/work"
            className="group flex items-center gap-2 rounded-full border border-[#1F2937] bg-transparent px-8 py-4 text-sm font-semibold text-white transition-all hover:border-[#6495ED] hover:bg-[#6495ED]/10"
          >
            View All Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </TransitionLink>
        </motion.div>

      </div>
    </section>
  );
}