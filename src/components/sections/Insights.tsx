// // "use client";

// // import { useRef, useEffect } from "react";
// // import { motion, Variants } from "framer-motion";
// // import { ArrowUpRight } from "lucide-react";
// // import { insights } from "@/lib/data";
// // import { TransitionLink } from "@/components/layout/PageTransition";

// // const containerVariants: Variants = {
// //   hidden: {
// //     opacity: 0,
// //   },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       staggerChildren: 0.15,
// //     },
// //   },
// // };

// // const cardVariants: Variants = {
// //   hidden: {
// //     opacity: 0,
// //     y: 30,
// //   },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: {
// //       duration: 0.6,
// //       ease: [0.22, 1, 0.36, 1],
// //     },
// //   },
// // };

// // function InsightTiltCard({
// //   title,
// //   category,
// //   date,
// //   excerpt,
// // }: {
// //   title: string;
// //   category: string;
// //   date: string;
// //   excerpt: string;
// // }) {
// //   const cardRef = useRef<HTMLDivElement>(null);
// //   const frameRef = useRef<number | null>(null);

// //   useEffect(() => {
// //     return () => {
// //       if (frameRef.current) {
// //         cancelAnimationFrame(frameRef.current);
// //       }
// //     };
// //   }, []);

// //   const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
// //     if (!cardRef.current) return;

// //     const rect = cardRef.current.getBoundingClientRect();
// //     const mouseX = e.clientX - rect.left;
// //     const mouseY = e.clientY - rect.top;

// //     if (frameRef.current) {
// //       cancelAnimationFrame(frameRef.current);
// //     }

// //     frameRef.current = requestAnimationFrame(() => {
// //       if (!cardRef.current) return;

// //       const centerX = rect.width / 2;
// //       const centerY = rect.height / 2;

// //       const rotateX = ((mouseY - centerY) / centerY) * -6;
// //       const rotateY = ((mouseX - centerX) / centerX) * 6;

// //       cardRef.current.style.transform = `
// //         perspective(1000px)
// //         rotateX(${rotateX}deg)
// //         rotateY(${rotateY}deg)
// //         translateZ(0)
// //         scale3d(1.02,1.02,1.02)
// //       `;
// //     });
// //   };

// //   const handleLeave = () => {
// //     if (!cardRef.current) return;

// //     cardRef.current.style.transform = `
// //       perspective(1000px)
// //       rotateX(0deg)
// //       rotateY(0deg)
// //       translateZ(0)
// //       scale3d(1,1,1)
// //     `;
// //   };

// //   return (
// //     <motion.div
// //       variants={cardVariants}
// //       style={{
// //         willChange: "transform, opacity",
// //       }}
// //     >
// //       <TransitionLink href="/insights" className="block h-full w-full">
// //         <div
// //           ref={cardRef}
// //           onMouseMove={handleMove}
// //           onMouseLeave={handleLeave}
// //           style={{
// //             transition: "transform 0.15s ease-out",
// //             transformStyle: "preserve-3d",
// //             willChange: "transform",
// //           }}
// //           className="
// //             group
// //             relative
// //             flex
// //             h-full
// //             flex-col
// //             overflow-hidden
// //             rounded-3xl
// //             border
// //             border-[#1F2937]
// //             bg-[#111827]
// //             shadow-lg
// //             shadow-black/20
// //             transition-colors
// //             duration-300
// //             hover:border-[#6495ED]
// //             transform-gpu
// //           "
// //         >
// //           {/* Top Asset Space / Dark Image Placeholder */}
// //           <div className="relative h-48 w-full bg-white/5 opacity-80" />

// //           {/* Interactive Glass Reflection Overlay */}
// //           <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-[#6495ED]/15 via-transparent to-[#4F7DF3]/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

// //           {/* Card Content Area */}
// //           <div className="relative z-20 flex h-full flex-col p-8">
// //             <div className="mb-4 flex items-center justify-between gap-2">
// //               {/* Tailwind exactly mapping to your request: Blue Outline -> Blue Fill on Hover */}
// //               <span className="inline-block rounded-full border border-[#6495ED] bg-transparent px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#6495ED] transition-all duration-300 group-hover:bg-[#6495ED] group-hover:text-white">
// //                 {category}
// //               </span>
// //               <time className="text-xs text-gray-500">{date}</time>
// //             </div>

// //             <h3 className="mb-3 text-2xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#6495ED]">
// //               {title}
// //             </h3>

// //             <p className="mb-8 flex-1 text-sm leading-relaxed text-gray-400 line-clamp-2">
// //               {excerpt}
// //             </p>

// //             {/* Read / Action details running along the bottom deck */}
// //             <div className="mt-auto flex items-center justify-between text-sm font-semibold text-gray-400 transition-colors duration-300 group-hover:text-white">
// //               <span>5 min read</span>
// //               <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#6495ED]" />
// //             </div>
// //           </div>
// //         </div>
// //       </TransitionLink>
// //     </motion.div>
// //   );
// // }

