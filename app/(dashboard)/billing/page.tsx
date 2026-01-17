'use client';

import { CreditCard, Zap, Phone, Clock, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';

export default function BillingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Usage</h1>
        <p className="text-gray-600 mt-1">Monitor your usage and manage billing</p>
      </div>

      {/* Current Plan Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="text-xl font-bold text-gray-900">Trial</p>
                <p className="text-sm text-gray-500">14-day free trial</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Required */}
      <Card>
        <CardContent className="py-12">
          <div className="text-center max-w-md mx-auto">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Billing Not Set Up Yet
            </h3>
            <p className="text-gray-600 mb-6">
              You're currently on a free trial. Once billing is configured, you'll be able to:
            </p>
            <ul className="text-left text-gray-600 space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-500" />
                <span>Get a dedicated AI phone number</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary-500" />
                <span>Track call minutes and usage</span>
              </li>
              <li className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-primary-500" />
                <span>View invoices and manage payments</span>
              </li>
            </ul>
            <Button disabled>
              <CreditCard className="h-4 w-4 mr-2" />
              Coming Soon
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Basic */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">Basic</h4>
              <p className="text-2xl font-bold text-gray-900 mt-2">$99<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• 1 phone line</li>
                <li>• 250 minutes included</li>
                <li>• Basic analytics</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="border-2 border-primary-500 rounded-lg p-4 relative">
              <span className="absolute -top-3 left-4 bg-primary-500 text-white text-xs px-2 py-1 rounded">Popular</span>
              <h4 className="font-semibold text-gray-900">Pro</h4>
              <p className="text-2xl font-bold text-gray-900 mt-2">$189<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• 2 phone lines</li>
                <li>• 750 minutes included</li>
                <li>• Advanced analytics</li>
                <li>• Priority support</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">Enterprise</h4>
              <p className="text-2xl font-bold text-gray-900 mt-2">Custom</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Unlimited phone lines</li>
                <li>• Custom minutes</li>
                <li>• Dedicated support</li>
                <li>• SLA guarantee</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
