// "use client";

// import { useEffect } from "react";
// import { useParams } from "next/navigation";
// import { motion, Variants } from "framer-motion";
// import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";
// import { TransitionLink } from "@/components/layout/PageTransition";
// import { ArrowLeft } from "lucide-react";

// const projectsData: Record<string, any> = {
//   aruha: {
//     brand: "Aruha",
//     heroPreTitle: "How We Helped Aruha Scale from ₹0 to ",
//     heroHighlight: "₹2.5L+",
//     heroPostTitle: " Monthly Revenue",
//     description: "A performance-driven growth strategy combining Amazon optimization, Shopify migration, and Meta Ads to increase sales, improve customer experience, and build a scalable e-commerce ecosystem.",
//     services: ["Amazon Marketplace", "Shopify Migration", "Meta Ads", "CRO"],
//     stats: [
//       { stat: "₹2.5L+", label: "Monthly Amazon Revenue" },
//       { stat: "17x", label: "ROAS Achieved" },
//       { stat: "60+", label: "Orders Per Day" },
//       { stat: "WP → Shopify", label: "Store Migration" },
//       { stat: "Faster", label: "Checkout Experience" },
//       { stat: "Improved", label: "Conversion Rate" },
//     ],
//     challenges: [
//       { title: "Limited Marketplace Growth", desc: "The brand had minimal traction on Amazon and lacked a structured marketplace strategy." },
//       { title: "Slow Website Experience", desc: "The WordPress website suffered from slow loading speeds and a poor user journey." },
//       { title: "Low Conversion Rates", desc: "Users were dropping off before completing purchases due to friction in the buying process." },
//       { title: "Scaling Sales Efficiently", desc: "The brand needed a sustainable growth engine rather than relying on inconsistent sales." },
//     ],
//     strategies: [
//       { title: "Amazon Optimization", desc: "Optimized product listings, marketplace visibility, and catalog structure to improve discoverability and conversions." },
//       { title: "Shopify Migration", desc: "Migrated the website from WordPress to Shopify to create a faster, more reliable, and conversion-focused shopping experience." },
//       { title: "Performance Marketing", desc: "Launched targeted Meta advertising campaigns focused on customer acquisition and revenue growth." },
//       { title: "Conversion Optimization", desc: "Improved product presentation, user experience, and checkout flow to maximize conversions." },
//     ],
//     images: [
//       { title: "Amazon Marketplace Growth", desc: "Enhanced listings, improved visibility, and built a stronger marketplace presence.", placeholder: "[ Amazon Listing Image ]" },
//       { title: "Shopify Store Transformation", desc: "Created a faster, cleaner, and mobile-optimized storefront designed for conversions.", placeholder: "[ Shopify Storefront Image ]" },
//     ],
//     outcomes: [
//       { title: "Revenue Growth", desc: "₹0 → ₹2.5L+ Monthly Revenue Generated Through Amazon" },
//       { title: "Advertising Performance", desc: "17x ROAS Achieved Through Meta Ads" },
//       { title: "Daily Orders", desc: "60+ Orders Generated Per Day" },
//       { title: "Customer Experience", desc: "Faster Website, Better Checkout & Improved Conversion Journey" },
//     ],
//     learnings: [
//       { title: "Marketplace Optimization Matters", desc: "Strong listings and better visibility can significantly impact sales performance." },
//       { title: "Website Speed Influences Revenue", desc: "A faster and more seamless shopping experience improves conversions." },
//       { title: "Paid Ads Scale Faster with Strong Foundations", desc: "Advertising performs best when paired with an optimized store experience." },
//       { title: "Continuous Optimization Drives Growth", desc: "Testing, refining, and improving every stage of the funnel leads to sustainable results." },
//     ],
//     quote: "By combining marketplace growth, Shopify optimization, and performance marketing, Aruha transformed from a low-performing online store into a scalable e-commerce brand generating consistent revenue across channels.",
//   },

