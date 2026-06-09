"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import Link from "next/link";

type TransitionContextType = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

const BLOCK_COUNT = 5;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isAnimating = useRef(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const getBlocks = () =>
    blocksRef.current.filter(Boolean).length
      ? blocksRef.current.filter(Boolean)
      : Array.from(overlayRef.current?.querySelectorAll(".pt-block") ?? []);

  const navigate = useCallback(
    (href: string) => {
      // Prevent running if we are already transitioning or going to the same page
      if (href === pathname || isAnimating.current) return;

      isAnimating.current = true;
      setOverlayVisible(true);
      document.body.style.overflow = "hidden";

      const blocks = getBlocks();
      
      // Reset blocks to bottom
      gsap.set(blocks, { scaleY: 0, transformOrigin: "bottom center" });

      // Create a single continuous timeline so it NEVER stops
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          setOverlayVisible(false);
          document.body.style.overflow = "";
          gsap.set(blocks, { scaleY: 0 }); // Hard reset at the very end
        },
      });

      // 1. The Wave UP (Covering the screen)
      tl.to(blocks, {
        scaleY: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: "expo.inOut",
      });

      // 2. The Route Swap (Fires silently while the screen is covered)
      tl.call(() => {
        router.push(href);
      }, undefined, "-=0.2"); // Trigger slightly before the wave finishes peaking

      // 3. Change transform origin to the top
      tl.set(blocks, { transformOrigin: "top center" });

      // 4. The Wave DOWN (Immediately reveals the new page, no stopping)
      tl.to(blocks, {
        scaleY: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: "expo.inOut",
      }, "-=0.1"); // Start revealing slightly early to make it feel incredibly fast
    },
    [pathname, router]
  );

  // Safety net: If something breaks, unlock the screen after 3 seconds
  useEffect(() => {
    if (!overlayVisible) return;
    const safety = window.setTimeout(() => {
      isAnimating.current = false;
      setOverlayVisible(false);
      document.body.style.overflow = "";
    }, 3000);
    return () => window.clearTimeout(safety);
  }, [overlayVisible]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <div
        ref={overlayRef}
        aria-hidden={!overlayVisible}
        className="pointer-events-none fixed inset-0 z-[200]"
        style={{ visibility: overlayVisible ? "visible" : "hidden" }}
      >
        {/* Logo overlay during transition */}
        <div className="absolute left-6 top-6 z-10 md:left-8 md:top-8">
          <span className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
            GD
          </span>
        </div>
        
        <div className="flex h-full w-full bg-transparent">
          {Array.from({ length: BLOCK_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) blocksRef.current[i] = el;
              }}
              // Changed from bg-brand-navy to bg-[#0A0A0A]
              className="pt-block h-full flex-1 bg-[#0A0A0A]"
              style={{ transform: "scaleY(0)" }}
            />
          ))}
        </div>
      </div>

      {children}
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function TransitionLink({
  href,
  children,
  className,
  onClick,
}: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    // Standard checks to allow opening in new tabs, etc.
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      href.startsWith("http") ||
      href.startsWith("#") ||
      href === pathname
    ) {
      return;
    }
    e.preventDefault();
    navigate(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}