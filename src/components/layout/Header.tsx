// // "use client";

// // import { useEffect, useState, useCallback } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
// // import { usePathname } from "next/navigation";
// // import Image from "next/image";
// // import { navLinks } from "@/lib/data";
// // import { TransitionLink } from "@/components/layout/PageTransition";

// // export function Header() {
// //   const [scrolled, setScrolled] = useState(false);
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [hoveredNav, setHoveredNav] = useState<string | null>(null);
// //   const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
// //   const pathname = usePathname();

// //   useEffect(() => {
// //     const onScroll = () => setScrolled(window.scrollY > 40);
// //     onScroll();
// //     window.addEventListener("scroll", onScroll, { passive: true });
// //     return () => window.removeEventListener("scroll", onScroll);
// //   }, []);

// //   // Close mobile menu on route change
// //   useEffect(() => {
// //     setMobileOpen(false);
// //     setMobileSolutionsOpen(false);
// //     setHoveredNav(null);
// //   }, [pathname]);

// //   // Close mobile menu on escape key
// //   useEffect(() => {
// //     const handleEsc = (e: KeyboardEvent) => {
// //       if (e.key === "Escape") setMobileOpen(false);
// //     };
// //     document.addEventListener("keydown", handleEsc);
// //     return () => document.removeEventListener("keydown", handleEsc);
// //   }, []);

// //   // Lock body scroll when mobile menu is open
// //   useEffect(() => {
// //     if (mobileOpen) {
// //       document.body.style.overflow = "hidden";
// //     } else {
// //       document.body.style.overflow = "";
// //     }
// //     return () => {
// //       document.body.style.overflow = "";
// //     };
// //   }, [mobileOpen]);

// //   const handleHomeClick = useCallback(() => {
// //     if (pathname === "/") {
// //       window.scrollTo({ top: 0, behavior: "smooth" });
// //     }
// //   }, [pathname]);

// //   return (
// //     <>
// //       <motion.header
// //         initial={{ y: -100, opacity: 0 }}
// //         animate={{ y: 0, opacity: 1 }}
// //         transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
// //         className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
// //       >
// //         <nav
// //           className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 border ${
// //             scrolled || mobileOpen
// //               ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-white/10 shadow-lg shadow-black/40"
// //               : "bg-[#0A0A0A]/50 backdrop-blur-md border-white/10 shadow-md shadow-black/10" 
// //           }`}
// //         >
// //           <TransitionLink
// //             href="/"
// //             onClick={handleHomeClick}
// //             className="group flex items-center gap-2"
// //           >
// //             <span className="text-2xl font-semibold tracking-tight text-white">
// //               Go<span className="text-[#6495ED]"> Digital</span>
// //             </span>
// //           </TransitionLink>

// //           {/* Desktop Nav */}
// //           <ul className="hidden items-center gap-2 lg:flex">
// //             {navLinks.map((link) => {
// //               // Check if the current route matches the link (exact for home, startsWith for others to handle subpages)
// //               const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              
// //               return (
// //                 <li
// //                   key={link.href}
// //                   className=""
// //                   onMouseEnter={() => setHoveredNav(link.label)}
// //                   onMouseLeave={() => setHoveredNav(null)}
// //                 >
// //                   <TransitionLink
// //                     href={link.href}
// //                     onClick={link.href === "/" ? handleHomeClick : undefined}
// //                     className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors hover:text-[#6495ED] ${
// //                       isActive ? "text-[#6495ED]" : "text-white"
// //                     }`}
// //                   >
// //                     {link.label}
// //                     {link.label === "Solutions" && (
// //                       <ChevronDown
// //                         className={`h-4 w-4 transition-transform duration-300 ${hoveredNav === "Solutions" ? "rotate-180" : ""}`}
// //                       />
// //                     )}
// //                   </TransitionLink>

