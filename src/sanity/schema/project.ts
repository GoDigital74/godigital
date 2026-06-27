import { defineType, defineField, defineArrayMember } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Portfolio Projects",
  type: "document",
  groups: [
    { name: "meta", title: "1. Brand Details", default: true },
    { name: "hero", title: "2. Hero Section" },
    { name: "overview", title: "3. Stats & Services" },
    { name: "deepDive", title: "4. Challenges & Strategy" },
    { name: "media", title: "5. Featured Work (Images)" },
    { name: "video", title: "6. Video Showcase" }, // NEW GROUP ADDED
    { name: "results", title: "7. Outcomes & Quote" }, // BUMPED TO 7
  ],
  fields: [
    // ==========================================
    // GROUP 1: BRAND DETAILS (+ Card-Level Fields)
    // ==========================================
    defineField({ 
      name: "brand", 
      title: "Brand Name", 
      type: "string",
      group: "meta",
      description: "The name of the company (e.g., Sethi Watch Co.)",
      validation: (Rule) => Rule.required()
    }),
    defineField({ 
      name: "slug", 
      title: "URL Slug", 
      type: "slug", 
      group: "meta",
      description: "Click 'Generate' to create a URL-friendly link (e.g., /work/sethi-watch-co)",
      options: { source: "brand" },
      validation: (Rule) => Rule.required()
    }),
    defineField({ 
      name: "category", 
      title: "Category", 
      type: "string",
      group: "meta",
      description: "Appears on the portfolio grid pill (e.g., Retail, E-commerce)",
      options: {
        list: [
          "E-commerce", 
          "Retail", 
          "Health & Wellness", 
          "Personal Care",
          "Beauty & Skin Care",          
          "Hospitality & Food",          
          "Fashion & Lifestyle",         
          "Manufacturing & Packaging",   
          "Automotive"                  
        ],
      },
    }),
    defineField({
      name: "desc",
      title: "Short Description (Card)",
      type: "text",
      group: "meta",
      rows: 3,
      description: "A brief one-liner shown on the card in the /work grid (e.g., 'Amazon Optimization & Shopify Migration Strategy')",
    }),
    defineField({
      name: "date",
      title: "Date (Used for Sorting)",
      type: "date",
      group: "meta",
      description: "Used to sort projects on the /work page (newest first by default).",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image (Card Thumbnail)",
      type: "image",
      group: "meta",
      options: { hotspot: true },
      description: "The image displayed on the card in the /work grid.",
    }),
    defineField({
      name: "cardMetrics",
      title: "Card Metrics (Max 4)",
      type: "array",
      group: "meta",
      description: "Up to 4 key stats shown on the card in the /work grid (e.g., ₹2.5L+ / Monthly Rev).",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "value", title: "Value (e.g., ₹2.5L+)", type: "string" },
            { name: "label", title: "Label (e.g., Monthly Rev)", type: "string" },
          ],
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // ==========================================
    // GROUP 2: HERO SECTION
    // ==========================================
    defineField({ 
      name: "heroPreTitle", 
      title: "Hero Pre-Title (White Text)", 
      type: "string",
      group: "hero",
      description: "e.g., 'How We Transformed Sethi Watch Co. Into a '"
    }),
    defineField({ 
      name: "heroHighlight", 
      title: "Hero Highlight (Blue Text)", 
      type: "string",
      group: "hero",
      description: "e.g., 'Digital Growth Engine'"
    }),
    defineField({ 
      name: "heroPostTitle", 
      title: "Hero Post-Title (White Text)", 
      type: "string",
      group: "hero",
      description: "Any text that comes after the blue highlight (Leave blank if none)."
    }),
    defineField({ 
      name: "description", 
      title: "Main Description", 
      type: "text",
      group: "hero",
      rows: 4,
      description: "The summary paragraph underneath the main title."
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "Wide case-study banner shown on the /work/project detail page. Recommended ratio: around 2.4:1, similar to 1440 x 600.",
    }),

    // ==========================================
    // GROUP 3: STATS & SERVICES
    // ==========================================
    defineField({ 
      name: "services", 
      title: "Services Provided", 
      type: "array", 
      group: "overview",
      description: "Add tags for the top pills (e.g., Website Design, Performance Marketing).",
      of: [defineArrayMember({ type: "string" })] 
    }),
    defineField({
      name: "stats",
      title: "Results At A Glance (Floating Grid)",
      type: "array",
      group: "overview",
      description: "The numbers that appear in the floating grid right after the hero.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "stat", title: "Stat Value", type: "string", description: "e.g., ₹10L+ or 10X" },
            { name: "label", title: "Stat Label", type: "string", description: "e.g., Monthly Revenue" }
          ]
        })
      ]
    }),

    // ==========================================
    // GROUP 4: CHALLENGES & STRATEGY
    // ==========================================
    defineField({
      name: "challenges",
      title: "The Challenge",
      type: "array",
      group: "deepDive",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Challenge Title", type: "string", description: "e.g., No Digital Presence" },
            { name: "desc", title: "Challenge Description", type: "text", rows: 2, description: "e.g., The brand primarily operated offline..." }
          ]
        })
      ]
    }),
    defineField({
      name: "strategies",
      title: "Our Strategy",
      type: "array",
      group: "deepDive",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Strategy Title", type: "string", description: "e.g., Digital Foundation" },
            { name: "desc", title: "Strategy Description", type: "text", rows: 2, description: "e.g., Built a strong digital presence by..." }
          ]
        })
      ]
    }),

    // ==========================================
    // GROUP 5: MEDIA & FEATURED WORK
    // ==========================================
    defineField({
      name: "images",
      title: "Featured Work Images",
      type: "array",
      group: "media",
      description: "Upload screenshots and creatives related to this project.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "image", title: "Upload Image", type: "image", options: { hotspot: true } },
            { name: "title", title: "Image Title", type: "string", description: "e.g., Website Transformation" },
            { name: "desc", title: "Image Description", type: "string", description: "e.g., Designed a premium digital storefront..." }
          ]
        })
      ]
    }),

    // ==========================================
    // GROUP 6: FULL-WIDTH VIDEO (OPTIONAL)
    // ==========================================
    defineField({
      name: "video",
      title: 'YouTube Video URL',
      type: "url",
      group: "video",
      description: "Paste a YouTube video link (e.g., https://www.youtube.com/watch?v=...)",
    }),

    // ==========================================
    // GROUP 7: RESULTS & CONCLUSION
    // ==========================================
    defineField({
      name: "outcomes",
      title: "The Outcome",
      type: "array",
      group: "results",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Outcome Title", type: "string", description: "e.g., Revenue Growth" },
            { name: "desc", title: "Outcome Description", type: "string", description: "e.g., ₹10L+ Monthly Revenue Generated..." }
          ]
        })
      ]
    }),
    defineField({
      name: "learnings",
      title: "Key Learnings",
      type: "array",
      group: "results",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Learning Title", type: "string", description: "e.g., Digital Presence Builds Trust" },
            { name: "desc", title: "Learning Description", type: "text", rows: 2, description: "e.g., Customers increasingly evaluate brands online..." }
          ]
        })
      ]
    }),
    defineField({ 
      name: "quote", 
      title: "Bottom Quote", 
      type: "text",
      group: "results",
      rows: 4,
      description: "The large stylized quote at the very bottom of the page."
    }),
  ],
  
  // This customizes how the document looks in the list view (before you click edit)
  preview: {
    select: {
      title: 'brand',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
});

