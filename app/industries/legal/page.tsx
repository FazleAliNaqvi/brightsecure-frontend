'use client';

import Link from 'next/link';
import {
  Scale,
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
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

const benefits = [
  {
    icon: Phone,
    title: 'Capture Every Lead',
    description: 'Potential clients call at all hours. Our AI answers 24/7, capturing case details and contact information so you never miss a billable opportunity.',
  },
  {
    icon: Lock,
    title: 'Attorney-Client Privilege',
    description: 'Fully encrypted communications and HIPAA-compliant data handling protect sensitive client information from the first call.',
  },
  {
    icon: Calendar,
    title: 'Smart Intake Scheduling',
    description: 'Automatically schedule consultations based on case type, attorney availability, and conflict checking parameters you set.',
  },
  {
    icon: FileText,
    title: 'Detailed Call Summaries',
    description: 'Receive comprehensive transcripts and AI-generated summaries of every call, perfect for case file documentation.',
  },
  {
    icon: Clock,
    title: 'After-Hours Coverage',
    description: 'Accidents happen at 2 AM. Personal injury leads, urgent family matters, and criminal defense calls are captured when your office is closed.',
  },
  {
    icon: DollarSign,
    title: 'Reduce Overhead Costs',
    description: 'Replace or supplement expensive receptionist staff while providing better coverage. Save thousands monthly without sacrificing service quality.',
  },
];

const useCases = [
  {
    title: 'Personal Injury Firms',
    description: 'Capture accident details, insurance information, and injury severity immediately. Time-sensitive cases require immediate response.',
    stats: '73% of PI leads go to the first firm that responds',
  },
  {
    title: 'Family Law Practices',
    description: 'Handle sensitive divorce, custody, and domestic situations with empathy. Screen for urgency and schedule appropriate consultations.',
    stats: 'Average 40% increase in consultation bookings',
  },
  {
    title: 'Criminal Defense',
    description: '24/7 availability for arrests and emergencies. Collect booking information and schedule jail visits or bail consultations.',
    stats: 'Critical first 24 hours coverage',
  },
  {
    title: 'Estate Planning',
    description: 'Qualify leads based on estate size, schedule document reviews, and handle sensitive end-of-life planning inquiries professionally.',
    stats: 'Filter and prioritize high-value clients',
  },
];

const features = [
  'Conflict checking integration',
  'Case type classification',
  'Urgency detection and escalation',
  'Multi-attorney routing',
  'Retainer information collection',
  'Statute of limitations alerts',
  'Court date reminders',
  'Client portal integration',
];

export default function LegalIndustryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700">Legal Industry</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI Receptionist for Law Firms
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Never miss a potential client again. Bright Secure provides 24/7 professional
                call handling that captures leads, schedules consultations, and protects
                attorney-client privilege.
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
                  Fully Encrypted
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Bar Association Compliant
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Scale className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Incoming Call</h3>
                    <p className="text-sm text-gray-500">Smith & Associates Law Firm</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "Good evening, thank you for calling Smith & Associates. I'm the AI assistant.
                      How may I help you today?"
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "I understand you've been in an accident. I'm sorry to hear that. Let me
                      collect some information to have an attorney contact you right away..."
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Call duration: 4:32</span>
                    <span>Lead captured</span>
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
              <div className="text-4xl font-bold text-white mb-2">67%</div>
              <p className="text-gray-400">of legal calls go unanswered after hours</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$1,200</div>
              <p className="text-gray-400">average value of a missed PI lead</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <p className="text-gray-400">coverage with zero overtime costs</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">35%</div>
              <p className="text-gray-400">increase in qualified consultations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Law Firms Choose Bright Secure
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Purpose-built for the legal industry with features that protect your practice
              and capture every opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tailored for Every Practice Area
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI understands the nuances of different legal specialties and adapts
              its approach accordingly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                  <Star className="h-4 w-4" />
                  {useCase.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Legal-Specific Features
              </h2>
              <p className="text-gray-600 mb-8">
                Beyond basic call answering, Bright Secure includes features designed
                specifically for law firm operations and compliance requirements.
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
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-semibold text-gray-900 mb-4">Sample Call Flow</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-gray-600 text-sm">Professional greeting with firm name</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <p className="text-gray-600 text-sm">Identify case type and urgency level</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-gray-600 text-sm">Collect contact and case details</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                  <p className="text-gray-600 text-sm">Check for conflicts (if integrated)</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                  <p className="text-gray-600 text-sm">Schedule consultation or escalate urgent</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">6</div>
                  <p className="text-gray-600 text-sm">Send encrypted summary to attorney</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="h-12 w-12 text-blue-300 mx-auto mb-6" />
          <blockquote className="text-2xl font-medium text-white mb-6">
            "Since implementing Bright Secure, we've seen a 40% increase in after-hours
            consultations booked. The AI captures details we used to miss with voicemail,
            and clients appreciate the immediate response."
          </blockquote>
          <div className="text-blue-200">
            <p className="font-semibold">Sarah Mitchell</p>
            <p className="text-sm">Managing Partner, Mitchell & Associates Personal Injury Law</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start Capturing More Leads Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            14-day free trial. No credit card required. Set up in under 10 minutes.
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
