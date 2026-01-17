import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brightsecure.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Industry pages
  const industries = [
    'legal',
    'medical',
    'dental',
    'accounting',
    'financial',
    'chiropractic',
    'therapy',
    'veterinary',
    'real-estate',
  ];

  const industryPages = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog articles
  const blogArticles = [
    {
      slug: 'why-use-ai-receptionist',
      date: '2026-01-13',
      priority: 0.8, // Higher priority for comprehensive guide
    },
    {
      slug: 'law-firm-never-miss-client-call',
      date: '2026-01-10',
    },
    {
      slug: 'accounting-firm-tax-season',
      date: '2026-01-08',
    },
    {
      slug: 'medical-practice-patient-experience',
      date: '2026-01-05',
    },
    {
      slug: 'veterinary-clinic-emergency-calls',
      date: '2026-01-03',
    },
  ];

  const blogPages = blogArticles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: (article as any).priority || 0.6,
  }));

  return [...staticPages, ...industryPages, ...blogPages];
}
