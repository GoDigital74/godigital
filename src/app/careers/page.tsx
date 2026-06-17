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