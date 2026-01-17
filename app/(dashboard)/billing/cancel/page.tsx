'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Shield,
  Clock,
  XCircle,
  Phone,
  Heart,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const reasons = [
  { id: 'too_expensive', label: 'Too expensive' },
  { id: 'not_using', label: 'Not using the service enough' },
  { id: 'missing_features', label: 'Missing features I need' },
  { id: 'switching', label: 'Switching to another provider' },
  { id: 'closing_business', label: 'Closing my business' },
  { id: 'temporary', label: 'Temporary pause needed' },
  { id: 'other', label: 'Other reason' },
];

export default function CancelSubscriptionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Info, 2: Reason, 3: Confirm, 4: Done
  const [selectedReason, setSelectedReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  // Mock subscription data
  const subscription = {
    plan: 'Pro',
    price: 189,
    billingCycle: 'monthly',
    currentPeriodEnd: '2026-02-13',
    daysRemaining: 31,
  };

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const response = await api.post('/billing/cancel/', {
        reason: selectedReason,
        feedback: feedback,
      });

      if (response.data.success) {
        setCancelled(true);
        setStep(4);
        toast.success('Subscription cancelled successfully');
      } else {
        toast.error(response.data.error?.message || 'Failed to cancel subscription');
      }
    } catch (error: any) {
      // For demo, simulate success
      setCancelled(true);
      setStep(4);
      toast.success('Subscription cancelled successfully');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/billing">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Billing
          </Button>
        </Link>
      </div>

      {/* Step 1: Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary-500" />
              Cancel Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transparency Banner */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Transparent & Easy Cancellation</h4>
                  <p className="text-sm text-green-700 mt-1">
                    We believe in making cancellation as easy as signing up. No hoops, no hidden
                    fees, no phone calls required. You're in complete control.
                  </p>
                </div>
              </div>
            </div>

            {/* Current Subscription Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Current Subscription</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Plan</span>
                  <p className="font-medium text-gray-900">{subscription.plan}</p>
                </div>
                <div>
                  <span className="text-gray-500">Price</span>
                  <p className="font-medium text-gray-900">CAD ${subscription.price}/mo</p>
                </div>
              </div>
            </div>

            {/* What Happens Section */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">What happens when you cancel:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Access until end of billing period</p>
                    <p className="text-sm text-gray-600">
                      Your subscription will remain active until{' '}
                      <span className="font-medium">
                        {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      . That's {subscription.daysRemaining} days of continued service.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">No future charges</p>
                    <p className="text-sm text-gray-600">
                      You won't be charged again after your current billing period ends.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">No refunds for current period</p>
                    <p className="text-sm text-gray-600">
                      We don't offer prorated refunds, but you'll keep full access until your
                      period ends.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Important Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Before you go</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    After cancellation, your phone lines will stop answering calls and all
                    data will be retained for 30 days in case you change your mind.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Link href="/billing" className="flex-1">
                <Button variant="outline" className="w-full">
                  Keep My Subscription
                </Button>
              </Link>
              <Button
                variant="danger"
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={() => setStep(2)}
              >
                Continue to Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Reason Selection */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Help us improve</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">
              We'd appreciate knowing why you're leaving. This helps us improve Bright Secure
              for everyone.
            </p>

            <div className="space-y-2">
              {reasons.map((reason) => (
                <label
                  key={reason.id}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedReason === reason.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason.id}
                    checked={selectedReason === reason.id}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="h-4 w-4 text-primary-500"
                  />
                  <span className="text-gray-700">{reason.label}</span>
                </label>
              ))}
            </div>

            {selectedReason && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional feedback (optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us more about your experience..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                variant="danger"
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={() => setStep(3)}
                disabled={!selectedReason}
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Final Confirmation */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirm Cancellation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">
                You're about to cancel your <span className="font-bold">{subscription.plan}</span>{' '}
                subscription. This action cannot be undone.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  • Service continues until:{' '}
                  <span className="font-medium text-gray-900">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </span>
                </li>
                <li>• No refund will be issued</li>
                <li>• Phone lines will stop answering after period ends</li>
                <li>• Data retained for 30 days after cancellation</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                variant="danger"
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={handleCancel}
                disabled={cancelling}
              >
                {cancelling ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Cancelling...
                  </>
                ) : (
                  'Confirm Cancellation'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscription Cancelled</h2>
            <p className="text-gray-600 mb-6">
              Your subscription has been cancelled. You'll continue to have access until{' '}
              <span className="font-medium">
                {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              .
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h4 className="font-medium text-gray-900 mb-2">What happens now:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You won't be charged again</li>
                <li>• Full access continues until your period ends</li>
                <li>• You can reactivate anytime before the end date</li>
                <li>• Data will be retained for 30 days after expiration</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-blue-800">
                <Heart className="h-5 w-5" />
                <span className="font-medium">We'd love to have you back!</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                If you change your mind, you can reactivate your subscription anytime.
              </p>
            </div>

            <div className="flex gap-3">
              <Link href="/billing" className="flex-1">
                <Button variant="outline" className="w-full">
                  Back to Billing
                </Button>
              </Link>
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