//   sethi: {
//     brand: "Sethi Watch Co.",
//     heroPreTitle: "How We Transformed Sethi Watch Co. Into a ",
//     heroHighlight: "Digital Growth Engine",
//     heroPostTitle: "",
//     description: "From having virtually no digital presence to generating ₹10L+ monthly revenue through performance marketing, we helped Sethi Watch Co. build a complete online ecosystem combining branding, website development, social media, and customer acquisition.",
//     services: ["Website Development", "Social Media", "Performance Marketing", "Google Ads"],
//     stats: [
//       { stat: "₹10L+", label: "Monthly Revenue" },
//       { stat: "10X", label: "Google Ads ROAS" },
//       { stat: "100%", label: "Digital Transformation" },
//       { stat: "Higher", label: "Qualified Leads" },
//       { stat: "Improved", label: "Brand Visibility" },
//       { stat: "Increased", label: "Sales Performance" },
//     ],
//     challenges: [
//       { title: "No Digital Presence", desc: "The brand primarily operated offline and lacked a strong online identity." },
//       { title: "Limited Customer Reach", desc: "Sales depended heavily on physical customer visits and word-of-mouth referrals." },
//       { title: "No Structured Lead Generation", desc: "There was no scalable system for attracting and converting customers online." },
//       { title: "Growth Limitations", desc: "Without digital channels, business growth remained restricted to existing local audiences." },
//     ],
//     strategies: [
//       { title: "Digital Foundation", desc: "Built a strong digital presence by establishing consistent branding across all online channels." },
//       { title: "Website Development", desc: "Designed and launched a premium website that reflected the credibility and heritage of the brand." },
//       { title: "Social Media Growth", desc: "Created a professional content strategy focused on showcasing collections, brand trust, and customer experience." },
//       { title: "Performance Marketing", desc: "Implemented Google Ads campaigns targeting high-intent buyers actively searching for premium watches." },
//     ],
//     images: [
//       { title: "Website Transformation", desc: "Designed a premium digital storefront aligned with the luxury positioning of the brand.", placeholder: "[ Website Screenshot ]" },
//       { title: "Performance Marketing Campaigns", desc: "Built high-converting Google Ads campaigns focused on revenue growth and customer acquisition.", placeholder: "[ G-Shock Campaign Creative ]" },
//     ],
//     outcomes: [
//       { title: "Revenue Growth", desc: "₹10L+ Monthly Revenue Generated Through Digital Marketing" },
//       { title: "Advertising Performance", desc: "10X ROAS Achieved Through Google Ads" },
//       { title: "Brand Visibility", desc: "Established a strong digital presence across multiple customer touchpoints." },
//       { title: "Customer Acquisition", desc: "Created a scalable system for generating qualified leads and sales." },
//     ],
//     learnings: [
//       { title: "Digital Presence Builds Trust", desc: "Customers increasingly evaluate brands online before making purchasing decisions." },
//       { title: "Performance Marketing Accelerates Growth", desc: "Targeting high-intent audiences creates predictable revenue opportunities." },
//       { title: "Website Experience Matters", desc: "A premium website improves trust, engagement, and conversion rates." },
//       { title: "Strong Foundations Create Sustainable Growth", desc: "When branding, content, website, and advertising work together, growth becomes scalable." },
//     ],
//     quote: "By combining branding, website development, social media management, and performance marketing, we transformed Sethi Watch Co. from a traditional offline retailer into a digital-first business generating ₹10L+ monthly revenue with a 10X Google Ads ROAS.",
//   },

