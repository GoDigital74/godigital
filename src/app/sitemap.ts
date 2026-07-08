import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://godigitalagency.in'

  // 1. Fetch dynamic routes AND their actual last updated timestamps
  // FIXED: Changed "insight" back to "post" to match your actual Sanity schema
  const query = `
    {
      "projects": *[_type == "project"] { "slug": slug.current, "_updatedAt": _updatedAt },
      "insights": *[_type == "post"] { "slug": slug.current, "_updatedAt": _updatedAt } 
    }
  `;
  const { projects, insights } = await client.fetch(query);

  const projectRoutes = projects.map((project: { slug: string, _updatedAt: string }) => ({
    url: `${baseUrl}/work/${project.slug}`,
    // Now using the REAL updated date from Sanity
    lastModified: new Date(project._updatedAt), 
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const insightRoutes = insights.map((post: { slug: string, _updatedAt: string }) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 2. Define static routes
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
    // Homepage gets checked more often than standard static pages
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 3. Combine static and dynamic routes
  return [
    ...staticRoutes,
    ...projectRoutes,
    ...insightRoutes,
  ]
}