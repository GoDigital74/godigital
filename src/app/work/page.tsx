"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TransitionLink } from "@/components/layout/PageTransition";
import { ArrowRight, ChevronDown, BarChart3, Target, TrendingUp, ShieldCheck, LineChart } from "lucide-react";
import Image from "next/image";

// --- MOCK DATA FOR THE PORTFOLIO GRID ---
const categories = [
  "All Case Studies",
  "E-commerce",
  "Retail",
  "Health & Wellness",
  "Personal Care",
];

const caseStudies = [
  {
    id: "aruha",
    title: "Aruha",
    desc: "Amazon Optimization & Shopify Migration Strategy",
    category: "E-commerce",
    date: "2024-03-01", // Added for sorting
    metrics: [
      { value: "₹2.5L+", label: "Monthly Rev" },
      { value: "60+", label: "Orders/Day" },
      { value: "17x", label: "ROAS" },
      { value: "Shopify", label: "Platform" },
    ],
    image: "", // Left empty
  },
  {
    id: "sethi",
    title: "Sethi Watch Co.",
    desc: "Digital Transformation & Performance Marketing",
    category: "E-commerce",
    date: "2024-02-15", // Added for sorting
    metrics: [
      { value: "₹10L+", label: "Monthly Rev" },
      { value: "10X", label: "Google ROAS" },
      { value: "100%", label: "Digital" },
      { value: "Leads", label: "Increased" },
    ],
    image: "", // Left empty
  },
  {
    id: "titan",
    title: "Titan Eye+",
    desc: "Hyperlocal Retail Footfall Generation",
    category: "Retail",
    date: "2024-01-20", // Added for sorting
    metrics: [
      { value: "₹10L+", label: "1-Day Sales" },
      { value: "High", label: "Footfall" },
      { value: "Local", label: "Targeting" },
      { value: "Walk-ins", label: "Increased" },
    ],
    image: "", // Left empty
  },
  {
    id: "raymond",
    title: "Raymond",
    desc: "30-Day Retail Revenue Growth Campaign",
    category: "Retail",
    date: "2023-12-10", // Added for sorting
    metrics: [
      { value: "₹25L+", label: "Revenue" },
      { value: "30", label: "Days" },
      { value: "Local", label: "Awareness" },
      { value: "Footfall", label: "Increased" },
    ],
    image: "", // Left empty
  },
];

const ITEMS_PER_PAGE = 6;

