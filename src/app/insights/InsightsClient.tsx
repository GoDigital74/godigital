"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ArrowUpRight, Search, Send } from "lucide-react";
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

export default function InsightsClient({
  initialPosts,
}: {
  initialPosts: any[];
}) {
  const [activeCategory, setActiveCategory] = useState("All Insights");

  const filteredPosts =
    activeCategory === "All Insights"
      ? initialPosts
      : initialPosts.filter((post) =>
          post.categories?.includes(activeCategory),
        );

  // Split out the latest post for the "Featured" section
  const featuredPost = filteredPosts[0];
  const listPosts = filteredPosts.slice(1, 4); // Next 3 posts for the right side
  const gridPosts = filteredPosts.slice(4); // Remaining for the bottom grid

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* 1. LIGHT HERO SECTION */}
        <section className="bg-[#ffffff] pt-32 pb-20 md:pt-40 md:pb-32 px-6 rounded-b-[2rem] md:rounded-b-[4rem]">
          <div className="mx-auto max-w-7xl">
            <p className="text-[#6495ED] text-xs font-bold tracking-widest uppercase mb-6">
              The GoDigital Journal
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#0A0A0A] max-w-3xl leading-tight">
              Ideas, strategies & lessons that{" "}
              <i className="text-[#6495ED]">drive growth.</i>
            </h1>
            <p className="mt-6 text-gray-700 max-w-md text-lg">
              Real insights from the trenches of performance, branding, commerce
              and growth systems.
            </p>
          </div>
        </section>

        {/* 2. FILTER BAR */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-200 pb-8">
            <div className="flex flex-wrap gap-4 md:gap-8 items-center w-full overflow-x-auto no-scrollbar">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeCategory === cat
                      ? "text-[#0A0A0A] border border-gray-200 px-4 py-1.5 rounded-full shadow-sm bg-white"
                      : "text-gray-500 hover:text-[#0A0A0A]"
                  }`}
                >
                  {activeCategory === cat && (
                    <span className="w-2 h-2 rounded-full bg-[#6495ED]"></span>
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3. FEATURED & LIST SECTION */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Featured Post (Left) */}
            {featuredPost && (
              <div className="lg:col-span-8">
                <Link
                  href={`/insights/${featuredPost.slug}`}
                  className="group relative block w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-900"
                >
                  {featuredPost.image && (
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 md:p-12 flex flex-col justify-end">
                    <p className="text-[#6495ED] text-xs font-bold uppercase tracking-widest mb-4">
                      Featured Story
                    </p>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight group-hover:underline decoration-[#6495ED] underline-offset-8">
                      {featuredPost.title}
                    </h2>
                    <div className="flex items-center gap-2 text-white/80 text-sm font-semibold">
                      Read Article{" "}
                      <ArrowRight className="w-4 h-4 text-[#6495ED]" />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* List Posts (Right) - REDESIGNED */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {listPosts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/insights/${post.slug}`}
                  className="group relative flex flex-col justify-between h-full w-full rounded-2xl bg-[#111827] overflow-hidden border border-white/5 transition-colors hover:border-[#6495ED]/30"
                >
                  {/* Top Image Area */}
                  <div className="relative h-32 w-full bg-[#1F2937] overflow-hidden shrink-0">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      />
                    )}
                  </div>
                  
                  {/* Bottom Content Area */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="rounded-full border border-[#6495ED] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#6495ED]">
                        {post.categories?.[0] || "Insight"}
                      </span>
                      <span className="text-[11px] font-medium text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white leading-snug group-hover:text-[#6495ED] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-xs text-gray-400 font-semibold">
                        {post.readTime || "5 min read"}
                      </p>
                      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#6495ED] transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. LATEST INSIGHTS GRID - REDESIGNED */}
        {gridPosts.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-32">
            <h3 className="text-xl font-serif text-[#0A0A0A] border-b border-gray-200 pb-4 mb-8">
              Latest Insights
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/insights/${post.slug}`}
                  className="group relative flex flex-col justify-between h-full w-full rounded-2xl bg-[#111827] overflow-hidden shadow-lg border border-white/5 transition-colors hover:border-[#6495ED]/30"
                >
                  {/* Top Image Area */}
                  <div className="relative h-48 w-full bg-[#1F2937] overflow-hidden shrink-0">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      />
                    )}
                  </div>
                  
                  {/* Bottom Content Area */}
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <span className="rounded-full border border-[#6495ED] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#6495ED]">
                        {post.categories?.[0] || "Insight"}
                      </span>
                      <span className="text-[11px] font-medium text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white leading-snug group-hover:text-[#6495ED] transition-colors mb-4 line-clamp-3">
                      {post.title}
                    </h3>

                    {/* Description excerpt (optional based on your reference) */}
                    <p className="text-sm text-gray-400 line-clamp-2 mb-8">
                      {post.author ? `By ${post.author}` : "Discover the strategies that are driving e-commerce forward."}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                      <p className="text-xs text-gray-400 font-semibold">
                        {post.readTime || "5 min read"}
                      </p>
                      <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-[#6495ED] transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 5. NEWSLETTER BANNER */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="bg-[#0A0A0A] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <Send className="w-6 h-6 text-[#6495ED]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-white max-w-sm">
                Get growth insights straight to{" "}
                <i className="text-[#6495ED]">your inbox.</i>
              </h3>
            </div>
            <div className="flex w-full md:w-auto flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-white/10 text-white rounded-xl px-6 py-4 outline-none focus:border-[#6495ED] transition-colors w-full md:w-80"
              />
              <button className="bg-[#6495ED] hover:bg-[#6495ED] text-[#0A0A0A] font-bold rounded-xl px-8 py-4 flex items-center justify-center gap-2 transition-colors shrink-0">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

