"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TransitionLink } from "@/components/layout/PageTransition";
import { ArrowRight, ChevronDown, BarChart3, Target, TrendingUp, ShieldCheck, LineChart, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const allCategories = [
  "All Insights",
  "Growth Strategy",
  "Performance",
  "E-commerce",
  "Branding",
  "SEO",
  "Paid Media",
  "Analytics",
  "Content",
];

const ITEMS_PER_PAGE = 6;

export default function InsightsClient({
  initialPosts = [], // Default to empty array to prevent undefined errors
}: {
  initialPosts: any[];
}) {
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, sortOrder]);

  // 1. Filter Posts
  const filteredPosts =
    activeCategory === "All Insights"
      ? initialPosts
      : initialPosts.filter((post) =>
          post.categories?.includes(activeCategory),
        );

  // 2. Sort Posts (Safe copy of array)
  const sortedPosts = [...(filteredPosts || [])].sort((a, b) => {
    const dateA = new Date(a.publishedAt || 0).getTime();
    const dateB = new Date(b.publishedAt || 0).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  // 3. Paginate Posts
  const totalPages = Math.ceil(sortedPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">         

{/* 1. HERO SECTION */}
<section className="relative min-h-[80vh] overflow-hidden bg-[#0A0A0A]">

  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/insights/insights-bg.png"
      alt="Insights Background"
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />
  </div>

  {/* Optional Dark Overlay */}
  <div className="absolute inset-0 z-[1] bg-black/40" />

  {/* Content */}
  <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center px-6">
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6495ED]">
        The GoDigital Journal
      </p>

      <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white">
        Ideas, strategies &
        <br />
        lessons that{" "}
        <span className="text-[#6495ED]">
          drive growth.
        </span>
      </h1>

      <p className="mt-8 max-w-md text-base md:text-lg leading-relaxed text-gray-300">
        Real insights from the trenches of performance,
        branding, commerce and growth systems.
      </p>
    </div>
  </div>
</section>


    {/* 1. LIGHT HERO SECTION */}

      {/* <section className="bg-[#ffffff] pt-32 pb-20 md:pt-40 md:pb-24 px-6 rounded-b-[2rem] md:rounded-b-[4rem]">
        
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6495ED]">
              The GoDigital Journal
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-[4rem] max-w-3xl">
              Ideas, strategies & lessons that{" "}
              <span className="text-[#6495ED]">drive growth.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-md">
              Real insights from the trenches of performance, branding, commerce
              and growth systems.
            </p>
          </div>
        </section>   */}

        {/* 2. FILTER & SORT BAR */}
        <section className="mx-auto max-w-7xl px-6 py-10 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Pill Filters */}
            <div className="flex flex-wrap gap-4 md:gap-8 items-center w-full overflow-x-auto no-scrollbar">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap text-sm transition-colors flex items-center gap-2 ${
                    activeCategory === cat
                      ? "text-[#0A0A0A] font-bold border border-gray-200 px-4 py-2 rounded-full shadow-sm bg-white"
                      : "text-gray-500 font-semibold hover:text-[#0A0A0A]"
                  }`}
                >
                  {activeCategory === cat && (
                    <span className="w-2 h-2 rounded-full bg-[#6495ED]"></span>
                  )}
                  {cat}
                </button>
              ))}
            </div>

            {/* Custom Sort Dropdown */}
            <div className="relative shrink-0 z-20">
              <button 
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="flex items-center gap-4 rounded-2xl border border-[#1e293b] bg-[#0A0F1C] px-5 py-3 transition-colors hover:border-white/20 text-left shadow-lg"
              >
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold text-white/60 leading-none mb-1">Sort by:</span>
                  <span className="text-sm font-bold text-white leading-none">
                    {sortOrder === "newest" ? "Newest" : "Oldest"}
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-white/60 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {sortDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setSortDropdownOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full z-40 mt-2 w-full min-w-[160px] overflow-hidden rounded-xl border border-[#1e293b] bg-[#0A0F1C] shadow-2xl"
                    >
                      <button
                        onClick={() => { setSortOrder("newest"); setSortDropdownOpen(false); }}
                        className={`block w-full px-4 py-3 text-left text-sm font-bold transition-colors hover:bg-white/5 ${sortOrder === "newest" ? "text-white" : "text-gray-400"}`}
                      >
                        Newest
                      </button>
                      <button
                        onClick={() => { setSortOrder("oldest"); setSortDropdownOpen(false); }}
                        className={`block w-full px-4 py-3 text-left text-sm font-bold transition-colors hover:bg-white/5 ${sortOrder === "oldest" ? "text-white" : "text-gray-400"}`}
                      >
                        Oldest
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 3. UNIFIED INSIGHTS GRID */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          {paginatedPosts.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No insights found in this category.
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {paginatedPosts.map((post: any) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={post.id}
                  >
                    <Link
                      href={`/insights/${post.slug}`}
                      className="group relative flex flex-col justify-between h-full w-full rounded-[24px] bg-[#111622] overflow-hidden border border-white/5 transition-all duration-300 hover:border-[#6495ED]/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
                    >
                      {/* Top Image Area */}
                      <div className="relative h-56 w-full bg-[#1A2235] overflow-hidden shrink-0">
                        {post.image && (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          />
                        )}
                      </div>
                      
                      {/* Bottom Content Area */}
                      <div className="flex flex-1 flex-col p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                          <span className="rounded-full border border-[#2a3e63] bg-transparent px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#6495ED]">
                            {post.categories?.[0] || "Insight"}
                          </span>
                          <span className="text-[12px] font-medium text-gray-400">
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric", year: "numeric" },
                            )}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white leading-snug group-hover:text-[#6495ED] transition-colors mb-3 line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Description excerpt */}
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-8 font-medium">
                          {post.author ? `By ${post.author}` : "Discover the strategies that are driving digital growth forward."}
                        </p>
                        
                        {/* Footer */}
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                          <p className="text-sm font-bold text-gray-400">
                            {post.readTime || "5 min read"}
                          </p>
                          <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-[#6495ED] transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* DYNAMIC PAGINATION */}
        {totalPages > 1 && (
          <section className="mt-4 mb-24 flex justify-center gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                  currentPage === i + 1
                    ? "bg-[#6495ED] text-white shadow-lg shadow-[#6495ED]/20"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-[#0A0A0A]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            {currentPage < totalPages && (
              <button 
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:bg-gray-50 hover:text-[#0A0A0A]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </section>
        )}

        {/* 4. NEWSLETTER BANNER */}
       <section className="mx-auto mt-24 max-w-7xl px-6 md:px-8">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-white/10 bg-gradient-to-r from-[#111827] to-[#0A0A0A] p-8 shadow-2xl md:flex-row md:p-12">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#6495ED]/10">
                <TrendingUp className="h-8 w-8 text-[#6495ED]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Ready to Be Our Next Success Story?</h3>
                <p className="mt-2 text-gray-400">Let's grow your brand with performance-driven strategies.</p>
              </div>
            </div>
            
            <TransitionLink 
              href="/contact"
              className="group flex shrink-0 items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-[#0A0A0A] transition-all hover:bg-gray-200"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </TransitionLink>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}


