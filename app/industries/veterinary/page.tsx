'use client';

import Link from 'next/link';
import {
  PawPrint,
  Phone,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Calendar,
  AlertCircle,
  Star,
  MessageSquare,
  Lock,
  Mail,
  Heart,
  Pill,
  Stethoscope,
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';

const benefits = [
  {
    icon: Phone,
    title: 'Support Your Busy Front Desk',
    description: 'When your receptionist is checking out a patient or helping someone in the lobby, the AI ensures no call goes unanswered.',
  },
  {
    icon: AlertCircle,
    title: 'Emergency Triage',
    description: 'After-hours emergencies are identified and directed appropriately while routine calls are handled or scheduled.',
  },
  {
    icon: Calendar,
    title: 'Appointment Scheduling',
    description: 'Book wellness visits, vaccinations, surgeries, and follow-ups automatically based on your availability.',
  },
  {
    icon: Mail,
    title: 'Secure Call Summaries',
    description: 'Every call is transcribed and securely emailed to up to 4 team members—so nothing falls through the cracks.',
  },
  {
    icon: Pill,
    title: 'Medication Refills',
    description: 'Collect pet information, medication details, and owner contact for prescription refill requests.',
  },
  {
    icon: Clock,
    title: '24/7 Pet Parent Support',
    description: 'Pet emergencies don\'t wait for business hours. Provide guidance and capture urgent calls anytime.',
  },
];

const useCases = [
  {
    title: 'General Veterinary Practice',
    description: 'Handle wellness appointments, sick visits, vaccination reminders, and general inquiries efficiently.',
    stats: 'Reduce missed calls by 90%',
  },
  {
    title: 'Emergency Veterinary Clinics',
    description: 'Triage after-hours emergencies, provide initial guidance, and prepare staff for incoming critical cases.',
    stats: 'Better prepared for emergencies',
  },
  {
    title: 'Specialty Veterinary Hospitals',
    description: 'Manage referrals, specialist scheduling, and complex case coordination with multiple providers.',
    stats: 'Streamline referral intake',
  },
  {
    title: 'Mobile Veterinary Services',
    description: 'Handle appointment requests and route appropriately while you\'re on the road with patients.',
    stats: 'Never miss a booking',
  },
];

const features = [
  'Emergency call identification',
  'Multi-pet household support',
  'Prescription refill requests',
  'Vaccination reminders',
  'Surgery scheduling',
  'Secure email transcripts',
  'After-hours coverage',
  'Canada/USA/EU compliant',
];

export default function VeterinaryIndustryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-700">Veterinary</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI Receptionist Support for Veterinary Practices
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Your front desk team is amazing—but they can't be on every call at once.
                When your receptionist is busy, at lunch, or it's after hours, our AI
                provides seamless coverage that pet parents appreciate.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Emergency triage, appointment booking, and medication refills—all handled
                professionally with transcripts securely delivered to your team.
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
                  Secure Email Delivery
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <PawPrint className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Incoming Call</h3>
                    <p className="text-sm text-gray-500">Pawsitive Care Animal Hospital</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-400">
                    <p className="text-xs text-amber-700 font-medium mb-1">Receptionist helping client at checkout...</p>
                    <p className="text-gray-600 italic">AI answers after 3 rings</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "Thank you for calling Pawsitive Care Animal Hospital. I can help you with
                      appointments, medication refills, or questions. Is this an emergency?"
                    </p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "I'd be happy to schedule Max's annual wellness exam. We have openings
                      Tuesday at 10 AM or Thursday at 3 PM. Which works better for you?"
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Transcript emailed to team</span>
                    <span>Appointment booked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Backup for Your Front Desk Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1</div>
              <p className="font-medium mb-1">Team Occupied?</p>
              <p className="text-amber-200 text-sm">AI picks up when staff is unavailable</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2</div>
              <p className="font-medium mb-1">Pet-Friendly Service</p>
              <p className="text-amber-200 text-sm">Handles scheduling, refills, triage</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <p className="font-medium mb-1">Secure Updates</p>
              <p className="text-amber-200 text-sm">Encrypted transcript to up to 4 staff</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Front Desk's Best Backup
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're not here to replace your amazing team—we're here to make sure they
              never feel overwhelmed and no pet parent ever hits voicemail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Handling Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-red-100 text-red-700">Emergency Support</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                After-Hours Emergency Triage
              </h2>
              <p className="text-gray-600 mb-6">
                Pet emergencies happen at 2 AM. Our AI identifies urgent situations,
                provides appropriate initial guidance, and ensures your emergency protocols
                are followed.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">Recognizes emergency symptoms</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">Provides immediate care guidance</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">Directs to emergency clinics if closed</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">Escalates to on-call vet if available</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">Immediate secure notification to team</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Emergency Call Example</h3>
              <div className="space-y-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 italic">
                    "My dog just ate chocolate and he's acting strange!"
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-gray-600 italic">
                    "I understand this is very concerning. Chocolate can be dangerous for dogs.
                    Based on what you've described, this needs immediate attention. I recommend
                    going to the nearest emergency veterinary clinic right away. The closest one is..."
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-xs text-amber-800">
                  Immediate notification sent to Dr. Wilson and clinic manager
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
              Built for Every Veterinary Practice
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
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
                Veterinary-Specific Features
              </h2>
              <p className="text-gray-600 mb-8">
                Designed for the unique needs of animal care with global compliance.
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
              <h3 className="font-semibold text-gray-900 mb-4">When AI Assists</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-gray-600 text-sm">Receptionist is with a client at checkout</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <p className="text-gray-600 text-sm">Multiple calls coming in at once</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-gray-600 text-sm">Staff lunch breaks and meetings</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                  <p className="text-gray-600 text-sm">After hours, weekends, holidays</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                  <p className="text-gray-600 text-sm">Emergency calls needing immediate triage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="h-12 w-12 text-amber-300 mx-auto mb-6" />
          <blockquote className="text-2xl font-medium text-white mb-6">
            "Our receptionist used to stress about bathroom breaks and lunch. Now she knows
            the AI has her covered. We haven't missed a single call in 3 months, and pet
            parents love that someone always answers. The email transcripts keep the whole team informed."
          </blockquote>
          <div className="text-amber-200">
            <p className="font-semibold">Dr. Michael Torres, DVM</p>
            <p className="text-sm">Companion Animal Clinic, Toronto</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Support Your Front Desk?
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