// //                   {/* FULL-WIDTH MEGA MENU DROPDOWN */}
// //                   {link.label === "Solutions" && (
// //                     <AnimatePresence>
// //                       {hoveredNav === "Solutions" && (
// //                         <motion.div
// //                           initial={{ opacity: 0, y: 10, scale: 0.98 }}
// //                           animate={{ opacity: 1, y: 0, scale: 1 }}
// //                           exit={{ opacity: 0, y: 5, scale: 0.98 }}
// //                           transition={{ duration: 0.2, ease: "easeOut" }}
// //                           className="absolute left-0 right-0 top-full pt-6"
// //                         >
// //                           <div className="flex w-full overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/95 backdrop-blur-xl shadow-2xl shadow-black/60">
// //                             {/* Left Column - Navigation Links */}
// //                             <div className="flex w-1/3 flex-col justify-center gap-8 border-r border-white/5 bg-[#0A0A0A]/80 p-12">
// //                               <TransitionLink
// //                                 href="/solutions#growth"
// //                                 className="group flex items-center gap-3 text-2xl font-bold text-white transition-colors hover:text-[#6495ED]"
// //                               >
// //                                 Growth Systems
// //                                 <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
// //                               </TransitionLink>
// //                               <TransitionLink
// //                                 href="/solutions#commerce"
// //                                 className="group flex items-center gap-3 text-2xl font-bold text-white transition-colors hover:text-[#6495ED]"
// //                               >
// //                                 Commerce Systems
// //                                 <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
// //                               </TransitionLink>
// //                               <TransitionLink
// //                                 href="/solutions#brand"
// //                                 className="group flex items-center gap-3 text-2xl font-bold text-white transition-colors hover:text-[#6495ED]"
// //                               >
// //                                 Brand Systems
// //                                 <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
// //                               </TransitionLink>
// //                             </div>

// //                                                     {/* Right Column - Image Graphics */}
// //                           <div className="grid w-2/3 grid-cols-2 gap-6 p-4">
// //                             {/* Graphic Card 1 */}
// //                             <TransitionLink
// //                               href="/insights/influencer-marketing"
// //                               className="group/card block"
// //                             >
// //                               <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-xl transition-all duration-500 group-hover/card:border-white/20 group-hover/card:shadow-2xl group-hover/card:shadow-[#6495ED]/20">
// //                                 <Image
// //                                   src="/header/img1.png"
// //                                   alt="The Real Reason Most D2C Brands Burn Money"
// //                                   fill
// //                                   className="object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
// //                                 />
// //                                 <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/card:bg-black/10" />
// //                               </div>
// //                             </TransitionLink>

// //                             {/* Graphic Card 2 */}
// //                             <TransitionLink
// //                               href="/insights/performance-marketing"
// //                               className="group/card block"
// //                             >
// //                               <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-xl transition-all duration-500 group-hover/card:border-white/20 group-hover/card:shadow-2xl group-hover/card:shadow-[#6495ED]/20">
// //                                 <Image
// //                                   src="/header/img2.png"
// //                                   alt="Why Performance Marketing Alone Can't Build a Brand Anymore"
// //                                   fill
// //                                   className="object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
// //                                 />
// //                                 <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/card:bg-black/10" />
// //                               </div>
// //                             </TransitionLink>
// //                           </div>
// //                           </div>
// //                         </motion.div>
// //                       )}
// //                     </AnimatePresence>
// //                   )}
// //                 </li>
// //               );
// //             })}
// //           </ul>

// //           {/* Desktop CTA */}
// //           <TransitionLink
// //             href="/contact"
// //             className="group hidden items-center gap-2 rounded-lg bg-[#6495ED] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4F7DF3] lg:inline-flex"
// //           >
// //             Contact Us
// //             <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
// //           </TransitionLink>

// //           {/* Mobile Hamburger Button */}
// //           <button
// //             onClick={() => setMobileOpen(!mobileOpen)}
// //             className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
// //             aria-label={mobileOpen ? "Close menu" : "Open menu"}
// //           >
// //             {mobileOpen ? (
// //               <X className="h-5 w-5" />
// //             ) : (
// //               <Menu className="h-5 w-5" />
// //             )}
// //           </button>
// //         </nav>
// //       </motion.header>

// //       {/* Mobile Menu Overlay */}
// //       <AnimatePresence>
// //         {mobileOpen && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             transition={{ duration: 0.2 }}
// //             className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
// //             onClick={() => setMobileOpen(false)}
// //           />
// //         )}
// //       </AnimatePresence>

// //       {/* Mobile Menu Panel */}
// //       <AnimatePresence>
// //         {mobileOpen && (
// //           <motion.div
// //             initial={{ x: "100%" }}
// //             animate={{ x: 0 }}
// //             exit={{ x: "100%" }}
// //             transition={{ type: "spring", damping: 30, stiffness: 300 }}
// //             className="fixed right-0 top-0 z-40 flex h-full w-[75vw] max-w-sm flex-col overflow-y-auto bg-[#0A0A0A] pt-24 lg:hidden"
// //           >
// //             <nav className="flex flex-col gap-1 px-6 pb-20">
// //               {navLinks.map((link, i) => {
// //                 const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

