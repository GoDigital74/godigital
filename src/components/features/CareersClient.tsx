// "use client";

// import { useState } from "react";
// import { PageShell } from "@/components/layout/PageShell";
// import { loginAdmin, logoutAdmin } from "@/app/actions/auth";
// import { saveJobToDatabase } from "@/app/actions/jobs"; // <-- Add this!
// type Job = {
//   id: string;
//   title: string;
//   description: string;
// };

// interface CareersClientProps {
//   initialIsAdmin: boolean;
//   initialJobs: Job[];
// }

// export function CareersClient({
//   initialIsAdmin,
//   initialJobs,
// }: CareersClientProps) {
//   const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
//   const [showModal, setShowModal] = useState(false);
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [jobs, setJobs] = useState<Job[]>(initialJobs);

//   // --- SECURE AUTH HANDLERS ---
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(""); // Clear old errors

//     try {
//       // Directly await the server action (no startTransition)
//       const result = await loginAdmin(password);
      
//       if (result.success) {
//         setIsAdmin(true);
//         setShowModal(false);
//         setPassword("");
//       } else {
//         setError(result.error || "Incorrect password");
//       }
//     } catch (err) {
//       console.error("Login crashed:", err);
//       setError("Server error. Check your VS Code terminal.");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logoutAdmin();
//       setIsAdmin(false);
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   // --- DATA MUTATION HANDLERS ---
//   const handleDelete = (id: string) => {
//     setJobs(jobs.filter((job) => job.id !== id));
//   };

//   const handleUpdate = (id: string, field: keyof Job, value: string) => {
//     setJobs(
//       jobs.map((job) => (job.id === id ? { ...job, [field]: value } : job)),
//     );
//   };

//   const handleSave = async (id: string) => {
//     alert("Saved to database!");
//   };

//   const handleAddJob = () => {
//     const newJob: Job = {
//       id: Date.now().toString(),
//       title: "New Job Title",
//       description: "New Description",
//     };
//     setJobs([...jobs, newJob]);
//   };

//   return (
//     <PageShell
//       title="Careers"
//       subtitle="Join a team that ships fast, thinks big, and cares about craft."
//     >
//       {/* ADMIN TOGGLE BUTTON */}
//       <div className="mt-8 flex justify-end">
//         {isAdmin ? (
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-slate-800 text-white rounded-md text-sm font-medium hover:bg-slate-700 transition"
//           >
//             Logout Admin
//           </button>
//         ) : (
//           <button
//             onClick={() => setShowModal(true)}
//             className="px-4 py-2 border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition bg-white/80 backdrop-blur-sm"
//           >
//             🛡️ Admin
//           </button>
//         )}
//       </div>

//       {/* ADMIN LOGIN MODAL */}
//       {showModal && !isAdmin && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
//           <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md mx-4">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">Admin Login</h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-slate-400 hover:text-black transition"
//               >
//                 ✕
//               </button>
//             </div>
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                   placeholder="Enter admin password"
//                   /* Removed disabled locks here */
//                 />
//                 {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 border rounded-md hover:bg-slate-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   Login
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* JOBS LISTING */}
//       <div className="mt-12 space-y-6 relative z-0">
//         {jobs.length === 0 && (
//           <p className="text-slate-500 text-center py-10">
//             No open roles currently.
//           </p>
//         )}

//         {jobs.map((job) => (
//           <div
//             key={job.id}
//             className="p-6 border border-slate-200 rounded-xl relative group bg-white"
//           >
//             {isAdmin ? (
//               <div className="space-y-4 pr-24">
//                 <input
//                   value={job.title}
//                   onChange={(e) =>
//                     handleUpdate(job.id, "title", e.target.value)
//                   }
//                   className="w-full text-xl font-bold border-b border-dashed border-blue-300 focus:outline-none focus:border-blue-500 pb-1 bg-transparent"
//                 />
//                 <textarea
//                   value={job.description}
//                   onChange={(e) =>
//                     handleUpdate(job.id, "description", e.target.value)
//                   }
//                   className="w-full text-slate-600 border-b border-dashed border-blue-300 focus:outline-none focus:border-blue-500 pb-1 resize-none bg-transparent"
//                   rows={2}
//                 />

//                 {/* ACTION BUTTONS */}
//                 <div className="absolute top-6 right-6 flex gap-2">
//                   <button
//                     onClick={() => handleSave(job.id)}
//                     className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-100 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => handleDelete(job.id)}
//                     className="text-red-500 p-1 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
//                     title="Delete Job"
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold">{job.title}</h3>
//                 <p className="text-slate-600 leading-relaxed">
//                   {job.description}
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}

//         {isAdmin && (
//           <button
//             onClick={handleAddJob}
//             className="w-full py-4 border-2 border-dashed border-blue-200 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors bg-white/50"
//           >
//             + Add New Position
//           </button>
//         )}
//       </div>
//     </PageShell>
//   );
// }

