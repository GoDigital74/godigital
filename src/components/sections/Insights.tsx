"use client";

import { useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
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
      style={{ willChange: "transform, opacity" }}
      className="h-full"
    >
      <Link href={`/insights/${post.slug}`} className="block h-full w-full">
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

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
              <p className="text-sm font-bold text-gray-400">
                {post.readTime || "5 min read"}
              </p>
              <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#6495ED]" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function Insights({ posts = [] }: { posts?: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const displayPosts = posts.slice(0, 10);

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 424;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 424;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
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
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8"
        >
          {/* Updated Header Section */}
          <div className="flex flex-col gap-2">
             <span className="text-sm font-bold uppercase tracking-widest text-[#6495ED]">Latest Insights</span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
               Ideas. Trends. Perspectives.
             </h2>
          </div>

          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#6495ED]"
          >
            View All Insights
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {displayPosts.length === 0 ? (
          <div className="text-gray-500 py-10">No insights published yet.</div>
        ) : (
          <div className="relative group/slider">
            
            {/* Left Scroll Button */}
            {displayPosts.length > 2 && (
              <button
                onClick={scrollLeft}
                className="absolute -left-5 md:-left-6 top-[42%] z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-700 bg-[#0A0A0A]/60 backdrop-blur-md shadow-sm transition-all hover:border-[#6495ED] hover:text-[#6495ED] hover:scale-110"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6 text-gray-300 hover:text-[#6495ED]" />
              </button>
            )}

            {/* Carousel */}
            <motion.div
              ref={scrollRef}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {displayPosts.map((post) => (
                <div key={post.id || post.slug} className="w-[85vw] md:w-[400px] shrink-0 snap-center h-full">
                  <InsightTiltCard post={post} />
                </div>
              ))}
            </motion.div>

            {/* Right Scroll Button */}
            {displayPosts.length > 2 && (
              <button
                onClick={scrollRight}
                className="absolute -right-5 md:-right-6 top-[42%] z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-700 bg-[#0A0A0A]/60 backdrop-blur-md shadow-sm transition-all hover:border-[#6495ED] hover:text-[#6495ED] hover:scale-110"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6 text-gray-300 hover:text-[#6495ED]" />
              </button>
            )}

          </div>
        )}
      </div>
    </section>
  );
}

