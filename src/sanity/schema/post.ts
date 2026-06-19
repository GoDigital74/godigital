import { defineType, defineField, defineArrayMember } from "sanity";

export const postSchema = defineType({
  name: "post",
  title: "Insights (Blog Posts)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Name of the article author",
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g., '7 min read'",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Growth Strategy",
          "Performance",
          "E-commerce",
          "Branding",
          "SEO",
          "Paid Media",
          "Analytics",
          "Content",
          "Leadership"
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ 
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alternative Text" }]
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});