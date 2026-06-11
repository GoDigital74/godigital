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
      if (href === pathname || isAnimating.current) return;

      isAnimating.current = true;
      setOverlayVisible(true);
      
      // REMOVED: document.body.style.overflow = "hidden"; (This caused the layout shift)

      const blocks = getBlocks();
      
      // 1. INSTANT CURTAIN: Instantly fill the screen with the #0A0A0A blocks.
      gsap.set(blocks, { scaleY: 1, transformOrigin: "bottom center" });

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          setOverlayVisible(false);
          // REMOVED: document.body.style.overflow = "";
          gsap.set(blocks, { scaleY: 0 }); 
        },
      });

      // 2. ROUTE SWAP: Change the page layout behind the blocks
      tl.call(() => {
        router.push(href);
      });

      // 3. FALL & REVEAL: Drop the blocks down to the bottom
      tl.to(blocks, {
        scaleY: 0,
        duration: 0.35, 
        stagger: 0.03, 
        ease: "power3.inOut",
        delay: 0.2, 
      });
    },
    [pathname, router]
  );

  useEffect(() => {
    if (!overlayVisible) return;
    const safety = window.setTimeout(() => {
      isAnimating.current = false;
      setOverlayVisible(false);
      // REMOVED: document.body.style.overflow = "";
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
        <div className="flex h-full w-full bg-transparent">
          {Array.from({ length: BLOCK_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) blocksRef.current[i] = el;
              }}
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