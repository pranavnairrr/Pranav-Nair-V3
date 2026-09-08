import type { MetadataRoute } from 'next';
import { getPublicPosts } from '@/lib/posts';
import { experience } from '@/lib/experience';

const BASE = 'https://pranavnair.co';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublicPosts();

  return [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/notes`, changeFrequency: 'daily', priority: 0.6 },
    { url: `${BASE}/work`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/podcast`, changeFrequency: 'monthly', priority: 0.5 },
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...experience.map((e) => ({
      url: `${BASE}/work/${e.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    })),
  ];
}
