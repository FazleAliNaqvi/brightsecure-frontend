'use client';

import Link from 'next/link';
import {
  Scale,
  Stethoscope,
  SmilePlus,
  Calculator,
  TrendingUp,
  Activity,
  Heart,
  PawPrint,
  Home,
  ArrowRight,
  Phone,
  Clock,
  Shield,
} from 'lucide-react';
import { Card, CardContent, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const industries = [
  {
    id: 'legal',
    name: 'Legal / Law Firms',
    description: 'Never miss a potential client call. Capture leads 24/7 while maintaining attorney-client privilege.',
    icon: Scale,
    color: 'bg-blue-100 text-blue-600',
    href: '/industries/legal',
  },
  {
    id: 'medical',
    name: 'Medical Practices',
    description: 'HIPAA-compliant call handling for patient inquiries, appointments, and prescription refills.',
    icon: Stethoscope,
    color: 'bg-red-100 text-red-600',
    href: '/industries/medical',
  },
  {
    id: 'dental',
    name: 'Dental Offices',
    description: 'Keep your chairs filled with intelligent appointment scheduling and patient follow-ups.',
    icon: SmilePlus,
    color: 'bg-cyan-100 text-cyan-600',
    href: '/industries/dental',
  },
  {
    id: 'accounting',
    name: 'Accounting Firms',
    description: 'Handle tax season call volume without adding staff. Secure and confidential.',
    icon: Calculator,
    color: 'bg-green-100 text-green-600',
    href: '/industries/accounting',
  },
  {
    id: 'financial',
    name: 'Financial Advisory',
    description: 'Professional client intake and scheduling while you focus on portfolio management.',
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-600',
    href: '/industries/financial',
  },
  {
    id: 'chiropractic',
    name: 'Chiropractic',
    description: 'Streamline new patient intake and appointment scheduling for your wellness practice.',
    icon: Activity,
    color: 'bg-orange-100 text-orange-600',
    href: '/industries/chiropractic',
  },
  {
    id: 'therapy',
    name: 'Therapy / Counseling',
    description: 'Compassionate, HIPAA-compliant call handling for sensitive mental health inquiries.',
    icon: Heart,
    color: 'bg-pink-100 text-pink-600',
    href: '/industries/therapy',
  },
  {
    id: 'veterinary',
    name: 'Veterinary',
    description: 'Handle pet emergencies, routine appointments, and medication refill requests efficiently.',
    icon: PawPrint,
    color: 'bg-amber-100 text-amber-600',
    href: '/industries/veterinary',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Capture every lead, schedule showings, and qualify buyers while you close deals.',
    icon: Home,
    color: 'bg-teal-100 text-teal-600',
    href: '/industries/real-estate',
  },
];

export default function IndustriesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Support for Your Receptionist
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            We don't replace your receptionist—we make them unstoppable. When your
            front desk is busy, away, or it's after hours, our AI ensures no call
            ever goes to voicemail.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Every call is transcribed and securely emailed to up to 4 team members per line.
            HIPAA, PIPEDA, and GDPR compliant across Canada, USA, and the EU.
          </p>
          <div className="flex justify-center gap-4">
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
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-14 w-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-7 w-7 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Backup When Busy</h3>
              <p className="text-gray-600">
                When your receptionist is on another call or helping someone in person, AI steps in seamlessly.
              </p>
            </div>
            <div className="text-center">
              <div className="h-14 w-14 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-secondary-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Compliance</h3>
              <p className="text-gray-600">
                HIPAA (USA), PIPEDA (Canada), and GDPR (EU) compliant. Encrypted transcripts emailed securely.
              </p>
            </div>
            <div className="text-center">
              <div className="h-14 w-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">After-Hours Coverage</h3>
              <p className="text-gray-600">
                Nights, weekends, and holidays covered. No lead or patient inquiry missed, ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Industry</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each industry solution is tailored with specific scripts, compliance requirements,
              and workflows designed for your unique needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Link key={industry.id} href={industry.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className={cn('h-12 w-12 rounded-lg flex items-center justify-center mb-4', industry.color)}>
                      <industry.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{industry.description}</p>
                    <div className="flex items-center text-primary-500 text-sm font-medium">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-primary-500 hover:bg-gray-100">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
