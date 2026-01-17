'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Phone,
  Clock,
  Users,
  Zap,
  Shield,
  Star,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Plan {
  id: string;
  name: string;
  price: number;
  lines: number;
  minutes: number;
  team_members: number | 'unlimited';
  features: string[];
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'business',
    name: 'Business',
    price: 79,
    lines: 1,
    minutes: 250,
    team_members: 2,
    features: [
      '1 AI phone line',
      '250 AI minutes/month',
      '2 team members',
      'Standard voice options',
      'Email support',
      'Basic analytics',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 189,
    lines: 2,
    minutes: 750,
    team_members: 10,
    popular: true,
    features: [
      '2 AI phone lines',
      '750 AI minutes/month',
      '10 team members',
      'All voice options',
      'Custom greeting script',
      'Priority support',
      'Advanced analytics',
      'SMS notifications',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 599,
    lines: 10,
    minutes: 2500,
    team_members: 'unlimited',
    features: [
      '10 AI phone lines',
      '2,500 AI minutes/month',
      'Unlimited team members',
      'Custom voice option',
      'Custom call flows',
      'Dedicated account manager',
      'Full API access',
      'Multi-location support',
      'Advanced reporting',
    ],
  },
];

export default function UpgradePlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  const fetchCurrentPlan = async () => {
    setLoading(true);
    try {
      const response = await api.get('/billing/subscription/');
      if (response.data.success) {
        const planId = response.data.data?.plan?.toLowerCase() || 'business';
        setCurrentPlan(planId);
      }
    } catch (err) {
      // Default to business if can't fetch
      setCurrentPlan('business');
    } finally {
      setLoading(false);
    }
  };

  const getPlanIndex = (planId: string) => {
    return PLANS.findIndex((p) => p.id === planId);
  };

  const canUpgrade = (planId: string) => {
    if (!currentPlan) return false;
    return getPlanIndex(planId) > getPlanIndex(currentPlan);
  };

  const isCurrentPlan = (planId: string) => {
    return currentPlan === planId;
  };

  const isDowngrade = (planId: string) => {
    if (!currentPlan) return false;
    return getPlanIndex(planId) < getPlanIndex(currentPlan);
  };

  const handleUpgrade = async (planId: string) => {
    if (!canUpgrade(planId)) return;

    setUpgrading(true);
    setSelectedPlan(planId);

    try {
      const response = await api.post('/billing/upgrade/', {
        plan: planId,
      });

      if (response.data.success) {
        toast.success(`Successfully upgraded to ${planId.charAt(0).toUpperCase() + planId.slice(1)}!`);
        router.push('/billing');
      } else {
        toast.error(response.data.error?.message || 'Upgrade failed');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || 'Failed to upgrade plan');
    } finally {
      setUpgrading(false);
      setSelectedPlan(null);
    }
  };

  const getPriceDifference = (planId: string) => {
    if (!currentPlan) return 0;
    const currentPrice = PLANS.find((p) => p.id === currentPlan)?.price || 0;
    const newPrice = PLANS.find((p) => p.id === planId)?.price || 0;
    return newPrice - currentPrice;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/billing">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Billing
          </Button>
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Upgrade Your Plan</h1>
        <p className="mt-2 text-gray-600">
          Get more phone lines, AI minutes, and features by upgrading your plan.
        </p>
      </div>

      {/* Current Plan Indicator */}
      {currentPlan && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
            <Shield className="h-4 w-4" />
            Current Plan: {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
          </div>
        </div>
      )}

      {/* Plan Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PLANS.map((plan) => {
          const isCurrent = isCurrentPlan(plan.id);
          const canUpgradeTo = canUpgrade(plan.id);
          const isDowngradeTo = isDowngrade(plan.id);
          const priceDiff = getPriceDifference(plan.id);

          return (
            <Card
              key={plan.id}
              className={cn(
                'relative transition-all',
                plan.popular && 'ring-2 ring-primary-500',
                isCurrent && 'bg-gray-50'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary-500 text-white">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="secondary">
                    <Check className="h-3 w-3 mr-1" />
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardContent className="pt-8 pb-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500">/mo</span>
                  </div>
                  {canUpgradeTo && priceDiff > 0 && (
                    <p className="mt-1 text-sm text-primary-600">
                      +${priceDiff}/mo from current
                    </p>
                  )}
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Phone className="h-4 w-4 mx-auto text-gray-400 mb-1" />
                    <div className="text-sm font-semibold">{plan.lines}</div>
                    <div className="text-xs text-gray-500">Lines</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Clock className="h-4 w-4 mx-auto text-gray-400 mb-1" />
                    <div className="text-sm font-semibold">{plan.minutes}</div>
                    <div className="text-xs text-gray-500">Minutes</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Users className="h-4 w-4 mx-auto text-gray-400 mb-1" />
                    <div className="text-sm font-semibold">
                      {plan.team_members === 'unlimited' ? '∞' : plan.team_members}
                    </div>
                    <div className="text-xs text-gray-500">Team</div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-secondary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                {isCurrent ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : canUpgradeTo ? (
                  <Button
                    className="w-full"
                    onClick={() => handleUpgrade(plan.id)}
                    isLoading={upgrading && selectedPlan === plan.id}
                    disabled={upgrading}
                  >
                    Upgrade to {plan.name}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    {isDowngradeTo ? 'Downgrade not available' : 'Not available'}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">How upgrades work</h4>
              <ul className="mt-2 text-sm text-blue-700 space-y-1">
                <li>• Upgrades take effect immediately</li>
                <li>• You'll be charged the prorated difference for this billing period</li>
                <li>• Your new features and limits are available right away</li>
                <li>• All your existing data and settings are preserved</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Contact */}
      {currentPlan === 'enterprise' && (
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600">
            Need even more? Contact us for custom enterprise solutions.
          </p>
          <Link href="/contact">
            <Button variant="outline" className="mt-4">
              Contact Sales
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
