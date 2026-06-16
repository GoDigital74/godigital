import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectSchema } from "./src/sanity/schema/project";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  title: "Go Digital Admin",
  plugins: [structureTool()],
  schema: {
    types: [projectSchema],
  },
});