// // export function Insights() {
// //   return (
// //     // Replaced global CSS class with exact background color bg-[#0A0A0A]
// //     <section className="relative bg-[#0A0A0A] px-6 py-24 md:py-32">
// //       <div className="mx-auto max-w-7xl">
// //         <motion.div
// //           initial={{
// //             opacity: 0,
// //             y: 20,
// //           }}
// //           whileInView={{
// //             opacity: 1,
// //             y: 0,
// //           }}
// //           viewport={{
// //             once: true,
// //             amount: 0.3,
// //           }}
// //           transition={{
// //             duration: 0.7,
// //           }}
// //           className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end"
// //         >
// //           <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
// //             Latest Insights
// //           </h2>
// //           <TransitionLink
// //             href="/insights"
// //             className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#6495ED]"
// //           >
// //             View All Articles
// //             <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
// //           </TransitionLink>
// //         </motion.div>

// //         <motion.div
// //           variants={containerVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{
// //             once: true,
// //             amount: 0.15,
// //           }}
// //           className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
// //         >
// //           {insights.map((post) => (
// //             <InsightTiltCard
// //               key={post.title}
// //               title={post.title}
// //               category={post.category}
// //               date={post.date}
// //               excerpt={post.excerpt}
// //             />
// //           ))}
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { useRef, useEffect } from "react";
// import { motion, Variants } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import Image from "next/image";
// import { TransitionLink } from "@/components/layout/PageTransition";

// const containerVariants: Variants = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const cardVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     y: 30,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// function InsightTiltCard({ post }: { post: any }) {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const frameRef = useRef<number | null>(null);

//   useEffect(() => {
//     return () => {
//       if (frameRef.current) {
//         cancelAnimationFrame(frameRef.current);
//       }
//     };
//   }, []);

//   const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!cardRef.current) return;

//     const rect = cardRef.current.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;

//     if (frameRef.current) {
//       cancelAnimationFrame(frameRef.current);
//     }

//     frameRef.current = requestAnimationFrame(() => {
//       if (!cardRef.current) return;

//       const centerX = rect.width / 2;
//       const centerY = rect.height / 2;

//       const rotateX = ((mouseY - centerY) / centerY) * -6;
//       const rotateY = ((mouseX - centerX) / centerX) * 6;

//       cardRef.current.style.transform = `
//         perspective(1000px)
//         rotateX(${rotateX}deg)
//         rotateY(${rotateY}deg)
//         translateZ(0)
//         scale3d(1.02,1.02,1.02)
//       `;
//     });
//   };

//   const handleLeave = () => {
//     if (!cardRef.current) return;

//     cardRef.current.style.transform = `
//       perspective(1000px)
//       rotateX(0deg)
//       rotateY(0deg)
//       translateZ(0)
//       scale3d(1,1,1)
//     `;
//   };

//   return (
//     <motion.div
//       variants={cardVariants}
//       style={{
//         willChange: "transform, opacity",
//       }}
//     >
//       <TransitionLink href={`/insights/${post.slug}`} className="block h-full w-full">
//         <div
//           ref={cardRef}
//           onMouseMove={handleMove}
//           onMouseLeave={handleLeave}
//           style={{
//             transition: "transform 0.15s ease-out",
//             transformStyle: "preserve-3d",
//             willChange: "transform",
//           }}
//           className="group relative flex flex-col justify-between h-full w-full rounded-[24px] bg-[#111622] overflow-hidden border border-white/5 transition-all duration-300 hover:border-[#6495ED]/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] transform-gpu"
//         >
//           {/* Top Image Area */}
//           <div className="relative h-56 w-full bg-[#1A2235] overflow-hidden shrink-0">
//             {post.image ? (
//               <Image
//                 src={post.image}
//                 alt={post.title}
//                 fill
//                 className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
//               />
//             ) : (
//               <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-slate-600 transition-transform duration-700 group-hover:scale-105">
//                 [ Image Placeholder ]
//               </div>
//             )}
            
//             {/* Interactive Glass Reflection Overlay for 3D effect */}
//             <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-[#6495ED]/15 via-transparent to-[#4F7DF3]/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//           </div>

//           {/* Bottom Content Area */}
//           <div className="flex flex-1 flex-col p-6 md:p-8 relative z-20">
//             <div className="flex items-center justify-between mb-6">
//               <span className="rounded-full border border-[#2a3e63] bg-transparent px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#6495ED]">
//                 {post.categories?.[0] || "Insight"}
//               </span>
//               <span className="text-[12px] font-medium text-gray-400">
//                 {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
//               </span>
//             </div>

//             <h3 className="text-xl md:text-2xl font-bold text-white leading-snug group-hover:text-[#6495ED] transition-colors mb-3 line-clamp-2">
//               {post.title}
//             </h3>

//             <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-8 font-medium">
//               {post.author ? `By ${post.author}` : "Discover the strategies that are driving digital growth forward."}
//             </p>

