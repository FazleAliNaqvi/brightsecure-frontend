import type { Metadata } from 'next';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Reducing Patient Hold Times: A Medical Practice\'s Guide to AI-Assisted Call Handling',
  description: 'Patients hate waiting on hold. See how medical practices use AI to handle appointment scheduling, refill requests, and triage—all while staying HIPAA compliant.',
  openGraph: {
    title: 'Reducing Patient Hold Times with AI Call Handling',
    description: 'See how medical practices use AI to handle appointment scheduling, refill requests, and triage—all while staying HIPAA compliant.',
    type: 'article',
    publishedTime: '2026-01-05',
    authors: ['Bright Secure'],
    images: [
      {
        url: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Medical receptionist at front desk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reducing Patient Hold Times with AI Call Handling',
    description: 'How medical practices use AI to handle calls while staying HIPAA compliant.',
  },
  alternates: {
    canonical: '/blog/medical-practice-patient-experience',
  },
};

export default function MedicalArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleSchema
        title="Reducing Patient Hold Times: A Medical Practice's Guide to AI-Assisted Call Handling"
        description="Patients hate waiting on hold. See how medical practices use AI to handle appointment scheduling, refill requests, and triage—all while staying HIPAA compliant."
        image="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1200"
        datePublished="2026-01-05"
        url="https://brightsecure.com/blog/medical-practice-patient-experience"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://brightsecure.com' },
          { name: 'Blog', url: 'https://brightsecure.com/blog' },
          { name: 'Medical Practice Guide', url: 'https://brightsecure.com/blog/medical-practice-patient-experience' },
        ]}
      />
      {children}
    </>
  );
}
