import type { Metadata } from 'next';
import { ServiceSchema } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Pricing - AI Receptionist Plans',
  description: 'Simple, transparent pricing for Bright Secure AI receptionist. Plans starting at $49/month. 14-day free trial, no credit card required. HIPAA compliant.',
  openGraph: {
    title: 'Pricing - Bright Secure AI Receptionist',
    description: 'Simple, transparent pricing. Plans starting at $49/month. 14-day free trial.',
  },
  alternates: {
    canonical: '/pricing',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceSchema />
      {children}
    </>
  );
}
