"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { navLinks } from "@/lib/data";
import { TransitionLink } from "@/components/layout/PageTransition";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 border ${
          scrolled
            // CHANGED: Lowered background opacity to /40 and used backdrop-blur-md for a true glass effect
            ? "bg-[#0A0A0A]/40 backdrop-blur-md border-white/10 shadow-lg shadow-black/40"
            : "bg-transparent border-transparent"
        }`}
      >
        <TransitionLink href="/" className="group flex items-center gap-2">
          {/* Changed text-lg to text-2xl here to increase logo size */}
          <span className="text-2xl font-semibold tracking-tight text-white">
            Go<span className="text-[#6495ED]"> Digital</span>
          </span>
        </TransitionLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <TransitionLink
                href={link.href}
                // Menu: White, Menu Hover: #6495ED
                className="px-3.5 py-2 text-sm font-medium text-white transition-colors hover:text-[#6495ED]"
              >
                {link.label}
              </TransitionLink>
            </li>
          ))}
        </ul>

        <TransitionLink
          href="/contact"
          // CTA Button: 8px radius (rounded-lg), #6495ED fill, #4F7DF3 hover
          className="group hidden items-center gap-2 rounded-lg bg-[#6495ED] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4F7DF3] md:inline-flex"
        >
          Contact Us
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </TransitionLink>
      </nav>
    </motion.header>
  );
}