// //                 return (
// //                   <motion.div
// //                     key={link.href}
// //                     initial={{ opacity: 0, x: 20 }}
// //                     animate={{ opacity: 1, x: 0 }}
// //                     transition={{ delay: i * 0.05, duration: 0.3 }}
// //                     className="border-b border-white/5 last:border-0"
// //                   >
// //                     {link.label === "Solutions" ? (
// //                       <div className="flex flex-col">
// //                         <button
// //                           onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
// //                           className={`flex w-full items-center justify-between py-4 pr-4 text-lg font-medium transition-colors hover:text-[#6495ED] ${
// //                             isActive ? "text-[#6495ED]" : "text-white"
// //                           }`}
// //                         >
// //                           {link.label}
// //                           <ChevronDown
// //                             className={`h-5 w-5 transition-transform duration-300 ${
// //                               mobileSolutionsOpen ? "rotate-180" : ""
// //                             }`}
// //                           />
// //                         </button>
// //                         <AnimatePresence>
// //                           {mobileSolutionsOpen && (
// //                             <motion.div
// //                               initial={{ height: 0, opacity: 0 }}
// //                               animate={{ height: "auto", opacity: 1 }}
// //                               exit={{ height: 0, opacity: 0 }}
// //                               className="overflow-hidden"
// //                             >
// //                               <div className="mb-4 ml-4 flex flex-col gap-3 border-l border-white/10 pl-4">
// //                                 <TransitionLink href="/solutions#growth" className="text-base text-gray-400 hover:text-white">
// //                                   Growth Systems
// //                                 </TransitionLink>
// //                                 <TransitionLink href="/solutions#commerce" className="text-base text-gray-400 hover:text-white">
// //                                   Commerce Systems
// //                                 </TransitionLink>
// //                                 <TransitionLink href="/solutions#brand" className="text-base text-gray-400 hover:text-white">
// //                                   Brand Systems
// //                                 </TransitionLink>
// //                               </div>
// //                             </motion.div>
// //                           )}
// //                         </AnimatePresence>
// //                       </div>
// //                     ) : (
// //                       <TransitionLink
// //                         href={link.href}
// //                         onClick={() => {
// //                           setMobileOpen(false);
// //                           if (link.href === "/") handleHomeClick();
// //                         }}
// //                         className={`block py-4 pr-4 text-lg font-medium transition-colors hover:text-[#6495ED] ${
// //                           isActive ? "text-[#6495ED]" : "text-white"
// //                         }`}
// //                       >
// //                         {link.label}
// //                       </TransitionLink>
// //                     )}
// //                   </motion.div>
// //                 );
// //               })}
// //             </nav>

// //             <div className="mt-auto border-t border-white/10 px-6 py-6">
// //               <TransitionLink
// //                 href="/contact"
// //                 onClick={() => setMobileOpen(false)}
// //                 className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#6495ED] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#4F7DF3] active:scale-[0.98]"
// //               >
// //                 Contact Us
// //                 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
// //               </TransitionLink>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // }

// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { navLinks } from "@/lib/data";
// import { TransitionLink } from "@/components/layout/PageTransition";

// export function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [hoveredNav, setHoveredNav] = useState<string | null>(null);
//   const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMobileOpen(false);
//     setMobileSolutionsOpen(false);
//     setHoveredNav(null);
//   }, [pathname]);

//   // Close mobile menu on escape key
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setMobileOpen(false);
//     };
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, []);

//   // Lock body scroll when mobile menu is open
//   useEffect(() => {
//     if (mobileOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [mobileOpen]);

//   const handleHomeClick = useCallback(() => {
//     if (pathname === "/") {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   }, [pathname]);

//   return (
//     <>
//       <motion.header
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//         className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
//       >
//         <nav
//           className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 border ${
//             scrolled || mobileOpen
//               ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-white/10 shadow-lg shadow-black/40"
//               : "bg-[#0A0A0A]/50 backdrop-blur-md border-white/10 shadow-md shadow-black/10" 
//           }`}
//         >
//           <TransitionLink
//             href="/"
//             onClick={handleHomeClick}
//             className="group flex items-center gap-2"
//           >
//             <span className="text-2xl font-semibold tracking-tight text-white">
//               Go<span className="text-[#6495ED]"> Digital</span>
//             </span>
//           </TransitionLink>

