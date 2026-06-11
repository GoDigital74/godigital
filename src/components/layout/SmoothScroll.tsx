"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Initialize Lenis (Pure Native Implementation)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // 1.2 is the sweet spot: buttery smooth but highly responsive
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1, 
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Use native requestAnimationFrame instead of GSAP.
    // This stops the lag by syncing perfectly with Framer Motion.
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Handle anchor links smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.2 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 2. Global Scroll-to-Top Fix for Page Transitions
  // Every time the URL changes, instantly snap the scroll to the top
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}