'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, CheckCircle, LogOut } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';

export default function VerificationRequiredPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    setSending(true);
    try {
      const response = await api.post('/auth/resend-verification/');
      if (response.data.success) {
        setSent(true);
        toast.success('Verification email sent!');
      } else {
        toast.error(response.data.error?.message || 'Failed to send email');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || 'Failed to send email');
    } finally {
      setSending(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return (
    <Card padding="lg" className="animate-fade-in max-w-lg w-full">
      <div className="text-center">
        <div className="h-20 w-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="h-10 w-10 text-amber-500" />
        </div>

        <h1 className="text-2xl font-bold text-dark mb-2">Verify your email to continue</h1>

        <p className="text-light mb-2">
          We sent a verification email to:
        </p>
        <p className="font-medium text-dark mb-6">{user?.email}</p>

        {sent ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Verification email sent!</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Check your inbox and click the verification link.
            </p>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              Click the link in the email to verify your account and access your dashboard.
              If you don't see the email, check your spam folder.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full"
            onClick={handleResend}
            isLoading={sending}
            disabled={sent}
          >
            {sent ? 'Email Sent' : 'Resend Verification Email'}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.reload();
              }
            }}
          >
            I've verified my email
          </Button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <LogOut className="h-4 w-4" />
            Sign out and use a different account
          </button>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Why do I need to verify my email?</h3>
        <ul className="text-sm text-gray-500 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary-500">•</span>
            Secure your account and protect your data
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500">•</span>
            Receive important notifications about your calls
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500">•</span>
            Comply with HIPAA and privacy regulations
          </li>
        </ul>
      </div>
    </Card>
  );
}
