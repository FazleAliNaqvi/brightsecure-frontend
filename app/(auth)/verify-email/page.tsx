'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import api from '@/lib/api';

type VerificationStatus = 'loading' | 'success' | 'error' | 'no-token';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('no-token');
      return;
    }

    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await api.post('/auth/verify-email/', {
        token: verificationToken,
      });

      if (response.data.success) {
        setStatus('success');
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } else {
        setStatus('error');
        setErrorMessage(response.data.error?.message || 'Verification failed');
      }
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(
        error.response?.data?.error?.message || 'Invalid or expired verification link'
      );
    }
  };

  return (
    <Card padding="lg" className="animate-fade-in max-w-md w-full text-center">
      {status === 'loading' && (
        <>
          <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-dark mb-2">Verifying your email</h1>
          <p className="text-light">Please wait while we verify your email address...</p>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-dark mb-2">Email verified!</h1>
          <p className="text-light mb-6">
            Your email has been verified successfully. You will be redirected to your dashboard shortly.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="w-full">
              Go to Dashboard
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-dark mb-2">Verification failed</h1>
          <p className="text-light mb-6">{errorMessage}</p>
          <div className="space-y-3">
            <Link href="/login">
              <Button size="lg" className="w-full">
                Go to Login
              </Button>
            </Link>
            <p className="text-sm text-light">
              Need a new verification link?{' '}
              <Link href="/resend-verification" className="text-primary-500 hover:underline">
                Resend verification email
              </Link>
            </p>
          </div>
        </>
      )}

      {status === 'no-token' && (
        <>
          <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold text-dark mb-2">Check your email</h1>
          <p className="text-light mb-6">
            We've sent a verification link to your email address. Click the link in the email to verify your account.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              Didn't receive the email? Check your spam folder or request a new verification link.
            </p>
          </div>
          <div className="space-y-3">
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full">
                Back to Login
              </Button>
            </Link>
          </div>
        </>
      )}
    </Card>
  );
}

function LoadingFallback() {
  return (
    <Card padding="lg" className="animate-fade-in max-w-md w-full text-center">
      <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
      </div>
      <h1 className="text-2xl font-bold text-dark mb-2">Loading...</h1>
      <p className="text-light">Please wait...</p>
    </Card>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
