import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/read'] }],
    sitemap: 'https://pranavnair.co/sitemap.xml',
  };
}
