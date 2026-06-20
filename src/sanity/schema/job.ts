import { defineType, defineField, defineArrayMember } from "sanity";

export const jobSchema = defineType({
  name: "job",
  title: "Job Postings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location (e.g., Noida)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: ["Full-time", "Part-time", "Contract", "Full-time / Contract"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      description: "e.g., Support, Development",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "postedDate",
      title: "Posted Date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Brief Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "responsibilities",
      title: "Key Responsibilities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Add bullet points for responsibilities.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "department",
    },
  },
});