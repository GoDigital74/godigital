import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'; // Import your Sanity Client

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://godigitalagency.in'

  // 1. Fetch dynamic routes from Sanity
  // Adjust the _type to match whatever you named your blog schema (e.g., "post", "insight")
  const query = `
    {
      "projects": *[_type == "project"] { "slug": slug.current },
      "insights": *[_type == "insight"] { "slug": slug.current } 
    }
  `;
  const { projects, insights } = await client.fetch(query);

  const projectRoutes = projects.map((project: any) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const insightRoutes = insights.map((post: any) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  // 2. Define static routes (Added your new nested solution pages!)
  const staticPaths = [
    '', 
    '/about', 
    '/work', 
    '/solutions', 
    '/solutions/growth-systems',
    '/solutions/commerce-systems',
    '/solutions/brand-systems',
    '/insights', 
    '/careers', 
    '/contact'
  ];

  const staticRoutes = staticPaths.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    priority: route === '' ? 1 : 0.8,
  }));

  // 3. Combine static and dynamic routes
  return [
    ...staticRoutes,
    ...projectRoutes,
    ...insightRoutes,
  ]
}