//   titan: {
//     brand: "Titan Eye+",
//     heroPreTitle: "How We Helped Titan Eye+ Generate ",
//     heroHighlight: "₹10L+ Sales",
//     heroPostTitle: " in a Single Day",
//     description: "A performance-driven retail marketing strategy focused on increasing store footfall, attracting high-intent customers, and driving record-breaking single-day sales through targeted campaigns and localized customer acquisition.",
//     services: ["Retail Footfall", "Hyperlocal Marketing", "Performance Ads", "Customer Acquisition"],
//     stats: [
//       { stat: "₹10L+", label: "Single Day Sales" },
//       { stat: "Increased", label: "Store Footfall" },
//       { stat: "Higher", label: "Walk-In Conversions" },
//       { stat: "Stronger", label: "Local Visibility" },
//       { stat: "Better", label: "Store Engagement" },
//       { stat: "Scaled", label: "Customer Acquisition" },
//     ],
//     challenges: [
//       { title: "Driving High-Intent Footfall", desc: "The store needed a steady influx of potential customers ready to purchase rather than casual visitors." },
//       { title: "Competitive Retail Environment", desc: "With multiple eyewear brands competing for attention, standing out locally was essential." },
//       { title: "Maximizing Promotional Impact", desc: "The objective was to convert marketing efforts into actual store visits and measurable sales." },
//       { title: "Revenue Growth Target", desc: "The focus was to generate significant revenue within a short period through a focused retail growth strategy." },
//     ],
//     strategies: [
//       { title: "Hyperlocal Performance Campaigns", desc: "Designed highly targeted campaigns focused on audiences located within the store's catchment area." },
//       { title: "Store Visit Optimization", desc: "Created messaging and offers aimed at increasing physical store visits rather than just online engagement." },
//       { title: "Customer Acquisition", desc: "Targeted customers actively looking for eyewear, sunglasses, and vision solutions." },
//       { title: "Conversion-Oriented Communication", desc: "Used compelling creatives and audience targeting to maximize store visit intent and in-store conversions." },
//     ],
//     images: [
//       { title: "Footfall Growth Campaign", desc: "Executed location-focused campaigns that increased qualified walk-ins and customer engagement.", placeholder: "[ Titan Eye+ Store Visual ]" },
//       { title: "Retail Conversion Strategy", desc: "Developed performance-driven campaigns designed to convert awareness into store visits and purchases.", placeholder: "[ Campaign Creative ]" },
//     ],
//     outcomes: [
//       { title: "Revenue Impact", desc: "₹10L+ Sales Generated in a Single Day" },
//       { title: "Store Footfall", desc: "Significant Increase in Qualified Walk-In Customers" },
//       { title: "Brand Visibility", desc: "Enhanced Local Awareness and Market Presence" },
//       { title: "Retail Growth", desc: "Improved Store Performance Through Data-Driven Marketing Campaigns" },
//     ],
//     learnings: [
//       { title: "Footfall Is the Foundation of Retail Growth", desc: "The right audience entering the store creates more opportunities for sales." },
//       { title: "Local Targeting Delivers Better Results", desc: "Hyperlocal campaigns generate stronger intent and higher conversion rates." },
//       { title: "Offline Sales Can Be Scaled Digitally", desc: "Performance marketing can directly influence store visits and offline purchases." },
//       { title: "Retail Marketing Requires Precision", desc: "Success comes from targeting the right audience with the right message at the right time." },
//     ],
//     quote: "By combining hyperlocal targeting, performance marketing, and customer acquisition strategies, we helped Titan Eye+ generate ₹10L+ sales in a single day while creating a scalable framework for consistent retail growth and increased store footfall.",
//   },

