'use client';

import Link from 'next/link';
import {
  Stethoscope,
  Phone,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Calendar,
  FileText,
  Users,
  Heart,
  AlertCircle,
  Star,
  MessageSquare,
  Lock,
  Pill,
  Activity,
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';

const benefits = [
  {
    icon: Shield,
    title: 'HIPAA Compliant',
    description: 'Fully encrypted, BAA-ready platform that meets all HIPAA requirements for protecting patient health information (PHI).',
  },
  {
    icon: Calendar,
    title: 'Smart Appointment Scheduling',
    description: 'Book, reschedule, and confirm appointments automatically. Reduce no-shows with intelligent reminder systems.',
  },
  {
    icon: Pill,
    title: 'Prescription Refill Requests',
    description: 'Collect medication, pharmacy, and dosage information for provider review. Streamline routine refill workflows.',
  },
  {
    icon: Clock,
    title: 'After-Hours Triage',
    description: 'Screen calls for urgency, direct emergencies appropriately, and capture messages for next-day follow-up.',
  },
  {
    icon: Users,
    title: 'Patient Intake',
    description: 'Collect new patient information, insurance details, and reason for visit before they arrive.',
  },
  {
    icon: Activity,
    title: 'Reduce Staff Burnout',
    description: 'Handle high call volumes during peak times so your staff can focus on in-office patient care.',
  },
];

const useCases = [
  {
    title: 'Primary Care Practices',
    description: 'Handle appointment requests, sick calls, prescription refills, and test result inquiries efficiently.',
    stats: 'Average 50+ calls/day handled automatically',
  },
  {
    title: 'Specialty Clinics',
    description: 'Manage referral intake, pre-authorization questions, and complex scheduling with multiple providers.',
    stats: 'Reduce patient wait times by 40%',
  },
  {
    title: 'Urgent Care Centers',
    description: 'Provide wait time estimates, collect symptoms, and direct patients appropriately based on acuity.',
    stats: 'Improve patient flow and satisfaction',
  },
  {
    title: 'Multi-Location Practices',
    description: 'Route calls to the right location, manage provider schedules across sites, and maintain consistency.',
    stats: 'Centralized management, local service',
  },
];

const features = [
  'HIPAA-compliant encrypted calls',
  'EHR/EMR integration ready',
  'Prescription refill workflows',
  'Insurance verification prompts',
  'Symptom collection for triage',
  'Multi-provider scheduling',
  'Appointment reminder calls',
  'Patient portal guidance',
];

export default function MedicalIndustryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-red-100 text-red-700">Healthcare</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI Receptionist for Medical Practices
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                HIPAA-compliant call handling that schedules appointments, manages refill requests,
                and triages after-hours calls—so your staff can focus on patient care.
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
                  HIPAA Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-500" />
                  BAA Available
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Incoming Call</h3>
                    <p className="text-sm text-gray-500">Riverside Family Medicine</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "Good morning, Riverside Family Medicine. I'm the automated assistant.
                      Are you calling about an appointment, prescription refill, or something else?"
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "I can help you with a prescription refill. Can you please provide the
                      medication name, your date of birth, and preferred pharmacy?"
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Call duration: 2:45</span>
                    <span>Refill request submitted</span>
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
              <div className="text-4xl font-bold text-white mb-2">30%</div>
              <p className="text-gray-400">of medical calls are for appointments</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">25%</div>
              <p className="text-gray-400">are prescription refill requests</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">18 min</div>
              <p className="text-gray-400">average hold time eliminated</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">40%</div>
              <p className="text-gray-400">reduction in front desk workload</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Medical Practices Choose Bright Secure
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built from the ground up for healthcare compliance and patient experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HIPAA Compliance Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-700">Security & Compliance</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                HIPAA Compliance Built-In
              </h2>
              <p className="text-gray-600 mb-6">
                Bright Secure is designed from the ground up to meet HIPAA requirements.
                We provide Business Associate Agreements (BAA) and maintain the highest
                standards of patient data protection.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">End-to-end encryption for all calls</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Secure data storage with audit trails</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Business Associate Agreement provided</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Regular security assessments</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Staff trained on PHI handling</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">Security Features</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">256-bit AES Encryption</h4>
                  <p className="text-sm text-gray-600">All data encrypted at rest and in transit</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">Access Controls</h4>
                  <p className="text-sm text-gray-600">Role-based permissions and audit logging</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">Data Retention Policies</h4>
                  <p className="text-sm text-gray-600">Configurable retention with secure deletion</p>
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
              Solutions for Every Practice Type
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're a solo practitioner or a multi-location health system,
              Bright Secure scales to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="flex items-center gap-2 text-sm text-red-600 font-medium">
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
            <div className="order-2 lg:order-1 bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Sample Patient Call Flow</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-gray-600 text-sm">Warm greeting with practice name</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <p className="text-gray-600 text-sm">Identify call reason (appointment, refill, question)</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-gray-600 text-sm">Verify patient identity (DOB, name)</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                  <p className="text-gray-600 text-sm">Complete request or schedule appointment</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                  <p className="text-gray-600 text-sm">Send confirmation and notify staff</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Healthcare-Specific Features
              </h2>
              <p className="text-gray-600 mb-8">
                Every feature is designed with healthcare workflows and compliance in mind.
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
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="h-12 w-12 text-red-300 mx-auto mb-6" />
          <blockquote className="text-2xl font-medium text-white mb-6">
            "Our front desk was drowning in calls. Bright Secure now handles 60% of our
            incoming calls automatically—appointments get booked, refills get processed,
            and our staff can actually help the patients in front of them."
          </blockquote>
          <div className="text-red-200">
            <p className="font-semibold">Dr. Michael Chen</p>
            <p className="text-sm">Riverside Family Medicine, 3-physician practice</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            14-day free trial. No credit card required. HIPAA compliant from day one.
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
