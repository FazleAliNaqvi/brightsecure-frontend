import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ChatWidgetWrapper } from '@/components/chat';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brightsecure.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF5A5F',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bright Secure - AI Receptionist for Healthcare & Professional Services',
    template: '%s | Bright Secure',
  },
  description: 'HIPAA-compliant AI receptionist with encrypted email. Never miss a call again. 24/7 call answering, appointment booking, and secure transcripts for medical practices, law firms, and professional services.',
  keywords: [
    'AI receptionist',
    'HIPAA compliant',
    'encrypted email',
    'appointment booking',
    'healthcare',
    'virtual receptionist',
    'medical practice phone',
    'law firm answering service',
    'after hours call handling',
    'PIPEDA compliant',
    'automated receptionist',
  ],
  authors: [{ name: 'Bright Secure' }],
  creator: 'Bright Secure',
  publisher: 'Bright Secure',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Bright Secure',
    title: 'Bright Secure - AI Receptionist for Healthcare & Professional Services',
    description: 'HIPAA-compliant AI receptionist with encrypted email. Never miss a call again. 24/7 call answering, appointment booking, and secure transcripts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bright Secure - AI Receptionist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bright Secure - AI Receptionist for Healthcare & Professional Services',
    description: 'HIPAA-compliant AI receptionist with encrypted email. Never miss a call again.',
    images: ['/og-image.png'],
    creator: '@brightsecure',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white">
        <Providers>
          {children}
          <ChatWidgetWrapper />
        </Providers>
      </body>
    </html>
  );
}