//             {/* Footer */}
//             <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
//               <p className="text-sm font-bold text-gray-400">
//                 {post.readTime || "5 min read"}
//               </p>
//               <ArrowUpRight className="w-5 h-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#6495ED]" />
//             </div>
//           </div>
//         </div>
//       </TransitionLink>
//     </motion.div>
//   );
// }

// // Accept the dynamic posts as a prop
// export function Insights({ posts = [] }: { posts?: any[] }) {
//   // Only display the first 3 recent posts on the home page
//   const displayPosts = posts.slice(0, 3);

//   return (
//     <section className="relative bg-[#0A0A0A] px-6 py-24 md:py-32">
//       <div className="mx-auto max-w-7xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.7 }}
//           className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end"
//         >
//           <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
//             Latest Insights
//           </h2>
//           <TransitionLink
//             href="/insights"
//             className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#6495ED]"
//           >
//             View All Articles
//             <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
//           </TransitionLink>
//         </motion.div>

//         {displayPosts.length === 0 ? (
//           <div className="text-gray-500 py-10">No insights published yet.</div>
//         ) : (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.15 }}
//             className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
//           >
//             {displayPosts.map((post) => (
//               <InsightTiltCard key={post.id || post.slug} post={post} />
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import { useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { TransitionLink } from "@/components/layout/PageTransition";

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function InsightTiltCard({ post }: { post: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((mouseY - centerY) / centerY) * -6;
      const rotateY = ((mouseX - centerX) / centerX) * 6;

      cardRef.current.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(0)
        scale3d(1.02,1.02,1.02)
      `;
    });
  };

  const handleLeave = () => {
    if (!cardRef.current) return;

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0)
      scale3d(1,1,1)
    `;
  };

  return (
    <motion.div
      variants={cardVariants}
      style={{
        willChange: "transform, opacity",
      }}
      className="h-full"
    >
      <TransitionLink href={`/insights/${post.slug}`} className="block h-full w-full">
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            transition: "transform 0.15s ease-out",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="group relative flex flex-col justify-between h-full w-full rounded-[24px] bg-[#111622] overflow-hidden border border-white/5 transition-all duration-300 hover:border-[#6495ED]/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] transform-gpu"
        >
          {/* Top Image Area */}
          <div className="relative h-56 w-full bg-[#1A2235] overflow-hidden shrink-0">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-slate-600 transition-transform duration-700 group-hover:scale-105">
                [ Image Placeholder ]
              </div>
            )}
            
            {/* Interactive Glass Reflection Overlay for 3D effect */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-[#6495ED]/15 via-transparent to-[#4F7DF3]/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Bottom Content Area */}
          <div className="flex flex-1 flex-col p-6 md:p-8 relative z-20">
            <div className="flex items-center justify-between mb-6">
              <span className="rounded-full border border-[#2a3e63] bg-transparent px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#6495ED]">
                {post.categories?.[0] || "Insight"}
              </span>
              <span className="text-[12px] font-medium text-gray-400">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug group-hover:text-[#6495ED] transition-colors mb-3 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-8 font-medium">
              {post.author ? `By ${post.author}` : "Discover the strategies that are driving digital growth forward."}
            </p>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
              <p className="text-sm font-bold text-gray-400">
                {post.readTime || "5 min read"}
              </p>
              {/* Changed to ChevronRight for the card */}
              <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#6495ED]" />
            </div>
          </div>
        </div>
      </TransitionLink>
    </motion.div>
  );
}

// Accept the dynamic posts as a prop
export function Insights({ posts = [] }: { posts?: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Show up to 10 posts so there is something to scroll through
  const displayPosts = posts.slice(0, 10);

  // Smooth scroll logic for the right arrow button
  const scrollRight = () => {
    if (scrollRef.current) {
      // Calculates scroll distance based on approximate card width + gap
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 424;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-[#0A0A0A] px-6 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Latest Insights
          </h2>
          <TransitionLink
            href="/insights"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#6495ED]"
          >
            View All Articles
            {/* Kept ArrowUpRight for the Header link */}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </TransitionLink>
        </motion.div>

        {displayPosts.length === 0 ? (
          <div className="text-gray-500 py-10">No insights published yet.</div>
        ) : (
          <div className="relative group/slider">
            
            {/* Horizontal Scroll Container */}
            <motion.div
              ref={scrollRef}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {displayPosts.map((post) => (
                // Fixed widths inside the flex container to force horizontal scrolling
                <div key={post.id || post.slug} className="w-[85vw] md:w-[400px] shrink-0 snap-center h-full">
                  <InsightTiltCard post={post} />
                </div>
              ))}
            </motion.div>

            {/* Floating Square Right Arrow Button (Matches your image) */}
            {displayPosts.length > 2 && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white shadow-xl transition-all hover:bg-gray-100 hover:scale-105"
                aria-label="Scroll right to view more cards"
              >
                <ArrowRight className="h-5 w-5 text-gray-800" strokeWidth={2} />
              </button>
            )}

          </div>
        )}
      </div>
    </section>
  );
}

