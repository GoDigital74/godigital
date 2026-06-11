"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";
import { TransitionLink } from "@/components/layout/PageTransition";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleHomeClick = useCallback(() => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 border ${
            scrolled || mobileOpen
              ? "bg-[#0A0A0A]/40 backdrop-blur-md border-white/10 shadow-lg shadow-black/40"
              : "bg-transparent border-transparent"
          }`}
        >
          <TransitionLink 
            href="/" 
            onClick={handleHomeClick} 
            className="group flex items-center gap-2"
          >
            <span className="text-2xl font-semibold tracking-tight text-white">
              Go<span className="text-[#6495ED]"> Digital</span>
            </span>
          </TransitionLink>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <TransitionLink
                  href={link.href}
                  onClick={link.href === "/" ? handleHomeClick : undefined}
                  className="px-3.5 py-2 text-sm font-medium text-white transition-colors hover:text-[#6495ED]"
                >
                  {link.label}
                </TransitionLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <TransitionLink
            href="/contact"
            className="group hidden items-center gap-2 rounded-lg bg-[#6495ED] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4F7DF3] lg:inline-flex"
          >
            Contact Us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </TransitionLink>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-40 flex h-full w-[75vw] max-w-sm flex-col bg-[#0A0A0A] pt-24 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <TransitionLink
                    href={link.href}
                    onClick={() => {
                      setMobileOpen(false);
                      if (link.href === "/") handleHomeClick();
                    }}
                    className="block rounded-lg px-4 py-3 text-lg font-medium text-white transition-colors hover:bg-white/5 hover:text-[#6495ED]"
                  >
                    {link.label}
                  </TransitionLink>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto border-t border-white/10 px-6 py-6">
              <TransitionLink
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#6495ED] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#4F7DF3] active:scale-[0.98]"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </TransitionLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}