//   raymond: {
//     brand: "Raymond",
//     heroPreTitle: "How We Helped Raymond Generate ",
//     heroHighlight: "₹25L+ Revenue",
//     heroPostTitle: " From a Single Store in Just 30 Days",
//     description: "A retail-focused growth strategy designed to increase store footfall, improve customer engagement, and drive measurable in-store revenue through targeted marketing and local brand visibility initiatives.",
//     services: ["Retail Footfall", "Local Area Marketing", "Performance Ads", "Brand Visibility"],
//     stats: [
//       { stat: "₹25L+", label: "Revenue Generated" },
//       { stat: "30 Days", label: "Campaign Duration" },
//       { stat: "Increased", label: "Store Footfall" },
//       { stat: "Higher", label: "Walk-in Conversions" },
//       { stat: "Stronger", label: "Local Visibility" },
//       { stat: "Better", label: "Customer Engagement" },
//     ],
//     challenges: [
//       { title: "Low Store Footfall", desc: "The store required a consistent flow of high-intent customers to increase revenue and maximize retail performance." },
//       { title: "Limited Local Awareness", desc: "Despite being a well-established brand, the store needed stronger visibility among potential customers in its target market." },
//       { title: "Offline Conversion Dependency", desc: "Revenue growth relied heavily on increasing physical store visits and converting walk-in customers effectively." },
//       { title: "Revenue Growth Objective", desc: "The primary goal was to drive measurable sales growth within a short period while building sustainable customer interest." },
//     ],
//     strategies: [
//       { title: "Retail Footfall Campaigns", desc: "Designed targeted campaigns focused on attracting qualified customers to the store location." },
//       { title: "Hyperlocal Marketing", desc: "Focused on reaching nearby audiences with strong purchase intent through location-based targeting." },
//       { title: "Brand Visibility", desc: "Strengthened Raymond's local presence through consistent communication and strategic promotions." },
//       { title: "Conversion-Focused Approach", desc: "Optimized campaign messaging to encourage store visits and increase purchase intent before customers entered the outlet." },
//     ],
//     images: [
//       { title: "Store Footfall Campaign", desc: "Developed high-performing campaigns designed to drive qualified walk-ins and increase in-store engagement.", placeholder: "[ Raymond Store Image ]" },
//       { title: "Local Market Expansion", desc: "Enhanced visibility across the target market to improve customer recall and attract new buyers.", placeholder: "[ Campaign Creative ]" },
//     ],
//     outcomes: [
//       { title: "Revenue Growth", desc: "₹25L+ Revenue Generated From a Single Store Within 30 Days" },
//       { title: "Store Footfall", desc: "Significant Increase in Qualified Walk-In Customers" },
//       { title: "Brand Presence", desc: "Stronger Local Market Visibility & Customer Recall" },
//       { title: "Customer Conversion", desc: "Higher In-Store Conversion Rates Through Better Targeting" },
//     ],
//     learnings: [
//       { title: "Footfall Drives Retail Revenue", desc: "More qualified store visits directly contribute to higher sales performance." },
//       { title: "Local Targeting Matters", desc: "Hyperlocal campaigns generate stronger engagement and better conversion opportunities." },
//       { title: "Awareness Creates Demand", desc: "Consistent visibility helps influence customer decisions before they visit the store." },
//       { title: "Retail Growth Requires Strategy", desc: "Revenue growth comes from combining awareness, acquisition, and conversion efforts into a single customer journey." },
//     ],
//     quote: "By combining strategic customer acquisition, local market visibility, and retail-focused marketing, we helped Raymond generate ₹25L+ revenue from a single store in just 30 days while creating a repeatable framework for sustained retail growth.",
//   },
// };

// // =========================================
// // ANIMATION VARIANTS
// // =========================================
// const fadeUpVariant: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number]} },
// };

// const staggerContainer: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.15 },
//   },
// };

// export default function DynamicProjectPage() {
//   const params = useParams();
//   const id = params.id as string;
//   const project = projectsData[id];

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "instant" });
//   }, []);

//   // Graceful fallback if the project ID doesn't exist yet
//   if (!project) {
//     return (
//       <>
//         <Header />
//         <main className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] text-white">
//           <h1 className="text-4xl font-bold">Case Study Not Found</h1>
//           <p className="mt-4 text-gray-400">This project is currently being written or doesn't exist.</p>
//           <TransitionLink href="/work" className="mt-8 flex items-center gap-2 text-[#6495ED] hover:underline">
//             <ArrowLeft className="h-4 w-4" /> Back to Portfolio
//           </TransitionLink>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Header />

//       <main className="min-h-screen bg-white">
//         {/* 1. HERO SECTION (DARK) */}
//         <section className="relative flex flex-col justify-center bg-[#0A0A0A] px-6 pt-40 pb-32 md:pt-48 md:pb-40">
//           <div className="mx-auto w-full max-w-7xl">
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={staggerContainer}
//               className="max-w-4xl"
//             >
//               <motion.div variants={fadeUpVariant} className="mb-6 flex flex-wrap gap-3">
//                 {project.services.map((service: string) => (
//                   <span key={service} className="rounded-full border border-[#6495ED] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#6495ED]">
//                     {service}
//                   </span>
//                 ))}
//               </motion.div>
              
//               <motion.h1 variants={fadeUpVariant} className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
//                 {project.heroPreTitle}
//                 <span className="text-[#6495ED]">{project.heroHighlight}</span>
//                 {project.heroPostTitle}
//               </motion.h1>
              
//               <motion.p variants={fadeUpVariant} className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
//                 {project.description}
//               </motion.p>
//             </motion.div>
//           </div>
//         </section>

