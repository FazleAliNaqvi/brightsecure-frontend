import type { Metadata } from 'next';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo';

export const metadata: Metadata = {
  title: 'How Law Firms Can Capture Every Potential Client Call—Even After Hours',
  description: 'Personal injury leads don\'t wait for business hours. Learn how AI receptionists help law firms capture time-sensitive cases and increase consultations by 40%.',
  openGraph: {
    title: 'How Law Firms Can Capture Every Potential Client Call',
    description: 'Learn how AI receptionists help law firms capture time-sensitive cases and increase consultations by 40%.',
    type: 'article',
    publishedTime: '2026-01-10',
    authors: ['Bright Secure'],
    images: [
      {
        url: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Lawyer working at desk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Law Firms Can Capture Every Potential Client Call',
    description: 'Learn how AI receptionists help law firms capture time-sensitive cases.',
  },
  alternates: {
    canonical: '/blog/law-firm-never-miss-client-call',
  },
};

export default function LawFirmArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleSchema
        title="How Law Firms Can Capture Every Potential Client Call—Even After Hours"
        description="Personal injury leads don't wait for business hours. Learn how AI receptionists help law firms capture time-sensitive cases and increase consultations by 40%."
        image="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1200"
        datePublished="2026-01-10"
        url="https://brightsecure.com/blog/law-firm-never-miss-client-call"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://brightsecure.com' },
          { name: 'Blog', url: 'https://brightsecure.com/blog' },
          { name: 'Law Firm Call Capture', url: 'https://brightsecure.com/blog/law-firm-never-miss-client-call' },
        ]}
      />
      {children}
    </>
  );
}
