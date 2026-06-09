// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { navLinks } from "@/lib/data";
// import { TransitionLink } from "@/components/layout/PageTransition";

// export function Header() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <motion.header
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//       className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
//     >
//       <nav
//         className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
//           scrolled
//             ? "glass shadow-lg shadow-blue-500/5"
//             // Changed from bg-white/30 to bg-white/5 for better dark-mode contrast
//             : "bg-white/5 backdrop-blur-md border border-white/10"
//         }`}
//       >
//         <TransitionLink href="/" className="group flex items-center gap-2">
//           <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
//             GD
//           </span>
//           {/* Changed text-brand-navy to text-white */}
//           <span className="text-lg font-semibold tracking-tight text-white">
//             Go<span className="text-brand">Digital</span>
//           </span>
//         </TransitionLink>

//         <ul className="hidden items-center gap-1 lg:flex">
//           {navLinks.map((link) => (
//             <li key={link.href}>
//               <TransitionLink
//                 href={link.href}
//                 // Changed text-slate-600 to text-slate-300 and updated hover state
//                 className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
//               >
//                 {link.label}
//               </TransitionLink>
//             </li>
//           ))}
//         </ul>

//         <TransitionLink
//           href="/contact"
//           className="group hidden items-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-blue-500/25 md:inline-flex"
//         >
//           Contact Us
//           <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
//         </TransitionLink>
//       </nav>
//     </motion.header>
//   );
// }

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
            ? "bg-[#0A0A0A]/80 backdrop-blur-[10px] border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent border-transparent"
        }`}
      >
        <TransitionLink href="/" className="group flex items-center gap-2">
          {/* Logo: White + Blue accent */}
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
            GD
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            Go<span className="text-brand">Digital</span>
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