//           {/* Desktop Nav */}
//           <ul className="hidden items-center gap-2 lg:flex">
//             {navLinks.map((link) => {
//               const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              
//               return (
//                 <li
//                   key={link.href}
//                   className=""
//                   onMouseEnter={() => setHoveredNav(link.label)}
//                   onMouseLeave={() => setHoveredNav(null)}
//                 >
//                   <TransitionLink
//                     href={link.href}
//                     onClick={link.href === "/" ? handleHomeClick : undefined}
//                     className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors hover:text-[#6495ED] ${
//                       isActive ? "text-[#6495ED]" : "text-white"
//                     }`}
//                   >
//                     {link.label}
//                     {link.label === "Solutions" && (
//                       <ChevronDown
//                         className={`h-4 w-4 transition-transform duration-300 ${hoveredNav === "Solutions" ? "rotate-180" : ""}`}
//                       />
//                     )}
//                   </TransitionLink>

//                   {/* FULL-WIDTH MEGA MENU DROPDOWN */}
//                   {link.label === "Solutions" && (
//                     <AnimatePresence>
//                       {hoveredNav === "Solutions" && (
//                         <motion.div
//                           initial={{ opacity: 0, y: 10, scale: 0.98 }}
//                           animate={{ opacity: 1, y: 0, scale: 1 }}
//                           exit={{ opacity: 0, y: 5, scale: 0.98 }}
//                           transition={{ duration: 0.2, ease: "easeOut" }}
//                           // Changed back to left-0 right-0 so it perfectly spans the width of the navbar
//                           className="absolute left-0 right-0 top-full pt-6"
//                         >
//                           <div className="flex w-full overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/95 backdrop-blur-xl shadow-2xl shadow-black/60">
                            
//                             {/* Left Column - Navigation Links */}
//                             <div className="flex w-1/3 flex-col justify-center gap-8 border-r border-white/5 bg-[#0A0A0A]/80 p-12">
//                               <TransitionLink
//                                 href="/solutions#growth"
//                                 className="group flex items-center gap-3 text-2xl font-bold text-white transition-colors hover:text-[#6495ED]"
//                               >
//                                 Growth Systems
//                                 <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
//                               </TransitionLink>
//                               <TransitionLink
//                                 href="/solutions#commerce"
//                                 className="group flex items-center gap-3 text-2xl font-bold text-white transition-colors hover:text-[#6495ED]"
//                               >
//                                 Commerce Systems
//                                 <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
//                               </TransitionLink>
//                               <TransitionLink
//                                 href="/solutions#brand"
//                                 className="group flex items-center gap-3 text-2xl font-bold text-white transition-colors hover:text-[#6495ED]"
//                               >
//                                 Brand Systems
//                                 <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
//                               </TransitionLink>
//                             </div>

//                            {/* Right Column - Image Graphics */}
//                               <div className="grid w-[60%] grid-cols-2 gap-5 p-6">
//                                 {/* Graphic Card 1 */}
//                                 <TransitionLink
//                                   href="/solutions"
//                                   className="group/card block"
//                                 >
//                                   {/* Removed background, borders, and shadows so the box is invisible */}
//                                   <div className="relative aspect-square w-full overflow-visible bg-transparent transition-all duration-500">
//                                     <Image
//                                       src="/header/img1.png"
//                                       alt="The Real Reason Most D2C Brands Burn Money"
//                                       fill
//                                       // Added rounded-xl here so the image itself has soft corners
//                                       className="rounded-xl object-contain transition-transform duration-700 group-hover/card:scale-105 group-hover/card:drop-shadow-2xl"
//                                     />
//                                   </div>
//                                 </TransitionLink>

//                                 {/* Graphic Card 2 */}
//                                 <TransitionLink
//                                   href="/solutions"
//                                   className="group/card block"
//                                 >
//                                   <div className="relative aspect-square w-full overflow-visible bg-transparent transition-all duration-500">
//                                     <Image
//                                       src="/header/img2.png"
//                                       alt="Why Performance Marketing Alone Can't Build a Brand Anymore"
//                                       fill
//                                       className="rounded-xl object-contain transition-transform duration-700 group-hover/card:scale-105 group-hover/card:drop-shadow-2xl"
//                                     />
//                                   </div>
//                                 </TransitionLink>
//                               </div>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>

//           {/* Desktop CTA */}
//           <TransitionLink
//             href="/contact"
//             className="group hidden items-center gap-2 rounded-lg bg-[#6495ED] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4F7DF3] lg:inline-flex"
//           >
//             Contact Us
//             <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
//           </TransitionLink>

