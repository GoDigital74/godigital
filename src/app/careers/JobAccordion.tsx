"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Clock, Briefcase, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Job {
  _id: string;
  title: string;
  location: string;
  employmentType: string;
  department: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
}

export function JobAccordion({ jobs }: { jobs: Job[] }) {
  // FIXED: Set the initial state to null so all tabs are closed by default
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const toggleJob = (id: string) => {
    setOpenJobId((prev) => (prev === id ? null : id));
  };

  // Helper to calculate days ago
  const getDaysAgo = (dateString: string) => {
    const posted = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {jobs.map((job) => {
        const isOpen = openJobId === job._id;
        const daysAgo = getDaysAgo(job.postedDate);

        return (
          <div
            key={job._id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-blue-100"
          >
            {/* Accordion Header */}
            <div
              onClick={() => toggleJob(job._id)}
              className="flex cursor-pointer items-start justify-between p-6 md:items-center"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-[#0A192F]">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500">
                  <span className="flex items-center gap-1.5 uppercase tracking-wide">
                    <MapPin className="h-4 w-4" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {job.employmentType}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" /> {job.department}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="hidden text-sm text-gray-400 md:block">
                  Posted {daysAgo} days ago
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100">
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </div>
            </div>

            {/* Accordion Body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="border-t border-gray-100 p-6 pt-4 text-gray-700">
                    <p className="mb-6 leading-relaxed">{job.description}</p>

                    <h4 className="mb-3 font-bold text-[#0A192F]">Key Responsibilities:</h4>
                    <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 marker:text-gray-400">
                      {job.responsibilities?.slice(0, 3).map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                    
                    {job.responsibilities?.length > 3 && (
                      <button className="mb-6 text-sm font-medium text-[#0056b3] hover:underline">
                        + more responsibilities
                      </button>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button className="flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900">
                        <FileText className="h-4 w-4" /> View Full Details
                      </button>
                      <button className="rounded-md bg-[#0056b3] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#004494] shadow-sm">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
