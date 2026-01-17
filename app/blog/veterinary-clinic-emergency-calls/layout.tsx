import type { Metadata } from 'next';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo';

export const metadata: Metadata = {
  title: 'After-Hours Pet Emergencies: How Veterinary Clinics Provide 24/7 Support Without Burnout',
  description: 'Pet emergencies don\'t wait for office hours. Learn how veterinary clinics use AI to triage urgent calls and capture every appointment opportunity.',
  openGraph: {
    title: 'How Veterinary Clinics Provide 24/7 Support Without Burnout',
    description: 'Learn how veterinary clinics use AI to triage urgent calls and capture every appointment opportunity.',
    type: 'article',
    publishedTime: '2026-01-03',
    authors: ['Bright Secure'],
    images: [
      {
        url: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Veterinarian examining a dog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Veterinary Clinics Provide 24/7 Support Without Burnout',
    description: 'Learn how veterinary clinics use AI to handle after-hours pet emergencies.',
  },
  alternates: {
    canonical: '/blog/veterinary-clinic-emergency-calls',
  },
};

export default function VeterinaryArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleSchema
        title="After-Hours Pet Emergencies: How Veterinary Clinics Provide 24/7 Support Without Burnout"
        description="Pet emergencies don't wait for office hours. Learn how veterinary clinics use AI to triage urgent calls and capture every appointment opportunity."
        image="https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=1200"
        datePublished="2026-01-03"
        url="https://brightsecure.com/blog/veterinary-clinic-emergency-calls"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://brightsecure.com' },
          { name: 'Blog', url: 'https://brightsecure.com/blog' },
          { name: 'Veterinary 24/7 Support', url: 'https://brightsecure.com/blog/veterinary-clinic-emergency-calls' },
        ]}
      />
      {children}
    </>
  );
}