// --- ANIMATION VARIANTS ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number]} },
};

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All Case Studies");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, sortOrder]);

  // 1. Filter
  const filteredStudies = activeFilter === "All Case Studies"
    ? caseStudies
    : caseStudies.filter((study) => study.category === activeFilter);

  // 2. Sort
  const sortedStudies = [...filteredStudies].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  // 3. Paginate
  const totalPages = Math.ceil(sortedStudies.length / ITEMS_PER_PAGE);
  const paginatedStudies = sortedStudies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-24">
        
        {/* ========================================= */}
        {/* 1. HERO SECTION WITH FLOATING STATS */}
        {/* ========================================= */}
        <section className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl pt-10"
            >
              <motion.p variants={fadeUpVariant} className="text-sm font-bold uppercase tracking-[0.2em] text-[#6495ED]">
                Our Work
              </motion.p>
              <motion.h1 variants={fadeUpVariant} className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-[4rem]">
                Case Studies That Speak for <span className="text-[#6495ED]">Results</span>
              </motion.h1>
              <motion.p variants={fadeUpVariant} className="mt-6 text-lg text-gray-400">
                We help ambitious brands grow with data-driven Meta Ads, Google Ads, and e-commerce strategies that deliver real business outcomes.
              </motion.p>

              {/* Icon Grid */}
              <motion.div variants={fadeUpVariant} className="mt-10 grid grid-cols-4 gap-4 text-center">
                {[
                  { icon: <BarChart3 className="mx-auto mb-3 h-6 w-6 text-[#6495ED]" />, label: "Data-Driven\nStrategies" },
                  { icon: <TrendingUp className="mx-auto mb-3 h-6 w-6 text-[#6495ED]" />, label: "Proven\nResults" },
                  { icon: <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-[#6495ED]" />, label: "Transparent\nReporting" },
                  { icon: <Target className="mx-auto mb-3 h-6 w-6 text-[#6495ED]" />, label: "Growth\nFocused" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6495ED]/10">
                      {item.icon}
                    </div>
                    <span className="mt-3 whitespace-pre-line text-xs font-semibold text-gray-300">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image & Floating Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden h-[600px] w-full lg:block"
            >
              {/* Main Product Presentation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[450px] w-[350px] overflow-hidden rounded-[3rem] bg-gradient-to-b from-[#111827] to-[#0A0A0A] p-4 shadow-2xl border border-white/5">
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-slate-600">
                    [ Hero Image Placeholder ]
                  </div>
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-black/80 to-transparent" />
                </div>
              </div>

              {/* Floating Stat 1 (Top Left) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-[15%] rounded-2xl border border-white/10 bg-[#111827]/80 p-5 backdrop-blur-md shadow-xl"
              >
                <p className="text-xs font-medium text-gray-400">Monthly Revenue</p>
                <p className="mt-1 text-2xl font-bold text-white">₹10L+</p>
                <LineChart className="mt-3 h-8 w-16 text-[#6495ED]" />
              </motion.div>

              {/* Floating Stat 2 (Top Right) */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 top-[25%] rounded-2xl border border-white/10 bg-[#111827]/80 p-5 backdrop-blur-md shadow-xl"
              >
                <p className="text-xs font-medium text-gray-400">Google Ads</p>
                <p className="mt-1 text-2xl font-bold text-white">10X</p>
                <p className="mt-2 text-xs font-semibold text-[#6495ED]">ROAS Achieved</p>
              </motion.div>

              {/* Floating Stat 3 (Bottom Right) */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[15%] right-10 rounded-2xl border border-white/10 bg-[#111827]/80 p-5 backdrop-blur-md shadow-xl"
              >
                <p className="text-xs font-medium text-gray-400">Store Footfall</p>
                <div className="mt-1 flex items-end gap-3">
                  <p className="text-2xl font-bold text-white">+45%</p>
                  <span className="flex items-center text-xs font-bold text-[#6495ED] mb-1">
                    ↑ Walk-ins
                  </span>
                </div>
                <p className="mt-2 text-[10px] text-gray-500">vs Previous Period</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. FILTERS & SORT */}
        {/* ========================================= */}
        <section className="mx-auto mt-24 max-w-7xl px-6 md:px-8">
          <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center">
            
            {/* Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                    activeFilter === cat
                      ? "border-[#6495ED] bg-[#6495ED] text-white shadow-lg shadow-[#6495ED]/20"
                      : "border-white/10 bg-transparent text-gray-400 hover:border-[#6495ED]/50 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Custom Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-[#1e293b] bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/20"
              >
                Sort by: {sortOrder === "newest" ? "Newest" : "Oldest"}
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {sortDropdownOpen && (
                  <>
                    {/* Invisible overlay to catch clicks outside the dropdown */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setSortDropdownOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full z-50 mt-2 w-full min-w-[160px] overflow-hidden rounded-xl border border-[#1e293b] bg-[#111827] shadow-xl"
                    >
                      <button
                        onClick={() => { setSortOrder("newest"); setSortDropdownOpen(false); }}
                        className={`block w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-white/5 ${sortOrder === "newest" ? "text-[#6495ED]" : "text-gray-300"}`}
                      >
                        Newest
                      </button>
                      <button
                        onClick={() => { setSortOrder("oldest"); setSortDropdownOpen(false); }}
                        className={`block w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-white/5 ${sortOrder === "oldest" ? "text-[#6495ED]" : "text-gray-300"}`}
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

        {/* ========================================= */}
        {/* 3. CASE STUDY GRID */}
        {/* ========================================= */}
        <section className="mx-auto mt-12 max-w-7xl px-6 md:px-8">
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {paginatedStudies.map((study) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={study.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#111827] shadow-lg transition-colors hover:border-[#6495ED]/40"
                >
                  {/* Image Top Half */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900 border-b border-[#1F2937]">
                    <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      {study.category}
                    </div>
                    {study.image ? (
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-slate-600 transition-transform duration-700 group-hover:scale-105">
                        [ Image Placeholder ]
                      </div>
                    )}
                  </div>

                  {/* Content Bottom Half */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-white">{study.title}</h3>
                    <p className="mt-2 text-sm text-gray-400">{study.desc}</p>

                    {/* Dynamic 4-Metric Stats Grid */}
                    <div className="mt-8 grid grid-cols-4 gap-2 border-t border-white/10 pt-6">
                      {study.metrics.map((metric, idx) => (
                        <div key={idx} className={`flex flex-col ${idx !== 0 ? 'border-l border-white/5 pl-3' : ''}`}>
                          <span className={`text-lg font-bold ${idx === 3 ? 'text-[#6495ED]' : 'text-white'}`}>
                            {metric.value}
                          </span>
                          <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <TransitionLink 
                      href={`/work/${study.id}`} 
                      className="mt-8 flex items-center justify-between text-sm font-semibold text-gray-300 transition-colors group-hover:text-white"
                    >
                      View Case Study
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-[#6495ED]" />
                    </TransitionLink>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ========================================= */}
        {/* 4. DYNAMIC PAGINATION (Hides if 1 page) */}
        {/* ========================================= */}
        {totalPages > 1 && (
          <section className="mt-16 flex justify-center gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                  currentPage === i + 1
                    ? "bg-[#6495ED] text-white shadow-lg shadow-[#6495ED]/20"
                    : "border border-white/10 bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            {/* Next Arrow (Hides on last page) */}
            {currentPage < totalPages && (
              <button 
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-transparent text-gray-400 transition-all hover:bg-white/5 hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </section>
        )}

        {/* ========================================= */}
        {/* 5. BOTTOM CTA BAR */}
        {/* ========================================= */}
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