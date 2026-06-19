// import { client } from "@/sanity/lib/client";
// import { notFound } from "next/navigation";
// import ProjectTemplate from "./ProjectTemplate";

// // =========================================
// // HARDCODED FALLBACK DATA
// // These 3 case studies are featured on the homepage and always
// // available as reference for the admin when creating new projects
// // in Sanity Studio. If a Sanity document exists with the same slug,
// // the Sanity version takes priority.
// // =========================================
// const hardcodedProjects: Record<string, any> = {
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
//       { title: "Store Footfall Campaign", desc: "Developed high-performing campaigns designed to drive qualified walk-ins and increase in-store engagement.", url: "" },
//       { title: "Local Market Expansion", desc: "Enhanced visibility across the target market to improve customer recall and attract new buyers.", url: "" },
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
//       { title: "Website Transformation", desc: "Designed a premium digital storefront aligned with the luxury positioning of the brand.", url: "" },
//       { title: "Performance Marketing Campaigns", desc: "Built high-converting Google Ads campaigns focused on revenue growth and customer acquisition.", url: "" },
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
//       { title: "Footfall Growth Campaign", desc: "Executed location-focused campaigns that increased qualified walk-ins and customer engagement.", url: "" },
//       { title: "Retail Conversion Strategy", desc: "Developed performance-driven campaigns designed to convert awareness into store visits and purchases.", url: "" },
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
// };

// export const revalidate = 60; 

// // Note the updated type: params is a Promise
// export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
//   // 1. Await the params object to extract the ID safely
//   const { id } = await params;

//   // 2. Try fetching from Sanity first (CMS-managed projects take priority)
//   const query = `*[_type == "project" && slug.current == $id][0]{
//     ...,
//     "bannerImage": bannerImage.asset->url,
//     "images": images[]{
//       title,
//       desc,
//       "url": image.asset->url
//     }
//   }`;
//   const projectData = await client.fetch(query, { id });

//   // 3. If Sanity has data, use it. Otherwise fall back to hardcoded data.
//   const project = projectData || hardcodedProjects[id];

//   if (!project) {
//     notFound();
//   }

//   return <ProjectTemplate project={project} />;
// }


import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import ProjectTemplate from "./ProjectTemplate";

export const revalidate = 60; 

// Note the updated type: params is a Promise
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await the params object to extract the ID safely
  const { id } = await params;

  // 2. Fetch the dynamically managed project from Sanity
  const query = `*[_type == "project" && slug.current == $id][0]{
    ...,
    "bannerImage": bannerImage.asset->url,
    "images": images[]{
      title,
      desc,
      "url": image.asset->url
    }
  }`;
  
  const project = await client.fetch(query, { id });

  // 3. If Sanity doesn't have the data, throw a clean 404
  if (!project) {
    notFound();
  }

  // 4. Render the purely dynamic template
  return <ProjectTemplate project={project} />;
}