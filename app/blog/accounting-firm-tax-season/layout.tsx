import type { Metadata } from 'next';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Surviving Tax Season: How AI Receptionists Help Accounting Firms Handle 10x Call Volume',
  description: 'Tax season means phone lines ringing off the hook. Discover how AI support helps your receptionist manage the surge without hiring temporary staff.',
  openGraph: {
    title: 'How AI Receptionists Help Accounting Firms Handle Tax Season',
    description: 'Discover how AI support helps your receptionist manage the surge without hiring temporary staff.',
    type: 'article',
    publishedTime: '2026-01-08',
    authors: ['Bright Secure'],
    images: [
      {
        url: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Accountant working with calculator and documents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How AI Receptionists Help Accounting Firms Handle Tax Season',
    description: 'Discover how AI support helps manage tax season call surges.',
  },
  alternates: {
    canonical: '/blog/accounting-firm-tax-season',
  },
};

export default function AccountingArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleSchema
        title="Surviving Tax Season: How AI Receptionists Help Accounting Firms Handle 10x Call Volume"
        description="Tax season means phone lines ringing off the hook. Discover how AI support helps your receptionist manage the surge without hiring temporary staff."
        image="https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1200"
        datePublished="2026-01-08"
        url="https://brightsecure.com/blog/accounting-firm-tax-season"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://brightsecure.com' },
          { name: 'Blog', url: 'https://brightsecure.com/blog' },
          { name: 'Accounting Tax Season', url: 'https://brightsecure.com/blog/accounting-firm-tax-season' },
        ]}
      />
      {children}
    </>
  );
}
