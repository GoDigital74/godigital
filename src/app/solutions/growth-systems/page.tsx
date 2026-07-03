"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
// import { Footer } from "@/components/layout/Footer";
// import { Header } from "@/components/layout/Header";
import { client } from "@/sanity/lib/client";


import {
  ArrowRight,
  ArrowUpRight,
  Target,
  Filter,
  Clock,
  TrendingUp,
  Megaphone,
  Search,
  MessageSquare,
  Mail,
  Users,
  LineChart,
  LayoutTemplate,
} from "lucide-react";


const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function SolutionsPage() {
    const [projects, setProjects] = useState<any[]>([]);
  
    useEffect(() => {
      // Fetch the 6 most recent projects from Sanity to populate the 3x2 grid
      const fetchProjects = async () => {
        const query = `
          *[_type == "project"] | order(_createdAt desc)[0...6] {
            ...,
            title,
            brand,
            category,
            industry,
            "slug": slug.current,
            "img": bannerImage.asset->url
          }
        `;
        const data = await client.fetch(query);
        setProjects(data);
      };
  
      fetchProjects();
    }, []);

  return (
    <>
      {/* <Header /> */}
      <main className="min-h-screen bg-white">

        {/* ========================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================= */}
        <section className="relative min-h-screen w-full overflow-hidden bg-black font-sans">

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeSlideUp {
              from { opacity: 0; transform: translateY(24px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}} />

          {/* Video Background */}
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row items-center justify-between px-6 pt-32 pb-20 md:px-12 lg:px-6">

            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="mb-4 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-white/90 animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
                <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
                <span>/</span>
                <span className="text-white">Growth Systems</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.05] mb-6 animate-[fadeSlideUp_0.8s_ease_0.4s_both]">
                GROWTH<br />THAT<br />
                <span className="font-serif italic text-[#6495ED] font-light">COMPOUNDS.</span>
              </h1>

              <p className="mb-8 max-w-sm sm:max-w-lg text-sm sm:text-base md:text-lg leading-relaxed text-white/80 animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
                We build data-driven growth systems that acquire the right customers, improve conversions, and generate predictable, compounding growth.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform"
                >
                  Let's Grow Together <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-white font-medium text-sm hover:text-[#6495ED] transition-colors"
                >
                  See Our Work <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Content - Glassmorphism Stat Cards */}
            <div className="w-full lg:w-1/2 relative h-[500px] mt-12 lg:mt-0 hidden md:block animate-[fadeSlideUp_0.8s_ease_0.9s_both]">

              {/* Stat Card 1: Revenue */}
              <div className="absolute top-4 left-4 lg:left-12 w-64 bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl z-30 transition-transform hover:scale-105">
                <p className="text-xs text-gray-300 mb-1 font-medium">Revenue Generated</p>
                <p className="text-2xl font-bold text-white mb-2">₹2.45 Cr+</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-400 mb-4">
                  <ArrowUpRight className="w-3 h-3" /> 32.6%
                </div>
                <svg className="w-full h-8" viewBox="0 0 100 30" fill="none">
                  <path d="M0 25C10 25 15 15 25 15C35 15 40 20 50 10C60 0 65 15 75 5C85 -5 95 10 100 5" stroke="#6495ED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="25" cy="15" r="2" fill="#6495ED"/>
                  <circle cx="50" cy="10" r="2" fill="#6495ED"/>
                  <circle cx="75" cy="5" r="2" fill="#6495ED"/>
                  <circle cx="100" cy="5" r="2" fill="#6495ED"/>
                </svg>
              </div>

              {/* Stat Card 2: ROAS */}
              <div className="absolute top-[220px] left-0 lg:left-4 w-48 bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl z-20 transition-transform hover:scale-105">
                <p className="text-xs text-gray-300 mb-1 font-medium">ROAS Achieved</p>
                <p className="text-2xl font-bold text-white mb-2">4.6x</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-400 mb-4">
                  <ArrowUpRight className="w-3 h-3" /> 28.4%
                </div>
                <svg className="w-full h-8" viewBox="0 0 100 30" fill="none">
                  <path d="M0 25 L20 20 L40 25 L60 15 L80 10 L100 0" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="20" cy="20" r="2" fill="#22c55e"/>
                  <circle cx="60" cy="15" r="2" fill="#22c55e"/>
                  <circle cx="100" cy="0" r="2" fill="#22c55e"/>
                </svg>
              </div>

              {/* Stat Card 3: Ad Spend */}
              <div className="absolute bottom-4 right-0 lg:right-4 w-64 bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl z-10 transition-transform hover:scale-105">
                <p className="text-xs text-gray-300 mb-1 font-medium">Ad Spend Managed</p>
                <p className="text-2xl font-bold text-white mb-1">₹1.12 Cr+</p>
                <p className="text-xs text-gray-400 mb-4">Across Platforms</p>
                <div className="flex items-center gap-3">
                  <Image src="https://cdn.simpleicons.org/meta/white" alt="Meta" width={40} height={16} className="h-4 w-auto object-contain" unoptimized />
                  <Image src="https://cdn.simpleicons.org/tiktok/FFFFFF" alt="TikTok" width={20} height={20} className="h-5 w-auto object-contain" unoptimized />
                  <Image src="https://cdn.simpleicons.org/googleads" alt="Google Ads" width={40} height={20} className="h-5 w-auto object-contain" unoptimized />
                  <Image src="https://cdn.simpleicons.org/snapchat/FFFC00" alt="Snapchat" width={20} height={20} className="h-5 w-auto object-contain" unoptimized />
                  <Image src="https://cdn.simpleicons.org/instagram/E4405F" alt="Snapchat" width={20} height={20} className="h-5 w-auto object-contain" unoptimized />
                  <span className="text-[10px] text-gray-300 font-medium ml-1">& more</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Trusted By Banner */}
        <section className="bg-[#0A0A0A] py-12 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
              TRUSTED BY<br/>GROWTH-FOCUSED BRANDS
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white font-serif text-xl">
              <span>Raymond</span>
              <span>Sethi Watch Company</span>
              <span>Titan Eye+</span>
              <span className="font-sans font-black tracking-tighter">WILD STONE</span>
              <span className="text-sm font-sans font-bold border border-white px-2 py-1">The Pink<br/>Foundry</span>
              <span className="text-sm font-sans">& more</span>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. THE GROWTH ENGINE FUNNEL */}
        {/* ========================================= */}
        <section id="process" className="py-20 bg-[#FAFAFA] border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-start">

              <div className="w-full lg:w-1/3 shrink-0">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6495ED] mb-4 block">
                  OUR GROWTH ENGINE
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#0A0A0A] leading-tight mb-6">
                  A full-funnel system built<br/>
                  <span className="italic text-gray-600 font-light">for predictable growth.</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  From demand generation to retention, we build systems that attract, convert, retain and scale.
                </p>
                <Link
                  href="#process"
                  className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                  Explore Our Process <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="w-full lg:w-2/3 flex flex-wrap md:flex-nowrap justify-between relative mt-8 lg:mt-0">
                <div className="absolute top-6 left-12 right-12 h-[1px] border-t border-dashed border-gray-300 hidden md:block z-0"></div>
                {[
                  { num: "01", title: "ATTRACT", desc: "Reach the right audience with precision.", icon: Target },
                  { num: "02", title: "CONVERT", desc: "Turn clicks into customers.", icon: Filter },
                  { num: "03", title: "RETAIN", desc: "Build relationships that drive repeat sales.", icon: Clock },
                  { num: "04", title: "SCALE", desc: "Optimize, scale and compound growth.", icon: TrendingUp },
                ].map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center w-1/2 md:w-1/4 px-2 mb-10 md:mb-0">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#6495ED] shadow-md border border-gray-100 mb-4">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 mb-2">{step.num}</span>
                    <h3 className="text-sm font-black text-[#0A0A0A] tracking-wider mb-2">{step.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 3. WHAT WE DO (SERVICES GRID) */}
        {/* ========================================= */}
        <section className="py-15 bg-white">
          <div className="mx-auto max-w-7xl px-6">

            <div className="bg-[#0A0A0A] rounded-[2rem] p-8 md:p-12 shadow-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6495ED] mb-2 block">
                WHAT WE DO
              </span>
              <h2 className="text-3xl font-bold text-white mb-10">
                End-to-end growth marketing services
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Paid Media */}
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-[#6495ED]/30 transition-colors">
                  <div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 mb-6">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Paid Media</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-8">High-performing campaigns across platforms that deliver ROI.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src="https://cdn.simpleicons.org/meta/white" alt="Meta" width={40} height={16} className="h-4 w-auto object-contain" unoptimized />
                    <Image src="https://cdn.simpleicons.org/googleads" alt="Google Ads" width={40} height={20} className="h-5 w-auto object-contain" unoptimized />
                    <Image src="https://cdn.simpleicons.org/tiktok/FFFFFF" alt="TikTok" width={20} height={20} className="h-5 w-auto object-contain" unoptimized />
                    <Image src="https://cdn.simpleicons.org/youtube/FF0000" alt="YouTube" width={20} height={16} className="h-4 w-auto object-contain" unoptimized />
                    <Image src="https://cdn.simpleicons.org/x/white" alt="TikTok" width={16} height={16} className="h-4 w-auto object-contain" unoptimized />
                    <Image src="https://cdn.simpleicons.org/snapchat/FFFC00" alt="Snapchat" width={20} height={20} className="h-5 w-auto object-contain" unoptimized />
                  </div>
                </div>

                {/* SEO */}
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-green-500/30 transition-colors">
                  <div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500/10 text-green-400 mb-6">
                      <Search className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">SEO & Organic Growth</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">Rank higher, get discovered and drive consistent organic traffic.</p>
                  </div>
                  <svg className="w-full h-10" viewBox="0 0 100 30" fill="none">
                    <path d="M0 25 L20 22 L40 24 L60 15 L80 12 L100 5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="100" cy="5" r="2" fill="#22c55e"/>
                  </svg>
                </div>

                {/* Social Media */}
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-purple-500/30 transition-colors">
                  <div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mb-6">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Social Media Marketing</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-8">Build your brand, engage your audience and drive demand across platforms.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" width={20} height={20} className="h-5 w-auto object-contain" unoptimized />
                    <Image src="https://cdn.simpleicons.org/youtube/FF0000" alt="YouTube" width={20} height={16} className="h-4 w-auto object-contain" unoptimized />
                    <Image src="https://cdn.simpleicons.org/facebook/1877F2" alt="Facebook" width={20} height={20} className="h-5 w-auto object-contain" unoptimized />
                    <Image src="https://cdn.simpleicons.org/pinterest/E60023" alt="Facebook" width={20} height={20} className="h-5 w-auto object-contain" unoptimized />
                  </div>
                </div>

                {/* Email & WhatsApp */}
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-green-400/30 transition-colors">
                  <div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 mb-6">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Email & WhatsApp Marketing</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-8">Nurture leads, increase repeat purchases and build long-term customer relationships.</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Image src="https://cdn.simpleicons.org/gmail/EA4335" alt="Email" width={20} height={20} className="h-5 w-auto object-contain" unoptimized />
                    <Image src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp" width={24} height={24} className="h-6 w-auto object-contain" unoptimized />
                  </div>
                </div>

                {/* Influencer Marketing */}
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-orange-500/30 transition-colors">
                  <div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 mb-6">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Influencer Marketing & UGC Creation</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">Leverage creators and authentic content to build trust and drive conversions.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <Image src="https://randomuser.me/api/portraits/women/44.jpg" alt="Creator" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-[#111] object-cover" unoptimized />
                      <Image src="https://randomuser.me/api/portraits/women/68.jpg" alt="Creator" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-[#111] object-cover" unoptimized />
                      <Image src="https://randomuser.me/api/portraits/women/91.jpg" alt="Creator" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-[#111] object-cover" unoptimized />
                    </div>
                    <span className="text-xs text-white font-bold ml-1">+12K</span>
                  </div>
                </div>

                {/* Analytics */}
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-blue-500/30 transition-colors">
                  <div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 mb-6">
                      <LineChart className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Analytics & Tracking</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-8">Track what matters. Make smarter decisions with accurate data.</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Image src="https://cdn.simpleicons.org/googleanalytics/E37400" alt="GA4" width={24} height={24} className="h-6 w-auto object-contain" unoptimized />
                    <Image src="https://cdn.simpleicons.org/googletagmanager/246FDB" alt="GTM" width={24} height={24} className="h-6 w-auto object-contain" unoptimized />
                    <Image src="https://cdn.simpleicons.org/meta/white" alt="Meta Pixel" width={16} height={16} className="h-4 w-auto object-contain opacity-80" unoptimized />
                  </div>
                </div>

                {/* CRO */}
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-yellow-500/30 transition-colors">
                  <div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-400 mb-6">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Conversion Rate Optimization</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">Improve user experience and increase conversions across your funnel.</p>
                  </div>
                  <div className="bg-[#1A1A1A] border border-white/5 rounded-lg p-3">
                    <p className="text-[10px] text-gray-500 mb-1">Conversion Rate</p>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-lg">2.35%</span>
                      <span className="text-[10px] text-green-400">↑ 48%</span>
                    </div>
                  </div>
                </div>

                {/* Landing Pages */}
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-purple-400/30 transition-colors">
                  <div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mb-6">
                      <LayoutTemplate className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Landing Pages & Funnels</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">High-converting landing pages and funnels designed to maximize results.</p>
                  </div>
                  <div className="w-full h-12 bg-white rounded-t-lg opacity-80 overflow-hidden relative">
                    <div className="absolute top-2 left-2 flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    </div>
                    <div className="absolute bottom-2 right-2 w-10 h-3 rounded-full bg-blue-500"></div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ========================================= */}
        {/* 4. RESULTS THAT MATTER (CASE STUDIES) */}
        {/* ========================================= */}
        <section className="bg-[#0A0A0A] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
              
              {/* Left Sidebar Content */}
              <motion.div variants={staggerContainer} className="md:col-span-4 lg:col-span-3 flex flex-col justify-center">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#6495ED] mb-8">
                  Our Work
                </h3>
                <h2 className="text-4xl md:text-5xl font-serif text-white leading-[1.1] mb-6">
                  Systems that <br /> create real impact.
                </h2>
                <p className="text-sm text-gray-400 mb-10 leading-relaxed font-medium">
                  Across platforms. Across industries. <br />
                  One purpose - growth.
                </p>
                <Link href="/work" className="group flex items-center gap-4 text-sm font-bold text-white transition-colors hover:text-[#6495ED]">
                  Explore Case Studies
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all group-hover:border-[#6495ED]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>


              {/* Right Content - 3x2 Image Grid (FETCHED FROM SANITY) */}
              <motion.div variants={staggerContainer} className="md:col-span-8 lg:col-span-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {projects.map((item, idx) => (
                    <Link 
                      href={`/work/${item.slug}`} 
                      key={idx} 
                      className="group relative aspect-[4/3] md:aspect-[5/4] w-full overflow-hidden bg-[#111111] block border border-white/5"
                    >
                      {item.img && (
                        <Image
                          src={item.img} 
                          alt={item.title || item.brand || "Project Image"}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90 z-0"
                        />
                      )}
                      
                      {/* Dark overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/30 pointer-events-none z-0" />
                      
                      {/* Text content with increased z-index */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-start z-10">
                        <h4 className="text-xl md:text-2xl text-white tracking-wide font-serif mb-1 drop-shadow-md">
                          {item.title || item.brand || "Project Name"}
                        </h4>
                        <p className="text-[10px] md:text-xs font-medium text-gray-300 uppercase tracking-widest drop-shadow-md">
                          {item.category || item.industry || "Case Study"}
                        </p>
                      </div>
                    </Link>
                  ))}
                  
                  {/* Show empty placeholder cards if data is still loading */}
                  {projects.length === 0 && Array.from({ length: 6 }).map((_, idx) => (
                    <div key={`skeleton-${idx}`} className="relative aspect-[4/3] md:aspect-[5/4] w-full bg-[#111111] animate-pulse border border-white/5" />
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 5. FINAL CTA SECTION */}
        {/* ========================================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="bg-[#0A0A0A] rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">

              <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-40 mix-blend-screen">
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-blue-600 rounded-full blur-[100px]"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q25,20 50,50 T100,50" stroke="rgba(100,149,237,0.3)" strokeWidth="0.5" fill="none" />
                  <path d="M0,60 Q30,80 60,50 T100,60" stroke="rgba(100,149,237,0.2)" strokeWidth="0.5" fill="none" />
                  <path d="M0,40 Q40,10 70,50 T100,40" stroke="rgba(100,149,237,0.4)" strokeWidth="0.5" fill="none" />
                </svg>
              </div>

              <div className="relative z-10 w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to build your<br/>growth engine?
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Let's build a performance marketing system that drives real, measurable results.
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
                <a
                  href="https://calendly.com/godigital74/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#4F46E5] text-white px-6 py-3.5 rounded-lg font-bold text-sm hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
                >
                  Book a Call <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white px-6 py-3.5 rounded-lg font-bold text-sm border border-white/20 hover:bg-white/5 transition-colors"
                >
                  Write to Us <Mail className="w-4 h-4 opacity-50" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
