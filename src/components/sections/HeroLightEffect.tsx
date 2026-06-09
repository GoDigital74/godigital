// "use client";

// import { motion } from "framer-motion";

// export function HeroLightEffect() {
//   return (
//     <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
//       {/* Primary key light — top-right, high intensity */}
//       <motion.div
//         className="absolute -right-[5%] -top-[10%] h-[85%] w-[75%] rounded-full blur-3xl"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(59, 130, 246, 0.85) 0%, rgba(37, 99, 235, 0.45) 35%, rgba(29, 78, 216, 0.15) 55%, transparent 72%)",
//         }}
//         animate={{
//           opacity: [0.75, 1, 0.75],
//           scale: [1, 1.08, 1],
//           x: [0, 18, 0],
//           y: [0, 10, 0],
//         }}
//         transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* Secondary key light — upper center spill */}
//       <motion.div
//         className="absolute left-[20%] top-[5%] h-[50%] w-[45%] rounded-full blur-3xl"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(96, 165, 250, 0.55) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)",
//         }}
//         animate={{
//           opacity: [0.4, 0.65, 0.4],
//           scale: [1, 1.05, 1],
//         }}
//         transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
//       />

//       {/* Fill light — bottom-left */}
//       <motion.div
//         className="absolute -bottom-[15%] -left-[5%] h-[60%] w-[55%] rounded-full blur-3xl"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(29, 78, 216, 0.5) 0%, rgba(30, 58, 138, 0.25) 45%, transparent 68%)",
//         }}
//         animate={{
//           opacity: [0.45, 0.7, 0.45],
//           scale: [1, 1.06, 1],
//         }}
//         transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
//       />

//       {/* Light beam streak */}
//       <div
//         className="absolute inset-0 opacity-50"
//         style={{
//           background:
//             "linear-gradient(118deg, transparent 22%, rgba(147, 197, 253, 0.28) 42%, rgba(59, 130, 246, 0.12) 52%, transparent 68%)",
//         }}
//       />

//       {/* Vignette for depth */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(8, 18, 40, 0.55) 100%)",
//         }}
//       />
//     </div>
//   );
// }