//           {/* Mobile Hamburger Button */}
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
//             aria-label={mobileOpen ? "Close menu" : "Open menu"}
//           >
//             {mobileOpen ? (
//               <X className="h-5 w-5" />
//             ) : (
//               <Menu className="h-5 w-5" />
//             )}
//           </button>
//         </nav>
//       </motion.header>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
//             onClick={() => setMobileOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* Mobile Menu Panel */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 30, stiffness: 300 }}
//             className="fixed right-0 top-0 z-40 flex h-full w-[75vw] max-w-sm flex-col overflow-y-auto bg-[#0A0A0A] pt-24 lg:hidden"
//           >
//             <nav className="flex flex-col gap-1 px-6 pb-20">
//               {navLinks.map((link, i) => {
//                 const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

//                 return (
//                   <motion.div
//                     key={link.href}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.05, duration: 0.3 }}
//                     className="border-b border-white/5 last:border-0"
//                   >
//                     {link.label === "Solutions" ? (
//                       <div className="flex flex-col">
//                         <button
//                           onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
//                           className={`flex w-full items-center justify-between py-4 pr-4 text-lg font-medium transition-colors hover:text-[#6495ED] ${
//                             isActive ? "text-[#6495ED]" : "text-white"
//                           }`}
//                         >
//                           {link.label}
//                           <ChevronDown
//                             className={`h-5 w-5 transition-transform duration-300 ${
//                               mobileSolutionsOpen ? "rotate-180" : ""
//                             }`}
//                           />
//                         </button>
//                         <AnimatePresence>
//                           {mobileSolutionsOpen && (
//                             <motion.div
//                               initial={{ height: 0, opacity: 0 }}
//                               animate={{ height: "auto", opacity: 1 }}
//                               exit={{ height: 0, opacity: 0 }}
//                               className="overflow-hidden"
//                             >
//                               <div className="mb-4 ml-4 flex flex-col gap-3 border-l border-white/10 pl-4">
//                                 <TransitionLink href="/solutions#growth" className="text-base text-gray-400 hover:text-white">
//                                   Growth Systems
//                                 </TransitionLink>
//                                 <TransitionLink href="/solutions#commerce" className="text-base text-gray-400 hover:text-white">
//                                   Commerce Systems
//                                 </TransitionLink>
//                                 <TransitionLink href="/solutions#brand" className="text-base text-gray-400 hover:text-white">
//                                   Brand Systems
//                                 </TransitionLink>
//                               </div>
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </div>
//                     ) : (
//                       <TransitionLink
//                         href={link.href}
//                         onClick={() => {
//                           setMobileOpen(false);
//                           if (link.href === "/") handleHomeClick();
//                         }}
//                         className={`block py-4 pr-4 text-lg font-medium transition-colors hover:text-[#6495ED] ${
//                           isActive ? "text-[#6495ED]" : "text-white"
//                         }`}
//                       >
//                         {link.label}
//                       </TransitionLink>
//                     )}
//                   </motion.div>
//                 );
//               })}
//             </nav>

