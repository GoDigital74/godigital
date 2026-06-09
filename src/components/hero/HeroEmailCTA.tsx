// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowRight, Check } from "lucide-react";

// const PLACEHOLDER_DEFAULT = "Enter your email to start a project";
// const PLACEHOLDER_SUCCESS = "We'll reach out within 24 hours";
// const TYPE_SPEED = 60;
// const RESET_DELAY = 4000;

// export function HeroEmailCTA() {
//   const [showForm, setShowForm] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [email, setEmail] = useState("");
//   const [placeholder, setPlaceholder] = useState("");
//   const [typing, setTyping] = useState(false);
//   const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

//   const clearTimers = useCallback(() => {
//     if (resetTimer.current) clearTimeout(resetTimer.current);
//     if (typeTimer.current) clearInterval(typeTimer.current);
//   }, []);

//   const typePlaceholder = useCallback(
//     (text: string) => {
//       clearTimers();
//       setTyping(true);
//       setPlaceholder("");
//       let i = 0;
//       typeTimer.current = setInterval(() => {
//         i += 1;
//         setPlaceholder(text.slice(0, i));
//         if (i >= text.length) {
//           if (typeTimer.current) clearInterval(typeTimer.current);
//           setTyping(false);
//         }
//       }, TYPE_SPEED);
//     },
//     [clearTimers]
//   );

//   const resetToButton = useCallback(() => {
//     setShowForm(false);
//     setSubmitted(false);
//     setEmail("");
//     setPlaceholder("");
//   }, []);

//   const openForm = () => {
//     setShowForm(true);
//     typePlaceholder(PLACEHOLDER_DEFAULT);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email.trim()) return;
//     setSubmitted(true);
//     typePlaceholder(PLACEHOLDER_SUCCESS);
//     resetTimer.current = setTimeout(resetToButton, RESET_DELAY);
//   };

//   useEffect(() => () => clearTimers(), [clearTimers]);

//   return (
//     <div className="mt-2 min-h-[50px]">
//       <AnimatePresence mode="wait">
//         {!showForm ? (
//           <motion.button
//             key="cta-button"
//             type="button"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             onClick={openForm}
//             className="glass-pill cursor-pointer rounded-full border border-white/15 px-10 py-3 text-[14px] font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/10"
//           >
//             Get Started
//           </motion.button>
//         ) : (
//           <motion.form
//             key="cta-form"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             onSubmit={handleSubmit}
//             className="flex w-full max-w-[340px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] py-1.5 pl-5 pr-1.5 text-[14px] font-medium backdrop-blur-sm transition-colors duration-300 focus-within:border-blue-400/50"
//           >
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder={typing ? "" : submitted ? PLACEHOLDER_SUCCESS : PLACEHOLDER_DEFAULT}
//               className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/40"
//               autoFocus
//               required
//             />
//             {typing && (
//               <span className="pointer-events-none absolute left-5 text-white/40">
//                 {placeholder}
//                 <span className="animate-pulse">|</span>
//               </span>
//             )}
//             <button
//               type="submit"
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"
//               aria-label={submitted ? "Submitted" : "Submit email"}
//             >
//               {submitted ? (
//                 <Check className="h-4 w-4" />
//               ) : (
//                 <ArrowRight className="h-4 w-4" />
//               )}
//             </button>
//           </motion.form>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