//         {/* 2. RESULTS GRID (FLOATING OVERLAY) */}
//         <div className="mx-auto max-w-7xl px-6">
//           <motion.div 
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="-mt-20 relative z-10 grid grid-cols-2 gap-4 rounded-3xl bg-[#111827] p-6 shadow-2xl shadow-black/40 border border-white/5 md:grid-cols-3 md:gap-8 md:p-12"
//           >
//             {project.stats.map((result: any, i: number) => (
//               <div key={i} className="flex flex-col border-l border-white/10 pl-4 md:pl-6">
//                 <span className="text-2xl font-bold text-[#6495ED] md:text-4xl">{result.stat}</span>
//                 <span className="mt-2 text-xs font-medium text-gray-400 md:text-sm">{result.label}</span>
//               </div>
//             ))}
//           </motion.div>
//         </div>

//         {/* 3. CHALLENGE & STRATEGY (WHITE) */}
//         <section className="px-6 py-24 md:py-32">
//           <div className="mx-auto max-w-7xl">
//             {/* Challenge */}
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.3 }}
//               variants={staggerContainer}
//               className="mb-24 grid gap-12 md:grid-cols-12 md:gap-20"
//             >
//               <motion.div variants={fadeUpVariant} className="md:col-span-4">
//                 <h2 className="text-3xl font-bold tracking-tight text-[#0f172a] md:text-5xl">The Challenge</h2>
//               </motion.div>
//               <motion.div variants={fadeUpVariant} className="grid gap-8 md:col-span-8 md:grid-cols-2">
//                 {project.challenges.map((challenge: any, i: number) => (
//                   <div key={i}>
//                     <h3 className="text-xl font-bold text-[#0f172a]">{challenge.title}</h3>
//                     <p className="mt-3 text-slate-600">{challenge.desc}</p>
//                   </div>
//                 ))}
//               </motion.div>
//             </motion.div>

//             {/* Strategy */}
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.3 }}
//               variants={staggerContainer}
//               className="grid gap-12 border-t border-slate-200 pt-24 md:grid-cols-12 md:gap-20"
//             >
//               <motion.div variants={fadeUpVariant} className="md:col-span-4">
//                 <h2 className="text-3xl font-bold tracking-tight text-[#0f172a] md:text-5xl">Our Strategy</h2>
//               </motion.div>
//               <motion.div variants={fadeUpVariant} className="grid gap-8 md:col-span-8 md:grid-cols-2">
//                 {project.strategies.map((strat: any, i: number) => (
//                   <div key={i} className="rounded-2xl bg-slate-50 p-8 border border-slate-100">
//                     <h3 className="text-xl font-bold text-[#0f172a]">{strat.title}</h3>
//                     <p className="mt-3 text-slate-600 leading-relaxed">{strat.desc}</p>
//                   </div>
//                 ))}
//               </motion.div>
//             </motion.div>
//           </div>
//         </section>

