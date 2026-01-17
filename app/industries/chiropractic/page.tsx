'use client';

import Link from 'next/link';
import {
  Activity,
  Phone,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Calendar,
  FileText,
  Users,
  Heart,
  Star,
  MessageSquare,
  Lock,
  Zap,
  RefreshCw,
  Mail,
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';

const benefits = [
  {
    icon: Phone,
    title: 'Support Your Front Desk',
    description: 'When your receptionist is with a patient or on another call, the AI seamlessly picks up so no call goes unanswered.',
  },
  {
    icon: Clock,
    title: 'After-Hours Coverage',
    description: 'Capture new patient inquiries and urgent care requests even when your office is closed. Every call becomes an opportunity.',
  },
  {
    icon: Calendar,
    title: 'Intelligent Scheduling',
    description: 'Book adjustments, new patient consultations, and follow-ups automatically based on your availability preferences.',
  },
  {
    icon: Mail,
    title: 'Secure Call Transcripts',
    description: 'Every call is transcribed and securely emailed to up to 4 team members per phone line—HIPAA, PIPEDA, and GDPR compliant.',
  },
  {
    icon: RefreshCw,
    title: 'Care Plan Follow-ups',
    description: 'Automated outreach for patients due for their next adjustment, improving compliance and retention.',
  },
  {
    icon: Heart,
    title: 'Wellness-Focused Messaging',
    description: 'Conversations aligned with your holistic health philosophy, not just transactional scheduling.',
  },
];

const useCases = [
  {
    title: 'New Patient Acquisition',
    description: 'Capture inquiries 24/7, answer common questions about chiropractic care, and schedule initial consultations.',
    stats: 'Convert 40% more website inquiries',
  },
  {
    title: 'Adjustment Scheduling',
    description: 'Existing patients can book their next adjustment anytime, even outside office hours.',
    stats: 'Reduce scheduling calls by 60%',
  },
  {
    title: 'Multi-Practitioner Offices',
    description: 'Route calls to the right chiropractor based on specialty, availability, or patient preference.',
    stats: 'Optimize provider utilization',
  },
  {
    title: 'Massage & Wellness Add-ons',
    description: 'Schedule massage therapy, acupuncture, or other wellness services alongside chiropractic appointments.',
    stats: 'Increase ancillary service bookings',
  },
];

const features = [
  'HIPAA & PIPEDA compliant',
  'New patient intake forms',
  'Insurance verification prompts',
  'Treatment plan reminders',
  'Multi-provider scheduling',
  'Secure email transcripts',
  'After-hours call capture',
  'Canada/USA/EU compliant',
];

export default function ChiropracticIndustryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-700">Chiropractic</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI Receptionist Support for Chiropractic Offices
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Give your front desk team the backup they deserve. When your receptionist is
                helping a patient, on another call, or away from the desk, our AI steps in
                seamlessly to ensure every call is answered professionally.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                After hours, weekends, and holidays covered too—so no opportunity slips away.
                Every call is transcribed and securely emailed to your team.
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
                  HIPAA & PIPEDA Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-500" />
                  Secure Email Transcripts
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Incoming Call</h3>
                    <p className="text-sm text-gray-500">Aligned Wellness Chiropractic</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-orange-50 rounded-lg p-3 border-l-4 border-orange-400">
                    <p className="text-xs text-orange-700 font-medium mb-1">Receptionist busy with patient...</p>
                    <p className="text-gray-600 italic">AI picks up after 3 rings</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "Thank you for calling Aligned Wellness Chiropractic. I can help you schedule
                      an appointment or answer questions. How may I assist you today?"
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "I'll book you for an adjustment with Dr. Martinez on Thursday at 2 PM.
                      I'll send a confirmation to your email and our team will have the details."
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Call transcribed & emailed</span>
                    <span>Appointment booked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">How It Works With Your Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1</div>
              <p className="font-medium mb-1">Receptionist Busy?</p>
              <p className="text-orange-200 text-sm">AI picks up after your set number of rings</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2</div>
              <p className="font-medium mb-1">Professional Handling</p>
              <p className="text-orange-200 text-sm">Schedules appointments, answers questions, takes messages</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <p className="font-medium mb-1">Secure Notification</p>
              <p className="text-orange-200 text-sm">Call transcript emailed to up to 4 team members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enhance Your Front Desk, Don't Replace It
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your receptionist is valuable. We help them be even more effective by ensuring
              no call ever goes unanswered—even during the busiest moments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Banner */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Security & Compliance Built-In
                </h3>
                <p className="text-gray-600 mb-4">
                  Every call transcript is encrypted and delivered securely. We're fully
                  compliant with healthcare privacy regulations across North America and Europe.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    HIPAA compliant (USA)
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    PIPEDA compliant (Canada)
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    GDPR compliant (EU)
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Up to 4 secure email recipients per line
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-3">Sample Email Notification</h4>
                <div className="bg-white rounded-lg p-4 border border-gray-200 text-sm">
                  <p className="text-gray-500 mb-2">To: frontdesk@alignedwellness.com, dr.martinez@...</p>
                  <p className="font-medium text-gray-900 mb-2">New call received - Appointment booked</p>
                  <p className="text-gray-600 text-xs">
                    Caller: John Smith (555-0123)<br/>
                    Purpose: New patient adjustment<br/>
                    Booked: Thursday 2:00 PM with Dr. Martinez<br/>
                    <span className="text-orange-600">Full transcript attached (encrypted)</span>
                  </p>
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
              Perfect for Every Chiropractic Practice
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="flex items-center gap-2 text-sm text-orange-600 font-medium">
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
                Features Your Practice Needs
              </h2>
              <p className="text-gray-600 mb-8">
                Everything designed for chiropractic workflows with compliance built-in.
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
              <h3 className="font-semibold text-gray-900 mb-4">When Does the AI Answer?</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-gray-600 text-sm">Receptionist is on another call</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <p className="text-gray-600 text-sm">Receptionist is away from desk (lunch, break)</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-gray-600 text-sm">Helping a patient at the front desk</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                  <p className="text-gray-600 text-sm">After office hours, weekends, holidays</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                  <p className="text-gray-600 text-sm">High call volume periods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="h-12 w-12 text-orange-300 mx-auto mb-6" />
          <blockquote className="text-2xl font-medium text-white mb-6">
            "Our receptionist loves it. She no longer stresses when multiple calls come in
            at once or when she needs to step away. The AI has her back, and we haven't
            missed a single call since we started. The email transcripts keep everyone in the loop."
          </blockquote>
          <div className="text-orange-200">
            <p className="font-semibold">Dr. Amanda Roberts</p>
            <p className="text-sm">Aligned Spine Chiropractic, Ontario</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Support Your Front Desk Team?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            14-day free trial. No credit card required. Fully compliant in Canada, USA, and EU.
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
