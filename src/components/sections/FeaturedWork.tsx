"use client";

import { useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
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

interface Project {
  id: string;
  brand: string;
  industry: string;
  result: string;
  image: string;
}

function TiltCard({
  brand,
  industry,
  result,
  href,
  image,
}: {
  brand: string;
  industry: string;
  result: string;
  href: string;
  image: string;
}) {
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
      className="h-full w-full"
    >
      <Link href={href} className="block h-full w-full">
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            transition: "transform 0.15s ease-out",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="
            group
            relative
            flex
            h-full
            flex-col
            overflow-hidden
            rounded-[20px]
            border
            border-[#1E293B]
            bg-[#0B101A]
            shadow-xl
            shadow-black/10
            transition-colors
            duration-300
            hover:border-[#5C89F8]/50
            transform-gpu
          "
        >
          {/* Top Image Section (Proportioned beautifully so text isn't crushed) */}
          <div className="relative h-[220px] w-full shrink-0 border-b border-[#1E293B] bg-[#121A2A]">
            {image ? (
              <Image
                src={image}
                alt={brand}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-slate-600 transition-transform duration-700 group-hover:scale-105">
                [ Image Placeholder ]
              </div>
            )}
            
            {/* Subtle Glass Reflection Overlay for 3D effect */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-[#5C89F8]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Bottom Content Section */}
          <div className="relative z-20 flex flex-1 flex-col p-6 bg-[#0B101A]">
            {/* Category / Industry */}
            <span className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#5C89F8]">
              {industry || "Retail"}
            </span>

            {/* Title / Brand */}
            <h3 className="mb-2 text-xl xl:text-[22px] font-bold text-white tracking-tight line-clamp-2 leading-snug">
              {brand}
            </h3>

            {/* Sales Figure / Result */}
            <p className="mb-8 text-[15px] text-[#8B95A5] font-medium line-clamp-2 leading-relaxed">
              {result}
            </p>

            {/* Footer Action */}
            <div className="mt-auto flex items-center gap-2 text-[14px] font-bold text-white transition-colors group-hover:text-[#5C89F8]">
              View Case Study
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedWork({ projects = [] }: { projects?: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smarter scroll function that perfectly scrolls exactly 1 card width
  const scrollRight = () => {
    if (scrollRef.current) {
      const cardElement = scrollRef.current.firstElementChild as HTMLElement;
      // Scroll by card width + 20px gap
      const scrollAmount = cardElement ? cardElement.clientWidth + 20 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardElement = scrollRef.current.firstElementChild as HTMLElement;
      const scrollAmount = cardElement ? cardElement.clientWidth + 20 : 340;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-white px-6 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
          
          {/* LEFT COLUMN: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-start lg:w-[28%] xl:w-[25%] shrink-0"
          >
            <h2 className="text-xl font-bold leading-tight tracking-tight text-[#0A0A0A] lg:text-5xl xl:text-[3.5rem] xl:leading-[1.1]">
              Work That Drives <br />
              <span className="text-[#6495ED]">Business<br/>Growth.</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-gray-600 xl:text-base pr-4">
              We partner with ambitious brands to solve growth challenges through
              strategy, performance marketing, creative execution, and commerce
              systems.
            </p>
          </motion.div>

          {/* RIGHT COLUMN: Scrollable Cards Grid + Right Aligned CTA */}
          <div className="flex w-full flex-col lg:w-[72%] xl:w-[75%] relative group/slider">
            
            {projects.length === 0 ? (
              <div className="text-gray-500 py-10 pl-4">No projects published yet.</div>
            ) : (
              <>
                {/* Floating Hollow "<" Left Arrow Button */}
                {/* {projects.length > 2 && ( */}
                  {/*  <button
                     onClick={scrollLeft}
                     className="absolute -left-5 md:-left-6 top-[42%] z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white/60 backdrop-blur-md shadow-sm transition-all hover:border-[#6495ED] hover:text-[#6495ED] hover:bg-white hover:scale-110"
                     aria-label="Scroll left to view previous projects"
                   >
                     <ChevronLeft className="h-6 w-6 text-gray-700 hover:text-[#6495ED]" strokeWidth={1.5} />
                   </button>
                 )} */}

                <motion.div
                  ref={scrollRef}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {projects.map((project) => (
                    // THIS IS THE FIX: Exactly 3 cards fit perfectly using calc()
                    <div 
                      key={project.id} 
                      className="w-[85vw] md:w-[calc((100%-20px)/2)] xl:w-[calc((100%-40px)/3)] shrink-0 snap-start h-[460px] pb-2"
                    >
                      <TiltCard
                        brand={project.brand}
                        industry={project.industry}
                        result={project.result}
                        href={`/work/${project.id}`}
                        image={project.image}
                      />
                    </div>
                  ))}
                </motion.div>

                {/* Floating Hollow ">" Right Arrow Button */}
                {projects.length > 2 && (
                  <button
                    onClick={scrollRight}
                    className="absolute -right-5 md:-right-6 top-[42%] z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white/60 backdrop-blur-md shadow-sm transition-all hover:border-[#6495ED] hover:text-[#6495ED] hover:bg-white hover:scale-110"
                    aria-label="Scroll right to view more projects"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-700 hover:text-[#6495ED]" strokeWidth={1.5} />
                  </button>
                )}
              </>
            )}

            {/* VIEW ALL WORK */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-2 flex justify-end"
            >
              <Link
                href="/work"
                className="group flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-[#0A0A0A] transition-colors hover:text-[#6495ED]"
              >
                View All Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}