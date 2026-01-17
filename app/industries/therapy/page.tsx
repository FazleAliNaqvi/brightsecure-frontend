'use client';

import Link from 'next/link';
import {
  Heart,
  Phone,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Calendar,
  Users,
  Star,
  MessageSquare,
  Lock,
  Mail,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';

const benefits = [
  {
    icon: Phone,
    title: 'Never Miss a Client in Need',
    description: 'When your receptionist is occupied or you don\'t have one, our AI ensures every call is answered with compassion and professionalism.',
  },
  {
    icon: Clock,
    title: 'After-Hours Compassion',
    description: 'Clients often reach out during difficult moments. Capture inquiries after hours and ensure they feel heard, even at midnight.',
  },
  {
    icon: Shield,
    title: 'HIPAA & Privacy First',
    description: 'Mental health calls require the utmost discretion. Fully encrypted, HIPAA/PIPEDA/GDPR compliant with secure transcript delivery.',
  },
  {
    icon: Mail,
    title: 'Secure Transcripts',
    description: 'Every call is transcribed and securely emailed to up to 4 team members. You\'ll know exactly who called and why.',
  },
  {
    icon: Calendar,
    title: 'Sensitive Scheduling',
    description: 'Book therapy sessions, intake appointments, and follow-ups with appropriate sensitivity and privacy.',
  },
  {
    icon: UserCheck,
    title: 'Warm Handoffs',
    description: 'For urgent situations, the AI can identify crisis indicators and escalate appropriately.',
  },
];

const useCases = [
  {
    title: 'Private Practice Therapists',
    description: 'Focus on your clients in session while the AI handles incoming calls, scheduling, and new patient inquiries.',
    stats: 'No more interruptions during sessions',
  },
  {
    title: 'Counseling Centers',
    description: 'Handle high call volumes, route to available therapists, and manage waitlists effectively.',
    stats: 'Reduce front desk overwhelm by 50%',
  },
  {
    title: 'Psychiatric Practices',
    description: 'Manage medication refill requests, appointment scheduling, and new patient intake professionally.',
    stats: 'Streamline administrative workflows',
  },
  {
    title: 'Group Practices',
    description: 'Route calls to the appropriate therapist based on specialty, availability, and client preference.',
    stats: 'Optimize provider matching',
  },
];

const features = [
  'HIPAA & PIPEDA compliant',
  'GDPR compliant (EU)',
  'Compassionate conversation design',
  'Crisis indicator recognition',
  'Secure email to 4 recipients',
  'New client intake support',
  'Insurance questions handled',
  'Waitlist management',
];

export default function TherapyIndustryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-pink-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-pink-100 text-pink-700">Therapy & Counseling</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Compassionate AI Support for Therapy Practices
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Your receptionist can't be everywhere. When they're busy, away from the desk,
                or it's after hours, our AI provides warm, professional coverage—ensuring
                every potential client feels welcomed.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Designed with mental health in mind: sensitive conversations, absolute privacy,
                and secure transcripts delivered to your team.
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
                  HIPAA/PIPEDA/GDPR Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-500" />
                  Encrypted Transcripts
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Incoming Call</h3>
                    <p className="text-sm text-gray-500">Serenity Counseling Services</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-pink-50 rounded-lg p-3 border-l-4 border-pink-400">
                    <p className="text-xs text-pink-700 font-medium mb-1">Therapist in session, receptionist at lunch...</p>
                    <p className="text-gray-600 italic">AI answers with warmth</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "Thank you for calling Serenity Counseling Services. I'm here to help you.
                      Whether you're looking to schedule an appointment or have questions about
                      our services, I'm glad you reached out."
                    </p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "I understand taking this step can feel difficult. Let me help you schedule
                      a confidential consultation. Our therapists specialize in anxiety and
                      depression support."
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Encrypted transcript sent</span>
                    <span>Intake scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Supporting Your Practice, Not Replacing Your Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1</div>
              <p className="font-medium mb-1">Backup Coverage</p>
              <p className="text-pink-200 text-sm">AI answers when your team is unavailable</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2</div>
              <p className="font-medium mb-1">Compassionate Service</p>
              <p className="text-pink-200 text-sm">Warm, sensitive conversation appropriate for mental health</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <p className="font-medium mb-1">Secure Delivery</p>
              <p className="text-pink-200 text-sm">Encrypted transcripts to up to 4 team members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Therapy Practices Trust Bright Secure
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We understand the sensitive nature of mental health calls. Every feature is designed
              with compassion, privacy, and professionalism in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Compliance Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-700">Privacy & Security</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Mental Health Calls Require Extra Care
              </h2>
              <p className="text-gray-600 mb-6">
                We take privacy seriously. All calls are encrypted, transcripts are delivered
                securely, and we comply with healthcare privacy regulations across jurisdictions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">HIPAA compliant (United States)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">PIPEDA compliant (Canada)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">GDPR compliant (European Union)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Encrypted email transcripts</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Up to 4 secure recipients per line</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Designed for Sensitivity</h3>
              <div className="space-y-4">
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">Compassionate Tone</h4>
                  <p className="text-sm text-gray-600">Warm, non-judgmental language designed for mental health contexts</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">Crisis Awareness</h4>
                  <p className="text-sm text-gray-600">Recognizes indicators that may require immediate attention</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">No Judgment</h4>
                  <p className="text-sm text-gray-600">Callers never feel stigmatized or uncomfortable</p>
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
              Solutions for Mental Health Practices
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="flex items-center gap-2 text-sm text-pink-600 font-medium">
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
                Features for Mental Health Practices
              </h2>
              <p className="text-gray-600 mb-8">
                Every feature designed with the unique needs of therapy practices in mind.
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
              <h3 className="font-semibold text-gray-900 mb-4">When the AI Steps In</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-gray-600 text-sm">Therapist is in session with a client</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <p className="text-gray-600 text-sm">Receptionist is on another call</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-gray-600 text-sm">Lunch breaks and staff meetings</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                  <p className="text-gray-600 text-sm">After hours, evenings, and weekends</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                  <p className="text-gray-600 text-sm">Solo practitioners without reception staff</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="h-12 w-12 text-pink-300 mx-auto mb-6" />
          <blockquote className="text-2xl font-medium text-white mb-6">
            "As a solo therapist, I was missing calls during sessions. Now every caller is
            greeted warmly, and I get an encrypted transcript immediately after. It feels
            like having a compassionate assistant who understands mental health."
          </blockquote>
          <div className="text-pink-200">
            <p className="font-semibold">Dr. Sarah Martinez, LMFT</p>
            <p className="text-sm">Private Practice, San Francisco</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Never Miss a Client Call?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            14-day free trial. No credit card required. Compliant in Canada, USA, and EU.
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
