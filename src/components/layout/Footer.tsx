"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { footerLinks, footerSocials } from "@/lib/data";
import Link from "next/link";

// Helper component to render official brand SVGs based on the label name
function BrandIcon({ label, abbr }: { label: string; abbr: string }) {
  const name = label.toLowerCase();
  
  if (name.includes("twitter") || name.includes("x")) {
    return (
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (name.includes("linkedin")) {
    return (
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (name.includes("instagram")) {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  if (name.includes("facebook")) {
    return (
      <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10V22h4v-8.5z" />
      </svg>
    );
  }
  if (name.includes("youtube")) {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  
  return <span className="text-xs font-black uppercase">{abbr}</span>;
}

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = footerInnerRef.current?.querySelectorAll(".footer-animate");
      if (elements && elements.length > 0) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-0 bg-white text-[#0A0A0A]"
    >
        <div ref={footerInnerRef}>
          {/* ── Large Brand Name ── */}
          <div className="footer-animate flex items-end justify-center px-6 pb-6 pt-2 md:pt-26 lg:pt-20">
            <h2 className="text-[13vw] font-black leading-[0.85] tracking-tighter text-[#0A0A0A] drop-shadow-md md:text-[11vw]">
              Go<span className="text-[#6495ED]"> Digital</span>
            </h2>
          </div>

          {/* Divider */}
          <div className="mx-auto max-w-7xl border-t border-gray-200" />

          {/* ── Footer Meta Row ── */}
          <footer className="bg-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 py-4 md:flex-row md:px-12 md:py-14 lg:px-20 lg:py-24">
              
              {/* Socials */}
              <div className="footer-animate flex gap-4">
                {footerSocials.map(({ href, label, abbr }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    // INCREASED SHADOW: Changed drop-shadow-sm to drop-shadow-md, and made the hover shadow much deeper
                    className="group relative flex h-12 w-12 items-center justify-center focus:outline-none drop-shadow-md transition-all duration-300 hover:drop-shadow-[0_12px_28px_rgba(100,149,237,0.45)]"
                  >
                    {/* 3D SHADOW LAYER: Pushed it further down (translate-y-1.5) and made it darker (bg-gray-300) */}
                    <div className="absolute inset-0 translate-y-1.5 rounded-xl bg-gray-400 transition-all duration-200 group-hover:bg-[#6495ED]/40 group-active:translate-y-0.5" />
                    
                    {/* Main Button Layer */}
                    <div className="relative flex h-full w-full items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#6495ED] group-hover:bg-[#6495ED] group-hover:text-white group-active:translate-y-0.5">
                      <span className="transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg">
                        <BrandIcon label={label} abbr={abbr} />
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Nav Links */}
              <nav className="footer-animate flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12 text-center md:justify-end">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-600 transition-colors hover:text-[#6495ED]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Copyright */}
              <div className="footer-animate text-center text-md text-gray-600 md:text-right">
                <p className="flex items-center justify-center gap-1.5 md:justify-end">
                  Built with <span className="text-[#6495ED] text-xl">♥</span> in India.
                </p>
                <p className="mt-1">
                  © {new Date().getFullYear()} GoDigital. All Rights Reserved.
                </p>
              </div>
              
            </div>
          </footer>
        </div>
      </div>
  );
}