//         {/* 4. FEATURED IMAGES */}
//         <section className="bg-slate-50 px-6 py-24 md:py-32">
//           <div className="mx-auto max-w-7xl">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="mb-12 text-center"
//             >
//               <h2 className="text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">Featured Work</h2>
//             </motion.div>
//             <div className="grid gap-8 md:grid-cols-2">
//               {project.images.map((img: any, i: number) => (
//                 <div key={i} className="flex flex-col gap-4">
//                   <div className="aspect-video w-full rounded-3xl bg-slate-200 flex items-center justify-center border border-slate-300">
//                     <span className="text-slate-400 font-medium">{img.placeholder}</span>
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-[#0f172a]">{img.title}</h4>
//                     <p className="text-sm text-slate-500">{img.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* 5. OUTCOME & LEARNINGS */}
//         <section className="px-6 py-24 md:py-32">
//           <div className="mx-auto max-w-7xl">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.3 }}
//               variants={staggerContainer}
//               className="grid gap-16 md:grid-cols-2 md:gap-24"
//             >
//               {/* Outcomes */}
//               <motion.div variants={fadeUpVariant}>
//                 <h2 className="mb-8 text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">The Outcome</h2>
//                 <ul className="space-y-6">
//                   {project.outcomes.map((item: any, i: number) => (
//                     <li key={i} className="flex flex-col">
//                       <span className="font-bold text-[#6495ED]">{item.title}</span>
//                       <span className="text-slate-600 font-medium">{item.desc}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>

//               {/* Learnings */}
//               <motion.div variants={fadeUpVariant}>
//                 <h2 className="mb-8 text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">Key Learnings</h2>
//                 <div className="space-y-8">
//                   {project.learnings.map((learning: any, i: number) => (
//                     <div key={i}>
//                       <h4 className="font-bold text-[#0f172a]">{learning.title}</h4>
//                       <p className="mt-1 text-slate-600">{learning.desc}</p>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </motion.div>
//           </div>
//         </section>

//         {/* 6. BOTTOM QUOTE (DARK) */}
//         <section className="bg-[#0A0A0A] px-6 py-24 md:py-32">
//           <div className="mx-auto max-w-4xl text-center">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <svg className="mx-auto mb-8 h-12 w-12 text-[#6495ED]/50" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//               </svg>
//               <h2 className="text-2xl font-medium leading-relaxed text-white md:text-4xl md:leading-snug">
//                 "{project.quote}"
//               </h2>
//             </motion.div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// }

import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import ProjectTemplate from "./ProjectTemplate";

// =========================================
// HARDCODED FALLBACK DATA
// These 3 case studies are featured on the homepage and always
// available as reference for the admin when creating new projects
// in Sanity Studio. If a Sanity document exists with the same slug,
// the Sanity version takes priority.
// =========================================
const hardcodedProjects: Record<string, any> = {
  raymond: {
    brand: "Raymond",
    heroPreTitle: "How We Helped Raymond Generate ",
    heroHighlight: "₹25L+ Revenue",
    heroPostTitle: " From a Single Store in Just 30 Days",
    description: "A retail-focused growth strategy designed to increase store footfall, improve customer engagement, and drive measurable in-store revenue through targeted marketing and local brand visibility initiatives.",
    services: ["Retail Footfall", "Local Area Marketing", "Performance Ads", "Brand Visibility"],
    stats: [
      { stat: "₹25L+", label: "Revenue Generated" },
      { stat: "30 Days", label: "Campaign Duration" },
      { stat: "Increased", label: "Store Footfall" },
      { stat: "Higher", label: "Walk-in Conversions" },
      { stat: "Stronger", label: "Local Visibility" },
      { stat: "Better", label: "Customer Engagement" },
    ],
    challenges: [
      { title: "Low Store Footfall", desc: "The store required a consistent flow of high-intent customers to increase revenue and maximize retail performance." },
      { title: "Limited Local Awareness", desc: "Despite being a well-established brand, the store needed stronger visibility among potential customers in its target market." },
      { title: "Offline Conversion Dependency", desc: "Revenue growth relied heavily on increasing physical store visits and converting walk-in customers effectively." },
      { title: "Revenue Growth Objective", desc: "The primary goal was to drive measurable sales growth within a short period while building sustainable customer interest." },
    ],
    strategies: [
      { title: "Retail Footfall Campaigns", desc: "Designed targeted campaigns focused on attracting qualified customers to the store location." },
      { title: "Hyperlocal Marketing", desc: "Focused on reaching nearby audiences with strong purchase intent through location-based targeting." },
      { title: "Brand Visibility", desc: "Strengthened Raymond's local presence through consistent communication and strategic promotions." },
      { title: "Conversion-Focused Approach", desc: "Optimized campaign messaging to encourage store visits and increase purchase intent before customers entered the outlet." },
    ],
    images: [
      { title: "Store Footfall Campaign", desc: "Developed high-performing campaigns designed to drive qualified walk-ins and increase in-store engagement.", url: "" },
      { title: "Local Market Expansion", desc: "Enhanced visibility across the target market to improve customer recall and attract new buyers.", url: "" },
    ],
    outcomes: [
      { title: "Revenue Growth", desc: "₹25L+ Revenue Generated From a Single Store Within 30 Days" },
      { title: "Store Footfall", desc: "Significant Increase in Qualified Walk-In Customers" },
      { title: "Brand Presence", desc: "Stronger Local Market Visibility & Customer Recall" },
      { title: "Customer Conversion", desc: "Higher In-Store Conversion Rates Through Better Targeting" },
    ],
    learnings: [
      { title: "Footfall Drives Retail Revenue", desc: "More qualified store visits directly contribute to higher sales performance." },
      { title: "Local Targeting Matters", desc: "Hyperlocal campaigns generate stronger engagement and better conversion opportunities." },
      { title: "Awareness Creates Demand", desc: "Consistent visibility helps influence customer decisions before they visit the store." },
      { title: "Retail Growth Requires Strategy", desc: "Revenue growth comes from combining awareness, acquisition, and conversion efforts into a single customer journey." },
    ],
    quote: "By combining strategic customer acquisition, local market visibility, and retail-focused marketing, we helped Raymond generate ₹25L+ revenue from a single store in just 30 days while creating a repeatable framework for sustained retail growth.",
  },

  sethi: {
    brand: "Sethi Watch Co.",
    heroPreTitle: "How We Transformed Sethi Watch Co. Into a ",
    heroHighlight: "Digital Growth Engine",
    heroPostTitle: "",
    description: "From having virtually no digital presence to generating ₹10L+ monthly revenue through performance marketing, we helped Sethi Watch Co. build a complete online ecosystem combining branding, website development, social media, and customer acquisition.",
    services: ["Website Development", "Social Media", "Performance Marketing", "Google Ads"],
    stats: [
      { stat: "₹10L+", label: "Monthly Revenue" },
      { stat: "10X", label: "Google Ads ROAS" },
      { stat: "100%", label: "Digital Transformation" },
      { stat: "Higher", label: "Qualified Leads" },
      { stat: "Improved", label: "Brand Visibility" },
      { stat: "Increased", label: "Sales Performance" },
    ],
    challenges: [
      { title: "No Digital Presence", desc: "The brand primarily operated offline and lacked a strong online identity." },
      { title: "Limited Customer Reach", desc: "Sales depended heavily on physical customer visits and word-of-mouth referrals." },
      { title: "No Structured Lead Generation", desc: "There was no scalable system for attracting and converting customers online." },
      { title: "Growth Limitations", desc: "Without digital channels, business growth remained restricted to existing local audiences." },
    ],
    strategies: [
      { title: "Digital Foundation", desc: "Built a strong digital presence by establishing consistent branding across all online channels." },
      { title: "Website Development", desc: "Designed and launched a premium website that reflected the credibility and heritage of the brand." },
      { title: "Social Media Growth", desc: "Created a professional content strategy focused on showcasing collections, brand trust, and customer experience." },
      { title: "Performance Marketing", desc: "Implemented Google Ads campaigns targeting high-intent buyers actively searching for premium watches." },
    ],
    images: [
      { title: "Website Transformation", desc: "Designed a premium digital storefront aligned with the luxury positioning of the brand.", url: "" },
      { title: "Performance Marketing Campaigns", desc: "Built high-converting Google Ads campaigns focused on revenue growth and customer acquisition.", url: "" },
    ],
    outcomes: [
      { title: "Revenue Growth", desc: "₹10L+ Monthly Revenue Generated Through Digital Marketing" },
      { title: "Advertising Performance", desc: "10X ROAS Achieved Through Google Ads" },
      { title: "Brand Visibility", desc: "Established a strong digital presence across multiple customer touchpoints." },
      { title: "Customer Acquisition", desc: "Created a scalable system for generating qualified leads and sales." },
    ],
    learnings: [
      { title: "Digital Presence Builds Trust", desc: "Customers increasingly evaluate brands online before making purchasing decisions." },
      { title: "Performance Marketing Accelerates Growth", desc: "Targeting high-intent audiences creates predictable revenue opportunities." },
      { title: "Website Experience Matters", desc: "A premium website improves trust, engagement, and conversion rates." },
      { title: "Strong Foundations Create Sustainable Growth", desc: "When branding, content, website, and advertising work together, growth becomes scalable." },
    ],
    quote: "By combining branding, website development, social media management, and performance marketing, we transformed Sethi Watch Co. from a traditional offline retailer into a digital-first business generating ₹10L+ monthly revenue with a 10X Google Ads ROAS.",
  },

  titan: {
    brand: "Titan Eye+",
    heroPreTitle: "How We Helped Titan Eye+ Generate ",
    heroHighlight: "₹10L+ Sales",
    heroPostTitle: " in a Single Day",
    description: "A performance-driven retail marketing strategy focused on increasing store footfall, attracting high-intent customers, and driving record-breaking single-day sales through targeted campaigns and localized customer acquisition.",
    services: ["Retail Footfall", "Hyperlocal Marketing", "Performance Ads", "Customer Acquisition"],
    stats: [
      { stat: "₹10L+", label: "Single Day Sales" },
      { stat: "Increased", label: "Store Footfall" },
      { stat: "Higher", label: "Walk-In Conversions" },
      { stat: "Stronger", label: "Local Visibility" },
      { stat: "Better", label: "Store Engagement" },
      { stat: "Scaled", label: "Customer Acquisition" },
    ],
    challenges: [
      { title: "Driving High-Intent Footfall", desc: "The store needed a steady influx of potential customers ready to purchase rather than casual visitors." },
      { title: "Competitive Retail Environment", desc: "With multiple eyewear brands competing for attention, standing out locally was essential." },
      { title: "Maximizing Promotional Impact", desc: "The objective was to convert marketing efforts into actual store visits and measurable sales." },
      { title: "Revenue Growth Target", desc: "The focus was to generate significant revenue within a short period through a focused retail growth strategy." },
    ],
    strategies: [
      { title: "Hyperlocal Performance Campaigns", desc: "Designed highly targeted campaigns focused on audiences located within the store's catchment area." },
      { title: "Store Visit Optimization", desc: "Created messaging and offers aimed at increasing physical store visits rather than just online engagement." },
      { title: "Customer Acquisition", desc: "Targeted customers actively looking for eyewear, sunglasses, and vision solutions." },
      { title: "Conversion-Oriented Communication", desc: "Used compelling creatives and audience targeting to maximize store visit intent and in-store conversions." },
    ],
    images: [
      { title: "Footfall Growth Campaign", desc: "Executed location-focused campaigns that increased qualified walk-ins and customer engagement.", url: "" },
      { title: "Retail Conversion Strategy", desc: "Developed performance-driven campaigns designed to convert awareness into store visits and purchases.", url: "" },
    ],
    outcomes: [
      { title: "Revenue Impact", desc: "₹10L+ Sales Generated in a Single Day" },
      { title: "Store Footfall", desc: "Significant Increase in Qualified Walk-In Customers" },
      { title: "Brand Visibility", desc: "Enhanced Local Awareness and Market Presence" },
      { title: "Retail Growth", desc: "Improved Store Performance Through Data-Driven Marketing Campaigns" },
    ],
    learnings: [
      { title: "Footfall Is the Foundation of Retail Growth", desc: "The right audience entering the store creates more opportunities for sales." },
      { title: "Local Targeting Delivers Better Results", desc: "Hyperlocal campaigns generate stronger intent and higher conversion rates." },
      { title: "Offline Sales Can Be Scaled Digitally", desc: "Performance marketing can directly influence store visits and offline purchases." },
      { title: "Retail Marketing Requires Precision", desc: "Success comes from targeting the right audience with the right message at the right time." },
    ],
    quote: "By combining hyperlocal targeting, performance marketing, and customer acquisition strategies, we helped Titan Eye+ generate ₹10L+ sales in a single day while creating a scalable framework for consistent retail growth and increased store footfall.",
  },
};

export const revalidate = 60; 

// Note the updated type: params is a Promise
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await the params object to extract the ID safely
  const { id } = await params;

  // 2. Try fetching from Sanity first (CMS-managed projects take priority)
  const query = `*[_type == "project" && slug.current == $id][0]{
    ...,
    "images": images[]{
      title,
      desc,
      "url": image.asset->url
    }
  }`;
  const projectData = await client.fetch(query, { id });

  // 3. If Sanity has data, use it. Otherwise fall back to hardcoded data.
  const project = projectData || hardcodedProjects[id];

  if (!project) {
    notFound();
  }

  return <ProjectTemplate project={project} />;
}