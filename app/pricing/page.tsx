'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  Check,
  Phone,
  Shield,
  Calendar,
  Mail,
  Users,
  Headphones,
  Zap,
  BarChart3,
  Clock,
  Globe,
  ArrowRight,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Currency = 'CAD' | 'USD' | 'EUR';

interface CurrencyConfig {
  symbol: string;
  label: string;
  flag: string;
}

const currencies: Record<Currency, CurrencyConfig> = {
  CAD: { symbol: 'CAD', label: 'CAD $', flag: '🇨🇦' },
  USD: { symbol: 'USD', label: 'US $', flag: '🇺🇸' },
  EUR: { symbol: 'EUR', label: '€', flag: '🇪🇺' },
};

// Base prices in CAD
const basePricesCAD = {
  Business: 79,
  Pro: 189,
  Enterprise: 599,
};

// Converted prices with markup ending in 9
const pricesByCurrency: Record<Currency, Record<string, number>> = {
  CAD: {
    Business: 79,
    Pro: 189,
    Enterprise: 599,
  },
  USD: {
    Business: 59,
    Pro: 149,
    Enterprise: 449,
  },
  EUR: {
    Business: 59,
    Pro: 139,
    Enterprise: 419,
  },
};

// Overage rates per minute by currency
const overageRates: Record<Currency, number> = {
  CAD: 0.10,
  USD: 0.10,
  EUR: 0.09,
};

// Minutes included per tier
const minutesByTier: Record<string, number> = {
  Business: 250,
  Pro: 750,
  Enterprise: 2500,
};

