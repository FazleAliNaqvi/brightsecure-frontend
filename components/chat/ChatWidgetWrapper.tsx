'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const ChatWidget = dynamic(() => import('./ChatWidget'), {
  ssr: false,
});

// Pages where the chat widget should not appear
const excludedPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/verification-required',
  '/dashboard',
  '/calendar',
  '/calls',
  '/settings',
  '/billing',
  '/phone-lines',
  '/call-history',
];

export default function ChatWidgetWrapper() {
  const pathname = usePathname();

  // Don't show on excluded paths or dashboard routes
  const shouldHide = excludedPaths.some(path => pathname?.startsWith(path));

  if (shouldHide) {
    return null;
  }

  return <ChatWidget />;
}
