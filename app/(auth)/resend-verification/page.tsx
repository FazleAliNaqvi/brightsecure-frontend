'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';

export default function ResendVerificationPage() {
  const { user, isAuthenticated } = useAuth();
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

  if (!isAuthenticated) {
    return (
      <Card padding="lg" className="animate-fade-in max-w-md w-full text-center">
        <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="h-8 w-8 text-primary-500" />
        </div>
        <h1 className="text-2xl font-bold text-dark mb-2">Login required</h1>
        <p className="text-light mb-6">
          Please login to resend your verification email.
        </p>
        <Link href="/login">
          <Button size="lg" className="w-full">
            Go to Login
          </Button>
        </Link>
      </Card>
    );
  }

  if (sent) {
    return (
      <Card padding="lg" className="animate-fade-in max-w-md w-full text-center">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-dark mb-2">Email sent!</h1>
        <p className="text-light mb-6">
          We've sent a new verification link to <strong>{user?.email}</strong>. Please check your inbox.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            Remember to check your spam folder if you don't see the email in your inbox.
          </p>
        </div>
        <Link href="/login">
          <Button variant="outline" size="lg" className="w-full">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Login
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card padding="lg" className="animate-fade-in max-w-md w-full text-center">
      <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail className="h-8 w-8 text-primary-500" />
      </div>
      <h1 className="text-2xl font-bold text-dark mb-2">Resend verification email</h1>
      <p className="text-light mb-6">
        Click below to send a new verification link to <strong>{user?.email}</strong>.
      </p>
      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full"
          onClick={handleResend}
          isLoading={sending}
        >
          Send Verification Email
        </Button>
        <Link href="/login">
          <Button variant="outline" size="lg" className="w-full">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Login
          </Button>
        </Link>
      </div>
    </Card>
  );
}