interface PricingTier {
  name: string;
  price: number;
  description: string;
  lines: number;
  popular?: boolean;
  features: {
    text: string;
    included: boolean;
    highlight?: boolean;
  }[];
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Business',
    price: 79,
    description: 'Perfect for solo practitioners and small offices',
    lines: 1,
    features: [
      { text: '1 AI phone line', included: true, highlight: true },
      { text: 'Unlimited inbound calls', included: true },
      { text: '250 AI minutes/month', included: true },
      { text: 'HIPAA-compliant encrypted email', included: true },
      { text: 'Smart appointment booking', included: true },
      { text: 'Business hours configuration', included: true },
      { text: 'Call transcripts & recordings', included: true },
      { text: 'Email confirmations & reminders', included: true },
      { text: '2 team members', included: true },
      { text: 'Standard voice options (3)', included: true },
      { text: 'Email support', included: true },
      { text: 'Custom greeting script', included: false },
      { text: 'Priority support', included: false },
      { text: 'API access', included: false },
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Pro',
    price: 189,
    description: 'Ideal for growing practices with multiple staff',
    lines: 2,
    popular: true,
    features: [
      { text: '2 AI phone lines', included: true, highlight: true },
      { text: 'Unlimited inbound calls', included: true },
      { text: '750 AI minutes/month', included: true },
      { text: 'HIPAA-compliant encrypted email', included: true },
      { text: 'Smart appointment booking', included: true },
      { text: 'Business hours configuration', included: true },
      { text: 'Call transcripts & recordings', included: true },
      { text: 'Email & SMS confirmations', included: true },
      { text: '10 team members', included: true },
      { text: 'All voice options (6)', included: true },
      { text: 'Custom greeting script', included: true },
      { text: 'Priority email & chat support', included: true },
      { text: 'Advanced analytics dashboard', included: true },
      { text: 'API access', included: false },
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 599,
    description: 'For large practices and multi-location clinics',
    lines: 10,
    features: [
      { text: '10 AI phone lines', included: true, highlight: true },
      { text: 'Unlimited inbound calls', included: true },
      { text: '2,500 AI minutes/month', included: true },
      { text: 'HIPAA-compliant encrypted email', included: true },
      { text: 'Smart appointment booking', included: true },
      { text: 'Multi-location support', included: true },
      { text: 'Call transcripts & recordings', included: true },
      { text: 'Email & SMS confirmations', included: true },
      { text: 'Unlimited team members', included: true },
      { text: 'All voice options + custom voice', included: true },
      { text: 'Custom greeting & call flows', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Advanced analytics & reporting', included: true },
      { text: 'Full API access & webhooks', included: true },
    ],
    cta: 'Contact Sales',
  },
];

const faqs = [
  {
    question: 'What counts as an AI minute?',
    answer: 'AI minutes are counted when our AI receptionist is actively handling a call. This includes greeting callers, answering questions, and booking appointments. Hold time and transfers are not counted.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, changes take effect at the next billing cycle.',
  },
  {
    question: 'Is there a contract or commitment?',
    answer: 'No long-term contracts. All plans are billed monthly and you can cancel anytime. We also offer annual billing with 2 months free.',
  },
  {
    question: 'What happens if I exceed my AI minutes?',
    answer: 'We\'ll notify you when you reach 80% of your limit. Additional minutes are billed at $0.10/minute (CAD/USD) or €0.09/minute (EUR). You can also upgrade your plan for more included minutes.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes! All plans come with a 14-day free trial. No credit card required to start. You\'ll get full access to all features in your chosen plan.',
  },
  {
    question: 'Is the service really HIPAA compliant?',
    answer: 'Absolutely. We sign a Business Associate Agreement (BAA) with all customers. Our infrastructure is SOC 2 Type II certified and all data is encrypted at rest and in transit.',
  },
];

export default function PricingPage() {
  const [currency, setCurrency] = useState<Currency>('CAD');

  const getPrice = (tierName: string) => {
    return pricesByCurrency[currency][tierName] || 0;
  };

  const getCurrencySymbol = () => {
    return currency === 'EUR' ? '€' : '$';
  };

  const getCurrencyLabel = () => {
    return currency === 'EUR' ? '' : currency;
  };

  const getOverageRate = () => {
    return overageRates[currency];
  };

  const formatOverageRate = () => {
    const rate = getOverageRate();
    if (currency === 'EUR') {
      return `€${rate.toFixed(2)}`;
    }
    return `${currency} $${rate.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-500">Bright Secure</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/#features" className="text-dark hover:text-primary-500 transition-colors">Features</Link>
              <Link href="/pricing" className="text-primary-500 font-medium">Pricing</Link>
              <Link href="/industries" className="text-dark hover:text-primary-500 transition-colors">Industries</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-xl text-light max-w-2xl mx-auto">
            Choose the plan that fits your practice. All plans include HIPAA-compliant
            features and a 14-day free trial.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-secondary-50 text-secondary-700 px-4 py-2 rounded-full text-sm font-medium">
            <Zap className="h-4 w-4" />
            Save 17% with annual billing (2 months free)
          </div>

          {/* Currency Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
              {(Object.keys(currencies) as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                    currency === curr
                      ? 'bg-white text-dark shadow-sm'
                      : 'text-light hover:text-dark'
                  )}
                >
                  <span>{currencies[curr].flag}</span>
                  <span>{currencies[curr].label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  'relative bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-airbnb-hover',
                  tier.popular
                    ? 'border-primary-500 shadow-airbnb-hover scale-[1.02]'
                    : 'border-gray-200 shadow-airbnb hover:border-gray-300'
                )}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1 bg-primary-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                      <Star className="h-4 w-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="text-center pb-8 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-dark">{tier.name}</h3>
                    <p className="mt-2 text-sm text-light h-10">{tier.description}</p>

                    <div className="mt-6">
                      <div className="flex items-baseline justify-center gap-1">
                        {currency !== 'EUR' && (
                          <span className="text-lg text-light">{currency}</span>
                        )}
                        <span className="text-5xl font-bold text-dark">
                          {getCurrencySymbol()}{getPrice(tier.name)}
                        </span>
                        <span className="text-light">/mo</span>
                      </div>
                      <p className="mt-2 text-sm text-light">
                        billed monthly
                      </p>
                      <p className="mt-1 text-xs text-light">
                        Overage: {formatOverageRate()}/min
                      </p>
                    </div>

                    {/* Lines Badge */}
                    <div className="mt-4 inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                      <Phone className="h-4 w-4 text-primary-500" />
                      <span className="font-medium text-dark">
                        {tier.lines} {tier.lines === 1 ? 'Phone Line' : 'Phone Lines'}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="py-8">
                    <ul className="space-y-4">
                      {tier.features.map((feature, index) => (
                        <li
                          key={index}
                          className={cn(
                            'flex items-start gap-3',
                            !feature.included && 'opacity-50'
                          )}
                        >
                          <div
                            className={cn(
                              'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5',
                              feature.included
                                ? feature.highlight
                                  ? 'bg-primary-500'
                                  : 'bg-secondary-500'
                                : 'bg-gray-300'
                            )}
                          >
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span
                            className={cn(
                              'text-sm',
                              feature.included ? 'text-dark' : 'text-light line-through',
                              feature.highlight && 'font-semibold'
                            )}
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <Link href={tier.name === 'Enterprise' ? '/contact' : '/register'}>
                      <Button
                        variant={tier.popular ? 'primary' : 'secondary'}
                        size="lg"
                        className="w-full"
                      >
                        {tier.cta}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    {tier.name !== 'Enterprise' && (
                      <p className="mt-3 text-center text-xs text-light">
                        14-day free trial • No credit card required
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark">All plans include</h2>
            <p className="mt-4 text-light">Essential features for every practice</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="font-semibold text-dark mb-2">HIPAA Compliant</h3>
              <p className="text-sm text-light">
                Full HIPAA, PIPEDA & PHIPA compliance with BAA included
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-secondary-500" />
              </div>
              <h3 className="font-semibold text-dark mb-2">Encrypted Email</h3>
              <p className="text-sm text-light">
                Paubox-powered encrypted emails for all confirmations
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-dark mb-2">Smart Scheduling</h3>
              <p className="text-sm text-light">
                Built-in calendar with availability management
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="font-semibold text-dark mb-2">24/7 Availability</h3>
              <p className="text-sm text-light">
                AI receptionist answers calls around the clock
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-dark mb-2">Call Recording</h3>
              <p className="text-sm text-light">
                Automatic recording and transcription of all calls
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-dark mb-2">Team Management</h3>
              <p className="text-sm text-light">
                Add team members with role-based permissions
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="font-semibold text-dark mb-2">Analytics</h3>
              <p className="text-sm text-light">
                Track call volume, booking rates, and performance
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-cyan-500" />
              </div>
              <h3 className="font-semibold text-dark mb-2">Canadian Numbers</h3>
              <p className="text-sm text-light">
                Local Canadian phone numbers in any area code
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark">Frequently asked questions</h2>
            <p className="mt-4 text-light">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-surface rounded-xl p-6"
              >
                <h3 className="font-semibold text-dark mb-2">{faq.question}</h3>
                <p className="text-light">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-dark hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="text-primary-500 font-bold text-xl">Bright Secure</Link>
            <div className="flex gap-6 text-sm text-light">
              <Link href="/privacy" className="hover:text-dark">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-dark">Terms of Service</Link>
              <Link href="/privacy#healthcare-compliance" className="hover:text-dark">HIPAA Notice</Link>
              <a href="mailto:support@brightsecure.com" className="hover:text-dark">Contact</a>
            </div>
            <div className="text-sm text-light">
              © {new Date().getFullYear()} Bright Secure. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
