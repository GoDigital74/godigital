"use client";

import React, { useEffect, useRef, useState } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/layout/Header"; 
import { Footer } from "@/components/layout/Footer"; 
import Spline from '@splinetool/react-spline';
import { 
  Send, 
  Calendar, 
  Mail, 
  MapPin, 
  Phone,
  Sparkles,
  AlertCircle,

} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Framer Motion Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  
  // Parallax values for the floating cards
  const floatX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const floatY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);
  const floatX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), springConfig);
  const floatY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) - 0.5;
    const y = (e.clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // 1. Spline Entrance
      tl.fromTo(splineRef.current,
        { y: 80, scale: 0.85, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" }
      )
      // 2. Headline
      .fromTo(headlineRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=1.2"
      )
      // 3. Buttons
      .fromTo(buttonsRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.7"
      );

      // Form Scroll Reveal
      gsap.fromTo(formRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
          }
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // --- FORM STATE & RESEND LOGIC ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Gather data from the form inputs
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Show success animation
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <Header />
      
      <main 
        className="min-h-screen bg-black overflow-hidden font-sans selection:bg-[#79C267] selection:text-white"
        onMouseMove={handleMouseMove}
      >
        {/* ========================================= */}
        {/* HERO SECTION */}
        {/* ========================================= */}
        <section 
          ref={heroRef} 
          className="relative h-screen min-h-[600px] w-full flex flex-col items-center justify-start pt-28 md:pt-36 bg-[#112A1B] overflow-hidden"
        >
          {/* Background Layering & Lighting */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#112A1B] via-[#1B432B] to-[#0A160F] z-0" />
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#4EA868]/15 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

          <div className="relative z-20 flex flex-col items-center text-center px-6 w-full max-w-[1200px] mx-auto">
            <h1 
              ref={headlineRef} 
              className="text-[34px] md:text-[48px] lg:text-[64px] font-bold tracking-tight text-white leading-[1] max-w-[700px] mb-8 drop-shadow-xl"
            >
              Let's Build <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E2F5D7] to-[#8FD37B]">Something Amazing.</span>
            </h1>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-5">
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#112A1B] rounded-full font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                Send Message
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
              
              <a 
                href="https://calendly.com/godigital74/30min" 
                target="_blank" 
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-sm hover:bg-white/10 transition-all duration-300"
              >
                Book Meeting
                <Calendar className="w-4 h-4 text-white/70" />
              </a>
            </div>
          </div>

          {/* ======================== */}
          {/* MASSIVE SPLINE CENTERPIECE */}
          {/* ======================== */}
          <div 
            ref={splineRef}
            className="absolute left-1/2 -translate-x-1/2 bottom-[-5vh] w-full max-w-[1000px] h-[70vh] flex justify-center items-end pointer-events-none z-10"
          >
            {/* Floating Glass Cards */}
            <motion.div style={{ x: floatX1, y: floatY1 }} className="absolute top-[30%] left-[20%] lg:left-[28%] z-20 hidden md:block">
              <FloatingCard icon={<Mail className="w-4 h-4 text-white"/>} label="godigital74@gmail.com" delay={0} />
            </motion.div>
            
            <motion.div style={{ x: floatX2, y: floatY2 }} className="absolute top-[50%] right-[20%] lg:right-[28%] z-20 hidden md:block">
              <FloatingCard icon={<Phone className="w-4 h-4 text-white"/>} label="+91 8076625588" delay={1} />
            </motion.div>

           {/* LinkedIn Card */}
            <motion.div style={{ x: floatX2, y: floatY1 }} className="absolute top-[70%] left-[12%] lg:left-[20%] z-20 hidden md:block">
              <FloatingCard 
                delay={0.6} 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                } 
                label="@godigitalagencyy" 
                href="https://www.linkedin.com/company/go-digital-agencyy/"
              />
            </motion.div>

            {/* Instagram Card */}
            <motion.div style={{ x: floatX1, y: floatY2 }} className="absolute top-[75%] right-[15%] lg:right-[22%] z-20 hidden md:block">
              <FloatingCard 
                delay={0.8} 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                } 
                label="@go_digital_agency.in" 
                href="https://www.instagram.com/go_digital_agency.in"
              />
            </motion.div>

            {/* The 3D Object */}
            <div className="relative w-full h-full pointer-events-auto">
              <Spline
                scene="https://prod.spline.design/HhL1lucP5Lk85bd7/scene.splinecode" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* CONTACT FORM SECTION */}
        {/* ========================================= */}
        <section id="contact-form" className="relative py-24 md:py-32 px-6 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            <div className="lg:col-span-5 flex flex-col justify-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Drop us a line.</h2>
              <p className="text-gray-400 mb-12 text-lg">
                Fill out the form and our team will get back to you within 24 hours. We can't wait to hear from you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#2F7D4E]/20 flex items-center justify-center shrink-0 border border-[#2F7D4E]/30">
                    <Mail className="w-5 h-5 text-[#79C267]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Email Us</p>
                    <p className="text-lg font-semibold text-white">godigital74@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#2F7D4E]/20 flex items-center justify-center shrink-0 border border-[#2F7D4E]/30">
                    <MapPin className="w-5 h-5 text-[#79C267]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Visit Studio</p>
                    <p className="text-lg font-semibold text-white">123 Innovation Drive,<br/>Tech City, 400001</p>
                  </div>
                </div>
              </div>
            </div>

            <div ref={formRef} className="lg:col-span-7">
              <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#79C267]/10 rounded-full blur-[80px] pointer-events-none" />

                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                      <Sparkles className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">Our team is reviewing it now. Talk soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                    {/* Error Message Display */}
                    {errorMessage && (
                      <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 p-4 rounded-xl text-sm font-medium">
                        <AlertCircle className="w-4 h-4" />
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 group">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-400 group-focus-within:text-[#79C267] transition-colors">First Name</label>
                        <input id="firstName" name="firstName" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#79C267] focus:bg-white/10 transition-all" placeholder="John" />
                      </div>
                      <div className="space-y-2 group">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-400 group-focus-within:text-[#79C267] transition-colors">Last Name</label>
                        <input id="lastName" name="lastName" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#79C267] focus:bg-white/10 transition-all" placeholder="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <label htmlFor="email" className="text-sm font-medium text-gray-400 group-focus-within:text-[#79C267] transition-colors">Email Address</label>
                      <input id="email" name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#79C267] focus:bg-white/10 transition-all" placeholder="john@company.com" />
                    </div>

                    <div className="space-y-2 group">
                      <label htmlFor="message" className="text-sm font-medium text-gray-400 group-focus-within:text-[#79C267] transition-colors">Your Message</label>
                      <textarea id="message" name="message" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#79C267] focus:bg-white/10 transition-all resize-none" placeholder="Tell us about your project..."></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative overflow-hidden group bg-gradient-to-r from-[#2F7D4E] to-[#79C267] text-white rounded-xl py-4 font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </ReactLenis>
  );
}

function FloatingCard({ delay, top, left, right, icon, label, href }: { delay: number, top?: string, left?: string, right?: string, icon: React.ReactNode, label: string, href?: string }) {
  const CardContent = (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-[float_4s_ease-in-out_infinite] hover:bg-white/10 transition-colors pointer-events-auto" style={{ top, left, right, animationDelay: `${delay}s` }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}} />
      <div className="w-6 h-6 rounded-full flex items-center justify-center opacity-80">
        {icon}
      </div>
      <span className="text-white/90 text-xs font-medium">{label}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block cursor-pointer hover:scale-105 transition-transform pointer-events-auto">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
