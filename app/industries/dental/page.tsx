'use client';

import Link from 'next/link';
import {
  SmilePlus,
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
  Bell,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';

const benefits = [
  {
    icon: Calendar,
    title: 'Fill Your Chairs',
    description: 'Automatic appointment scheduling, rescheduling, and waitlist management to maximize chair utilization.',
  },
  {
    icon: Bell,
    title: 'Reduce No-Shows',
    description: 'Automated reminder calls and texts reduce no-shows by up to 40%. Quickly fill cancelled slots from your waitlist.',
  },
  {
    icon: RefreshCw,
    title: 'Recall Management',
    description: 'Proactively contact patients due for cleanings, checkups, and follow-up treatments.',
  },
  {
    icon: DollarSign,
    title: 'Insurance Verification',
    description: 'Collect insurance information before appointments so your team can verify coverage in advance.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Dental emergencies don\'t wait for business hours. Capture emergency calls and triage appropriately.',
  },
  {
    icon: Sparkles,
    title: 'New Patient Acquisition',
    description: 'Convert more website visitors and callers into booked appointments with immediate response.',
  },
];

const useCases = [
  {
    title: 'General Dentistry',
    description: 'Handle routine scheduling, hygiene recalls, and new patient intake efficiently.',
    stats: 'Average 35% increase in hygiene appointments',
  },
  {
    title: 'Orthodontics',
    description: 'Manage consultation requests, adjustment appointments, and long-term treatment scheduling.',
    stats: 'Streamline multi-visit treatment plans',
  },
  {
    title: 'Oral Surgery',
    description: 'Coordinate referrals, pre-op instructions, and post-op follow-up calls.',
    stats: 'Reduce administrative burden by 45%',
  },
  {
    title: 'Pediatric Dentistry',
    description: 'Child-friendly scheduling with parent communication and school-hour appointment management.',
    stats: 'Family scheduling made easy',
  },
];

const features = [
  'Multi-provider scheduling',
  'Insurance pre-verification',
  'Treatment recall automation',
  'Emergency call triage',
  'Waitlist management',
  'New patient intake forms',
  'Appointment confirmations',
  'Cancellation rebooking',
];

export default function DentalIndustryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cyan-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-cyan-100 text-cyan-700">Dental Industry</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI Receptionist for Dental Offices
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Keep your chairs filled and your front desk stress-free. Bright Secure handles
                scheduling, recalls, and patient communication so you can focus on smiles.
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
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  PMS Integration Ready
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <SmilePlus className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Incoming Call</h3>
                    <p className="text-sm text-gray-500">Bright Smile Dental</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "Thank you for calling Bright Smile Dental. I can help you schedule an
                      appointment. Are you an existing patient or would you like to become a new patient?"
                    </p>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "I found your next available cleaning with Dr. Johnson is Thursday at 2 PM
                      or Friday at 10 AM. Which works better for you?"
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Call duration: 2:15</span>
                    <span>Appointment booked</span>
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
              <div className="text-4xl font-bold text-white mb-2">23%</div>
              <p className="text-gray-400">average no-show rate in dentistry</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$200</div>
              <p className="text-gray-400">average revenue lost per no-show</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">40%</div>
              <p className="text-gray-400">no-show reduction with reminders</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">65%</div>
              <p className="text-gray-400">of patients prefer online booking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Dental Practices Love Bright Secure
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Purpose-built features that solve the unique challenges of dental practice management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chair Utilization Section */}
      <section className="py-20 bg-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-cyan-100 text-cyan-700">Revenue Optimization</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Maximize Chair Utilization
              </h2>
              <p className="text-gray-600 mb-6">
                Empty chairs cost money. Bright Secure works around the clock to keep your
                schedule full and your practice profitable.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <span className="text-gray-700">Instant cancellation backfill from waitlist</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <span className="text-gray-700">Automated hygiene recall campaigns</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <span className="text-gray-700">Smart scheduling to minimize gaps</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <span className="text-gray-700">Treatment plan follow-up calls</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <span className="text-gray-700">New patient conversion optimization</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Monthly Impact Example</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Reduced no-shows</span>
                    <span className="font-semibold text-green-600">+$3,200/mo</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Recall reactivation</span>
                    <span className="font-semibold text-green-600">+$2,800/mo</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">After-hours bookings</span>
                    <span className="font-semibold text-green-600">+$1,500/mo</span>
                  </div>
                </div>
                <div className="p-4 bg-cyan-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Potential added revenue</span>
                    <span className="font-bold text-cyan-700">+$7,500/mo</span>
                  </div>
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
              Every Dental Specialty Covered
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From general dentistry to specialized practices, we adapt to your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="flex items-center gap-2 text-sm text-cyan-600 font-medium">
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
                Dental-Specific Features
              </h2>
              <p className="text-gray-600 mb-8">
                Every feature designed with dental practice workflows in mind.
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
              <h3 className="font-semibold text-gray-900 mb-4">Sample Recall Call</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-gray-600 text-sm">Friendly greeting identifying the practice</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <p className="text-gray-600 text-sm">"We noticed you're due for your 6-month cleaning"</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-gray-600 text-sm">Offer convenient appointment times</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                  <p className="text-gray-600 text-sm">Book appointment and send confirmation</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                  <p className="text-gray-600 text-sm">Update practice management system</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="h-12 w-12 text-cyan-300 mx-auto mb-6" />
          <blockquote className="text-2xl font-medium text-white mb-6">
            "Our no-show rate dropped from 22% to 8% in the first month. The automated recall
            calls brought back patients we hadn't seen in years. This pays for itself many times over."
          </blockquote>
          <div className="text-cyan-200">
            <p className="font-semibold">Dr. Jennifer Park</p>
            <p className="text-sm">Park Family Dentistry, 2-dentist practice</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Fill More Chairs?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            14-day free trial. No credit card required. See results in your first week.
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
