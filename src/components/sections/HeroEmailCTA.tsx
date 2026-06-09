// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowRight, Check } from "lucide-react";

// const PLACEHOLDER_DEFAULT = "Enter your email to start a project";
// const PLACEHOLDER_SUCCESS = "We'll be in touch shortly";

// type CtaState = "button" | "form" | "success";

// export function HeroEmailCTA() {
//   const [state, setState] = useState<CtaState>("button");
//   const [email, setEmail] = useState("");
//   const [typedPlaceholder, setTypedPlaceholder] = useState("");
//   const [targetPlaceholder, setTargetPlaceholder] = useState("");
//   const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const clearResetTimer = useCallback(() => {
//     if (resetTimer.current) {
//       clearTimeout(resetTimer.current);
//       resetTimer.current = null;
//     }
//   }, []);

//   useEffect(() => {
//     if (state !== "form" && state !== "success") {
//       setTypedPlaceholder("");
//       return;
//     }

//     setTypedPlaceholder("");
//     let i = 0;
//     const interval = setInterval(() => {
//       i += 1;
//       setTypedPlaceholder(targetPlaceholder.slice(0, i));
//       if (i >= targetPlaceholder.length) clearInterval(interval);
//     }, 60);

//     return () => clearInterval(interval);
//   }, [state, targetPlaceholder]);

//   const openForm = () => {
//     clearResetTimer();
//     setTargetPlaceholder(PLACEHOLDER_DEFAULT);
//     setState("form");
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email.trim()) return;
//     clearResetTimer();
//     setTargetPlaceholder(PLACEHOLDER_SUCCESS);
//     setState("success");
//     resetTimer.current = setTimeout(() => {
//       setState("button");
//       setEmail("");
//     }, 4000);
//   };

//   useEffect(() => () => clearResetTimer(), [clearResetTimer]);

//   return (
//     <div className="mt-2 min-h-[50px]">
//       <AnimatePresence mode="wait">
//         {state === "button" && (
//           <motion.button
//             key="cta-button"
//             type="button"
//             onClick={openForm}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="cursor-pointer rounded-full border border-white/25 bg-white/10 px-10 py-3 text-[14px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-sky-200/50 hover:bg-white/15"
//           >
//             Get early access
//           </motion.button>
//         )}

//         {(state === "form" || state === "success") && (
//           <motion.form
//             key="cta-form"
//             onSubmit={handleSubmit}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="glass-pill flex w-full max-w-[340px] items-center gap-2 border border-white/30 bg-white/10 py-1.5 pl-5 pr-1.5 text-[14px] font-medium transition-colors duration-300 focus-within:border-sky-200/60"
//           >
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder={typedPlaceholder}
//               disabled={state === "success"}
//               autoFocus
//               className="w-full bg-transparent text-white outline-none placeholder:text-white/40 disabled:opacity-70"
//             />
//             <button
//               type="submit"
//               disabled={state === "success"}
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark disabled:bg-emerald-500"
//             >
//               {state === "success" ? (
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