//             <div className="mt-auto border-t border-white/10 px-6 py-6">
//               <TransitionLink
//                 href="/contact"
//                 onClick={() => setMobileOpen(false)}
//                 className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#6495ED] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#4F7DF3] active:scale-[0.98]"
//               >
//                 Contact Us
//                 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
//               </TransitionLink>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { navLinks } from "@/lib/data";
import { TransitionLink } from "@/components/layout/PageTransition";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
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
    setMobileSolutionsOpen(false);
    setHoveredNav(null);
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
    return () => {
      document.body.style.overflow = "";
    };
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
          className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 border ${
            scrolled || mobileOpen
              ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-white/10 shadow-lg shadow-black/40"
              : "bg-[#0A0A0A]/50 backdrop-blur-md border-white/10 shadow-md shadow-black/10" 
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
          <ul className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              
              return (
                <li
                  key={link.href}
                  className=""
                  onMouseEnter={() => setHoveredNav(link.label)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <TransitionLink
                    href={link.href}
                    onClick={link.href === "/" ? handleHomeClick : undefined}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors hover:text-[#6495ED] ${
                      isActive ? "text-[#6495ED]" : "text-white"
                    }`}
                  >
                    {link.label}
                    {link.label === "Solutions" && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${hoveredNav === "Solutions" ? "rotate-180" : ""}`}
                      />
                    )}
                  </TransitionLink>

                  {/* FULL-WIDTH MEGA MENU DROPDOWN */}
                  {link.label === "Solutions" && (
                    <AnimatePresence>
                      {hoveredNav === "Solutions" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-0 right-0 top-full pt-6"
                        >
                          <div className="flex w-full overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/95 backdrop-blur-xl shadow-2xl shadow-black/60">
                            
                            {/* Left Column - Navigation Links */}
                            <div className="flex w-1/3 flex-col justify-center gap-8 border-r border-white/5 bg-[#0A0A0A]/80 p-12">
                              {/* FIXED: Point to dedicated pages instead of hashes */}
                              <TransitionLink
                                href="/solutions/growth-systems"
                                className="group flex items-center gap-3 text-2xl font-bold text-white transition-colors hover:text-[#6495ED]"
                              >
                                Growth Systems
                                <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
                              </TransitionLink>
                              <TransitionLink
                                href="/solutions/commerce-systems"
                                className="group flex items-center gap-3 text-2xl font-bold text-white transition-colors hover:text-[#6495ED]"
                              >
                                Commerce Systems
                                <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
                              </TransitionLink>
                              <TransitionLink
                                href="/solutions/brand-systems"
                                className="group flex items-center gap-3 text-2xl font-bold text-white transition-colors hover:text-[#6495ED]"
                              >
                                Brand Systems
                                <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
                              </TransitionLink>
                            </div>

                            {/* Right Column - Image Graphics */}
                              <div className="grid w-[60%] grid-cols-2 gap-5 p-6">
                                {/* Graphic Card 1 */}
                                <TransitionLink
                                  href="/solutions"
                                  className="group/card block"
                                >
                                  <div className="relative aspect-square w-full overflow-visible bg-transparent transition-all duration-500">
                                    <Image
                                      src="/header/img1.png"
                                      alt="The Real Reason Most D2C Brands Burn Money"
                                      fill
                                      className="rounded-xl object-contain transition-transform duration-700 group-hover/card:scale-105 group-hover/card:drop-shadow-2xl"
                                    />
                                  </div>
                                </TransitionLink>

                                {/* Graphic Card 2 */}
                                <TransitionLink
                                  href="/solutions"
                                  className="group/card block"
                                >
                                  <div className="relative aspect-square w-full overflow-visible bg-transparent transition-all duration-500">
                                    <Image
                                      src="/header/img2.png"
                                      alt="Why Performance Marketing Alone Can't Build a Brand Anymore"
                                      fill
                                      className="rounded-xl object-contain transition-transform duration-700 group-hover/card:scale-105 group-hover/card:drop-shadow-2xl"
                                    />
                                  </div>
                                </TransitionLink>
                              </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
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
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
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
            className="fixed right-0 top-0 z-40 flex h-full w-[75vw] max-w-sm flex-col overflow-y-auto bg-[#0A0A0A] pt-24 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 pb-20">
              {navLinks.map((link, i) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="border-b border-white/5 last:border-0"
                  >
                    {link.label === "Solutions" ? (
                      <div className="flex flex-col">
                        <button
                          onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                          className={`flex w-full items-center justify-between py-4 pr-4 text-lg font-medium transition-colors hover:text-[#6495ED] ${
                            isActive ? "text-[#6495ED]" : "text-white"
                          }`}
                        >
                          {link.label}
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-300 ${
                              mobileSolutionsOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileSolutionsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mb-4 ml-4 flex flex-col gap-3 border-l border-white/10 pl-4">
                                {/* FIXED: Mobile Links pointing to specific pages */}
                                <TransitionLink href="/solutions/growth-systems" className="text-base text-gray-400 hover:text-white">
                                  Growth Systems
                                </TransitionLink>
                                <TransitionLink href="/solutions/commerce-systems" className="text-base text-gray-400 hover:text-white">
                                  Commerce Systems
                                </TransitionLink>
                                <TransitionLink href="/solutions/brand-systems" className="text-base text-gray-400 hover:text-white">
                                  Brand Systems
                                </TransitionLink>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <TransitionLink
                        href={link.href}
                        onClick={() => {
                          setMobileOpen(false);
                          if (link.href === "/") handleHomeClick();
                        }}
                        className={`block py-4 pr-4 text-lg font-medium transition-colors hover:text-[#6495ED] ${
                          isActive ? "text-[#6495ED]" : "text-white"
                        }`}
                      >
                        {link.label}
                      </TransitionLink>
                    )}
                  </motion.div>
                );
              })}
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