'use client';

import Link from 'next/link';
import {
  TrendingUp,
  Phone,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Calendar,
  FileText,
  Users,
  DollarSign,
  Star,
  MessageSquare,
  Lock,
  BarChart3,
  PiggyBank,
  Target,
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';

const benefits = [
  {
    icon: Phone,
    title: 'Capture Every Opportunity',
    description: 'High-net-worth prospects expect immediate response. Our AI answers instantly, 24/7, qualifying leads while you focus on client portfolios.',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Book portfolio reviews, retirement planning sessions, and strategy meetings based on advisor availability and client preferences.',
  },
  {
    icon: Lock,
    title: 'SEC/FINRA Compliant',
    description: 'Secure, compliant call handling with full audit trails. Encrypted communications protect sensitive financial discussions.',
  },
  {
    icon: Users,
    title: 'Client Qualification',
    description: 'Screen prospects based on assets under management, investment goals, and timeline to match with the right advisor.',
  },
  {
    icon: BarChart3,
    title: 'Market Hour Support',
    description: 'Handle urgent client calls during market volatility while advisors focus on critical portfolio decisions.',
  },
  {
    icon: Target,
    title: 'Lead Nurturing',
    description: 'Follow up with prospects who attended seminars, webinars, or downloaded resources to schedule consultations.',
  },
];

const useCases = [
  {
    title: 'Wealth Management',
    description: 'Professional intake for high-net-worth clients, portfolio review scheduling, and market update inquiries.',
    stats: 'Average client AUM: $500K+',
  },
  {
    title: 'Retirement Planning',
    description: 'Capture 401(k) rollover opportunities, schedule retirement readiness reviews, and handle pension questions.',
    stats: '45% of calls are retirement-related',
  },
  {
    title: 'Insurance & Annuities',
    description: 'Qualify prospects for life insurance, annuity products, and long-term care planning.',
    stats: 'Improve conversion by 35%',
  },
  {
    title: 'Independent RIAs',
    description: 'Scale your practice without adding staff. Handle compliance-sensitive communications professionally.',
    stats: 'Focus on AUM growth, not admin',
  },
];

const features = [
  'SEC/FINRA compliant recording',
  'AUM qualification questions',
  'Advisor matching & routing',
  'Market volatility responses',
  'Seminar/webinar follow-up',
  'Account service requests',
  'Document request handling',
  'Multi-advisor scheduling',
];

export default function FinancialIndustryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-100 text-purple-700">Financial Services</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI Receptionist for Financial Advisors
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Convert more prospects into clients while providing white-glove service.
                Bright Secure qualifies leads, schedules meetings, and handles routine
                inquiries so you can focus on growing assets.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  SEC/FINRA Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-500" />
                  Encrypted & Auditable
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Incoming Call</h3>
                    <p className="text-sm text-gray-500">Sterling Wealth Advisors</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "Good afternoon, Sterling Wealth Advisors. I'm here to help you connect with
                      an advisor or schedule a consultation. Are you an existing client or interested
                      in learning about our services?"
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "I'd be happy to schedule a complimentary portfolio review. To match you with
                      the right advisor, may I ask about your investment goals and approximate
                      portfolio size?"
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Call duration: 4:45</span>
                    <span>Qualified lead captured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">78%</div>
              <p className="text-gray-400">of HNW clients expect same-day response</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$2.3M</div>
              <p className="text-gray-400">average missed opportunity from slow response</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">35%</div>
              <p className="text-gray-400">higher conversion with immediate engagement</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <p className="text-gray-400">coverage for global market hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Financial Advisors Choose Bright Secure
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Purpose-built for the financial services industry with compliance and client
              experience at the forefront.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-100 text-purple-700">Compliance First</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Built for Regulatory Requirements
              </h2>
              <p className="text-gray-600 mb-6">
                Financial services require the highest standards of compliance and record-keeping.
                Bright Secure is designed to meet SEC and FINRA requirements from day one.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span className="text-gray-700">Full call recording and archival</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span className="text-gray-700">Audit trail for all interactions</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span className="text-gray-700">Compliant disclosure statements</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span className="text-gray-700">Data retention policy alignment</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span className="text-gray-700">SOC 2 Type II certified infrastructure</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Compliance Features</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">Call Recording</h4>
                  <p className="text-sm text-gray-600">Automatic recording with secure 7-year retention</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">Disclosure Delivery</h4>
                  <p className="text-sm text-gray-600">Automated ADV and CRS disclosures as required</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">Supervision Tools</h4>
                  <p className="text-sm text-gray-600">CCO dashboard for monitoring and review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Solutions for Every Advisory Practice
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're a solo RIA or a large wealth management firm, we adapt to your practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                  <Star className="h-4 w-4" />
                  {useCase.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Financial Services Features
              </h2>
              <p className="text-gray-600 mb-8">
                Every feature designed for the unique needs of financial advisory.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Sample Prospect Call</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-gray-600 text-sm">Professional greeting with firm introduction</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <p className="text-gray-600 text-sm">Determine if existing client or prospect</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-gray-600 text-sm">Qualify based on AUM and investment goals</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                  <p className="text-gray-600 text-sm">Match with appropriate advisor specialty</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                  <p className="text-gray-600 text-sm">Schedule consultation and send calendar invite</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="h-12 w-12 text-purple-300 mx-auto mb-6" />
          <blockquote className="text-2xl font-medium text-white mb-6">
            "We added $12M in AUM last quarter from leads that would have gone to voicemail.
            The AI qualifies prospects intelligently and our advisors only speak with
            qualified opportunities. Game changer for our practice."
          </blockquote>
          <div className="text-purple-200">
            <p className="font-semibold">David Chen, CFP</p>
            <p className="text-sm">Managing Partner, Pacific Wealth Management</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Grow Your AUM?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            14-day free trial. No credit card required. Compliance-ready from day one.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/industries">
              <Button variant="outline" size="lg">
                View All Industries
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
