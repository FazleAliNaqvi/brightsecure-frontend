'use client';

import Link from 'next/link';
import {
  Home,
  Phone,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Calendar,
  Users,
  Star,
  MessageSquare,
  Mail,
  MapPin,
  Key,
  DollarSign,
  Building2,
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';

const benefits = [
  {
    icon: Phone,
    title: 'Capture Every Lead',
    description: 'When you\'re showing a property or your assistant is busy, the AI answers professionally—ensuring no buyer or seller inquiry is missed.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Buyers call at all hours. Whether it\'s 9 PM or Sunday morning, every inquiry gets a professional response and lead capture.',
  },
  {
    icon: Calendar,
    title: 'Showing Scheduling',
    description: 'Automatically schedule property viewings based on your availability, the listing status, and buyer preferences.',
  },
  {
    icon: Mail,
    title: 'Instant Lead Notifications',
    description: 'Every call is transcribed and securely emailed to up to 4 team members—you\'ll know immediately when a hot lead calls.',
  },
  {
    icon: Users,
    title: 'Buyer Qualification',
    description: 'Pre-qualify leads by gathering financing status, timeline, property preferences, and budget range.',
  },
  {
    icon: Key,
    title: 'Listing Inquiries',
    description: 'Handle questions about properties, pricing, and availability professionally while you focus on closings.',
  },
];

const useCases = [
  {
    title: 'Solo Agents',
    description: 'Never miss a call while showing properties. Your AI assistant captures every lead and schedules callbacks.',
    stats: 'Average 35% more leads captured',
  },
  {
    title: 'Real Estate Teams',
    description: 'Route calls to the right agent based on listing, location, or specialization. Overflow handling for busy periods.',
    stats: 'Scale without adding admin staff',
  },
  {
    title: 'Brokerages',
    description: 'Provide consistent, professional service across all agents. Central lead capture with intelligent routing.',
    stats: 'Unified client experience',
  },
  {
    title: 'Property Management',
    description: 'Handle tenant inquiries, maintenance requests, and leasing questions efficiently.',
    stats: 'Reduce after-hours burden',
  },
];

const features = [
  'Lead capture & qualification',
  'Showing scheduling',
  'Property inquiry handling',
  'Multi-agent routing',
  'Secure email transcripts',
  'After-hours coverage',
  'Open house follow-up',
  'Canada/USA/EU compliant',
];

export default function RealEstateIndustryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-teal-100 text-teal-700">Real Estate</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI Receptionist Support for Real Estate Professionals
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                You can't answer the phone while showing a home. When you're with clients,
                driving between listings, or your assistant is at lunch—the AI has your back.
                No lead left behind.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Every inquiry is answered professionally, leads are qualified, and you receive
                secure transcripts instantly. Work smarter, close more deals.
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
                  Secure & Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-500" />
                  Instant Lead Alerts
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Home className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Incoming Call</h3>
                    <p className="text-sm text-gray-500">Sarah Mitchell Realty</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-teal-50 rounded-lg p-3 border-l-4 border-teal-400">
                    <p className="text-xs text-teal-700 font-medium mb-1">Agent showing property at 123 Oak St...</p>
                    <p className="text-gray-600 italic">AI answers professionally</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "Thank you for calling Sarah Mitchell Realty. I can help you with property
                      inquiries or schedule a showing. Are you interested in buying or selling?"
                    </p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-4">
                    <p className="text-gray-600 italic">
                      "Great! I see the home on Maple Drive is still available. I can schedule
                      a showing for you. Are you pre-approved for financing or working with a lender?"
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Qualified lead captured</span>
                    <span>Showing scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Your 24/7 Lead Capture Assistant</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1</div>
              <p className="font-medium mb-1">You're Busy?</p>
              <p className="text-teal-200 text-sm">AI answers when you can't</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2</div>
              <p className="font-medium mb-1">Lead Qualified</p>
              <p className="text-teal-200 text-sm">Budget, timeline, financing captured</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <p className="font-medium mb-1">Instant Alert</p>
              <p className="text-teal-200 text-sm">Transcript emailed to your team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Never Miss Another Lead
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              In real estate, the first agent to respond often wins. Make sure that's always you,
              even when you're with another client.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture ROI Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-700">ROI Calculator</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What's a Missed Call Really Cost?
              </h2>
              <p className="text-gray-600 mb-6">
                In real estate, one missed buyer call could mean a lost commission.
                Our AI ensures you capture every opportunity.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Average home price: $500,000</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Average commission: 2.5% = $12,500</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">One extra deal/month = $150K/year</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Bright Secure cost: $79-$189/month</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Lead Value Example</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly missed calls (before)</span>
                    <span className="font-semibold text-red-600">~15 calls</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversion rate to showing</span>
                    <span className="font-semibold text-gray-900">20%</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Showing to close rate</span>
                    <span className="font-semibold text-gray-900">10%</span>
                  </div>
                </div>
                <div className="p-4 bg-teal-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Potential recovered revenue</span>
                    <span className="font-bold text-teal-700">+$3,750/mo</span>
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
              Solutions for Every Real Estate Professional
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="flex items-center gap-2 text-sm text-teal-600 font-medium">
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
                Real Estate-Specific Features
              </h2>
              <p className="text-gray-600 mb-8">
                Every feature designed for how real estate professionals actually work.
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
              <h3 className="font-semibold text-gray-900 mb-4">When AI Has Your Back</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-gray-600 text-sm">During property showings</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <p className="text-gray-600 text-sm">While in client meetings</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-gray-600 text-sm">Driving between properties</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                  <p className="text-gray-600 text-sm">Evenings and weekends</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                  <p className="text-gray-600 text-sm">Open house overflow calls</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="h-12 w-12 text-teal-300 mx-auto mb-6" />
          <blockquote className="text-2xl font-medium text-white mb-6">
            "I closed two extra deals last quarter from leads that would have gone to voicemail.
            The AI captured their info, qualified them, and I called back within 20 minutes.
            Both said they chose me because someone answered. That's $25K in commission from
            a $189/month investment."
          </blockquote>
          <div className="text-teal-200">
            <p className="font-semibold">Jennifer Adams</p>
            <p className="text-sm">Top Producer, Re/Max Toronto</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Capture Every Lead?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            14-day free trial. No credit card required. Set up in minutes.
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
