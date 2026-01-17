'use client';

import Link from 'next/link';
import {
  Calculator,
  Phone,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Calendar,
  FileText,
  Users,
  DollarSign,
  AlertCircle,
  Star,
  MessageSquare,
  Lock,
  TrendingUp,
  Building2,
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';

const benefits = [
  {
    icon: Phone,
    title: 'Handle Tax Season Volume',
    description: 'Scale instantly during busy season without hiring temporary staff. Handle 10x normal call volume effortlessly.',
  },
  {
    icon: Calendar,
    title: 'Appointment Scheduling',
    description: 'Book tax prep appointments, quarterly reviews, and financial planning sessions automatically.',
  },
  {
    icon: Lock,
    title: 'Client Confidentiality',
    description: 'Encrypted communications protect sensitive financial information. SOC 2 compliant infrastructure.',
  },
  {
    icon: FileText,
    title: 'Document Collection',
    description: 'Guide clients through required documents and collect information before their appointment.',
  },
  {
    icon: Clock,
    title: 'After-Hours Support',
    description: 'Capture tax deadline panics and extension requests even at midnight on April 14th.',
  },
  {
    icon: Users,
    title: 'New Client Intake',
    description: 'Qualify prospects, collect business information, and schedule consultations for potential new clients.',
  },
];

const useCases = [
  {
    title: 'Tax Preparation Firms',
    description: 'Handle seasonal call spikes, document collection, and appointment scheduling for individual and business returns.',
    stats: 'Manage 10x call volume during tax season',
  },
  {
    title: 'CPA Practices',
    description: 'Professional client intake, quarterly review scheduling, and year-end planning coordination.',
    stats: 'Reduce admin time by 60%',
  },
  {
    title: 'Bookkeeping Services',
    description: 'Onboard new clients, schedule monthly reviews, and handle routine inquiries about statements.',
    stats: 'Scale without adding staff',
  },
  {
    title: 'Business Advisory',
    description: 'Qualify leads for advisory services, schedule strategy sessions, and coordinate multi-partner meetings.',
    stats: 'Focus partners on high-value work',
  },
];

const features = [
  'Tax deadline awareness',
  'Document checklist guidance',
  'Multi-partner routing',
  'Client portal support',
  'Seasonal scaling',
  'Secure message handling',
  'Appointment reminders',
  'New client qualification',
];

export default function AccountingIndustryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-700">Accounting Industry</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI Receptionist for Accounting Firms
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Never miss a client call during tax season again. Bright Secure scales with your
                busiest periods while maintaining the professionalism your clients expect.
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
                  SOC 2 Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-500" />
                  Encrypted Communications
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Calculator className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Incoming Call</h3>
                    <p className="text-sm text-gray-500">Anderson & Associates CPA</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "Good afternoon, Anderson & Associates. I'm here to help with scheduling,
                      document questions, or connecting you with your accountant. How can I assist you?"
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "I can schedule your tax preparation appointment. I'll also send you our
                      document checklist so you're fully prepared. What day works best for you?"
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Call duration: 3:12</span>
                    <span>Appointment + checklist sent</span>
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
              <div className="text-4xl font-bold text-white mb-2">10x</div>
              <p className="text-gray-400">call volume increase during tax season</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">67%</div>
              <p className="text-gray-400">of calls are scheduling related</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$150/hr</div>
              <p className="text-gray-400">average CPA billing rate saved</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <p className="text-gray-400">coverage even on April 15th</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Accounting Firms Choose Bright Secure
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built for the unique demands of accounting practice with seasonal scaling and security in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Season Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-700">Seasonal Scaling</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Survive Tax Season Stress-Free
              </h2>
              <p className="text-gray-600 mb-6">
                When call volume explodes in Q1, Bright Secure handles the surge without
                missing a single client. No temporary hires, no overwhelmed staff.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited concurrent call handling</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Extension request management</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Document status inquiries handled</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Deadline reminder calls to clients</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Appointment rescheduling on demand</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Tax Season Call Volume</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Off-season (May-Dec)</span>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-20 bg-green-200 rounded-full"></div>
                    <span className="text-sm text-gray-500">~15 calls/day</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Early tax season (Jan-Feb)</span>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-32 bg-green-300 rounded-full"></div>
                    <span className="text-sm text-gray-500">~40 calls/day</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Peak season (Mar-Apr)</span>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-full bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">~150 calls/day</span>
                  </div>
                </div>
                <p className="text-sm text-green-600 mt-4 font-medium">
                  Bright Secure handles all call volumes without additional cost
                </p>
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
              Solutions for Every Practice Type
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From solo practitioners to multi-partner firms, we scale to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
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
                Accounting-Specific Features
              </h2>
              <p className="text-gray-600 mb-8">
                Features designed specifically for the accounting profession's unique workflow.
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
              <h3 className="font-semibold text-gray-900 mb-4">Sample Tax Season Call</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-gray-600 text-sm">Professional greeting with firm name</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <p className="text-gray-600 text-sm">Identify existing client or new prospect</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-gray-600 text-sm">Determine call purpose (appointment, docs, question)</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                  <p className="text-gray-600 text-sm">Route to appropriate CPA or handle directly</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                  <p className="text-gray-600 text-sm">Send confirmation and document reminders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="h-12 w-12 text-green-300 mx-auto mb-6" />
          <blockquote className="text-2xl font-medium text-white mb-6">
            "Last tax season was our busiest ever, but our stress level was the lowest.
            Bright Secure handled 80% of incoming calls automatically. We didn't hire a
            single temp and still had happier clients."
          </blockquote>
          <div className="text-green-200">
            <p className="font-semibold">Robert Thompson, CPA</p>
            <p className="text-sm">Thompson Tax & Advisory, 5-partner firm</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready for a Stress-Free Tax Season?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            14-day free trial. No credit card required. Set up before the rush.
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
