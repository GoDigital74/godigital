// // import { CareersClient } from "@/components/features/CareersClient";
// import { checkAuthStatus } from "../actions/auth";


// // In a full production app, you would fetch your jobs from a database here:
// // import { getJobs } from "@/lib/db";

// const mockJobs = [
//   { id: "1", title: "Frontend Engineer", description: "Build beautiful React UIs." },
//   { id: "2", title: "Performance Marketer", description: "Scale our client campaigns." },
// ];

// export default async function CareersPage() {
//   // 1. Check if the user has the secure admin cookie
//   const isAdmin = await checkAuthStatus();
  
//   // 2. Fetch jobs from DB (using mock data for now)
//   const initialJobs = mockJobs; 

//   return (
//     <CareersClient 
//       initialIsAdmin={isAdmin} 
//       initialJobs={initialJobs} 
//     />
//   );
// }

// import { CareersClient } from "@/components/features/CareersClient";
import { checkAuthStatus } from "@/app/actions/auth";
import { client } from "@/sanity/lib/client";

// Forces Next.js to check the auth cookie and fetch fresh jobs on every load
export const dynamic = "force-dynamic";

export default async function CareersPage() {
  // 1. Check if user is an admin
  const isAdmin = await checkAuthStatus();
  
  // 2. Fetch live jobs from your Sanity database
  const query = `*[_type == "job"]{
    "id": _id,
    title,
    description
  }`;
  const liveJobs = await client.fetch(query);

//   return (
//     <CareersClient 
//       initialIsAdmin={isAdmin} 
//       initialJobs={liveJobs} 
//     />
//   );
}