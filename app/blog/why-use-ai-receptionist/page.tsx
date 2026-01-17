'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft, Phone, DollarSign, Shield, Clock, Users, Calendar, MessageSquare, BarChart3, Settings, Headphones, Globe, Zap, CheckCircle2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui';

const faqs = [
  {
    id: 1,
    icon: HelpCircle,
    question: "What is an AI receptionist and how does it work?",
    answer: "An AI receptionist is an artificial intelligence-powered phone system that answers calls, greets callers, schedules appointments, answers frequently asked questions, and routes calls—all without human intervention.",
    details: [
      "Uses natural language processing (NLP) to understand caller intent",
      "Responds conversationally like a human receptionist",
      "Operates 24/7/365 without breaks or downtime",
      "Learns and improves from each interaction",
      "Integrates with your existing business systems",
    ],
    highlight: "AI receptionists ensure no call goes unanswered, even during peak hours, after hours, or holidays.",
  },
  {
    id: 2,
    icon: Zap,
    question: "Why should my business use an AI receptionist instead of a traditional answering service?",
    answer: "AI receptionists offer significant advantages over traditional answering services including lower costs, instant responses, unlimited capacity, and consistent quality.",
    details: [
      "Available 24/7/365 without breaks, sick days, or turnover",
      "Cost 60-80% less than human receptionists",
      "Instant responses with zero hold times",
      "Handle unlimited concurrent calls simultaneously",
      "Consistent service quality on every call",
      "Fully customizable to your specific business needs",
      "Seamless integration with calendars and CRM systems",
    ],
    highlight: "While 80% of callers hang up on voicemail, AI receptionists answer every call live—capturing leads your competitors miss.",
  },
  {
    id: 3,
    icon: DollarSign,
    question: "How much does an AI receptionist cost compared to hiring staff?",
    answer: "An AI receptionist typically costs $50-200 per month, while a full-time human receptionist costs $35,000-50,000+ annually—representing savings of 85-95%.",
    details: [
      "AI receptionist: $50-200/month (predictable pricing)",
      "Human receptionist: $35,000-50,000+/year (salary + benefits + overhead)",
      "Outsourced answering service: $1-2/minute (unpredictable costs)",
      "No training costs, no turnover expenses",
      "No overtime pay for after-hours coverage",
      "Most plans include unlimited calls",
    ],
    highlight: "The average business saves $30,000+ annually by switching to an AI receptionist.",
  },
  {
    id: 4,
    icon: Settings,
    question: "Can an AI receptionist handle complex calls and specific industry needs?",
    answer: "Yes, modern AI receptionists can be trained on industry-specific terminology, protocols, and workflows to handle complex conversations.",
    details: [
      "Healthcare: Understands medical scheduling, HIPAA requirements, urgency triage",
      "Legal: Performs intake, qualifies leads, captures case details",
      "Financial: Handles appointment types, collects preliminary information",
      "Handles multi-step conversations with context retention",
      "Asks clarifying questions when needed",
      "Knows when to escalate to human team members",
    ],
    highlight: "AI receptionists don't just answer calls—they intelligently qualify leads and capture the information your team needs.",
  },
  {
    id: 5,
    icon: Shield,
    question: "Is an AI receptionist HIPAA compliant for healthcare practices?",
    answer: "Reputable AI receptionist providers like Bright Secure are fully HIPAA compliant with enterprise-grade security measures.",
    details: [
      "Encrypted data transmission (TLS 1.2+)",
      "Encrypted data storage (AES-256)",
      "Signed Business Associate Agreements (BAAs)",
      "Comprehensive audit logging",
      "Role-based access controls",
      "Secure encrypted email delivery of transcripts",
      "SOC 2 Type II certified infrastructure",
    ],
    highlight: "Always verify HIPAA compliance and request a BAA before implementing any AI solution in healthcare settings.",
  },
  {
    id: 6,
    icon: MessageSquare,
    question: "What happens if the AI receptionist can't answer a caller's question?",
    answer: "Well-designed AI receptionists have graceful fallback protocols to ensure callers never feel stuck or frustrated.",
    details: [
      "Transfer calls to available staff members",
      "Take detailed messages for callback",
      "Offer to schedule a consultation",
      "Provide alternative contact methods",
      "Recognize when outside knowledge base",
      "Log all interactions for team follow-up",
    ],
    highlight: "The AI knows its limitations and ensures every caller gets their needs addressed, even if that means connecting them with a human.",
  },
  {
    id: 7,
    icon: Clock,
    question: "How quickly can an AI receptionist be set up for my business?",
    answer: "Most AI receptionist solutions can be operational within 24-48 hours with guided onboarding support.",
    details: [
      "Choose or port your existing phone number",
      "Configure business hours and holiday schedules",
      "Customize greetings and responses",
      "Connect calendar integrations",
      "Set up team notifications",
      "Run test calls before going live",
    ],
    highlight: "Complex customizations may take 1-2 weeks, but basic setup is typically same-day.",
  },
  {
    id: 8,
    icon: Users,
    question: "Will callers know they're talking to an AI and not a human?",
    answer: "Modern AI receptionists sound remarkably natural, but ethical best practices require disclosure that callers are interacting with an AI system.",
    details: [
      "Human-like voices with natural conversation patterns",
      "Transparent disclosure of AI interaction",
      "Callers appreciate immediate, efficient service",
      "No frustrating hold times or phone trees",
      "Studies show high caller satisfaction when AI delivers helpful service",
    ],
    highlight: "Most callers prefer an AI that answers immediately over waiting on hold or leaving voicemail.",
  },
  {
    id: 9,
    icon: Calendar,
    question: "Can an AI receptionist book appointments directly into my calendar?",
    answer: "Yes, AI receptionists integrate with popular calendar systems for real-time availability checking and automated booking.",
    details: [
      "Google Calendar integration",
      "Microsoft Outlook integration",
      "Calendly and scheduling tool integration",
      "Practice management software integration",
      "Real-time availability checking",
      "Automatic double-booking prevention",
      "Buffer time respect between appointments",
      "Instant confirmation emails to all parties",
    ],
    highlight: "Eliminate scheduling back-and-forth—the AI handles it all in a single call.",
  },
  {
    id: 10,
    icon: Phone,
    question: "What happens to calls after business hours with an AI receptionist?",
    answer: "Unlike voicemail where 80% of callers hang up, AI receptionists answer every after-hours call live to capture leads and serve customers.",
    details: [
      "Book appointments for the next business day",
      "Provide essential business information",
      "Handle urgent call routing based on keywords",
      "Collect detailed messages with caller intent",
      "Send immediate notifications to on-call staff",
      "67% of callers who reach voicemail call a competitor instead",
    ],
    highlight: "After-hours calls represent your best leads—they're actively searching for help when competitors are closed.",
  },
  {
    id: 11,
    icon: CheckCircle2,
    question: "How does an AI receptionist improve customer experience?",
    answer: "AI receptionists improve customer experience through instant response, 24/7 availability, and efficient service delivery.",
    details: [
      "Zero hold times—instant answer on first ring",
      "24/7 availability including evenings, weekends, and holidays",
      "Consistent, professional greetings every time",
      "Accurate information delivery",
      "Efficient appointment booking in minutes",
      "Immediate confirmation emails",
      "Automated follow-up reminders",
    ],
    highlight: "Callers get their needs met faster without waiting for callbacks or navigating frustrating phone trees.",
  },
  {
    id: 12,
    icon: Settings,
    question: "Can I customize what the AI receptionist says and how it handles calls?",
    answer: "Absolutely. AI receptionists are highly customizable through easy-to-use dashboards for ongoing adjustments.",
    details: [
      "Personalized greeting scripts",
      "Custom business name pronunciation",
      "Industry-specific FAQ responses",
      "Configurable appointment types and durations",
      "Custom qualifying questions for leads",
      "Flexible call routing rules",
      "Multiple voice options (male/female, different tones)",
      "Multi-language support",
    ],
    highlight: "Your AI receptionist sounds and acts like an extension of your team, not a generic robot.",
  },
  {
    id: 13,
    icon: Globe,
    question: "What industries benefit most from AI receptionists?",
    answer: "AI receptionists provide significant value across many industries, particularly those with high call volumes or after-hours needs.",
    details: [
      "Healthcare: Medical, dental, veterinary, chiropractic, therapy practices",
      "Legal: Law firms, attorneys, legal services",
      "Financial: Accounting firms, financial advisors, insurance agencies",
      "Real estate: Agencies, property management",
      "Home services: HVAC, plumbing, electrical contractors",
      "Personal services: Salons, spas, wellness centers",
      "Professional services: Consulting firms, agencies",
    ],
    highlight: "Any business that receives phone calls and wants to capture every opportunity can benefit from an AI receptionist.",
  },
  {
    id: 14,
    icon: Headphones,
    question: "How do AI receptionists handle multiple calls at once?",
    answer: "Unlike human receptionists limited to one call at a time, AI receptionists handle unlimited concurrent calls simultaneously.",
    details: [
      "No busy signals ever",
      "No hold queues or wait times",
      "Each caller receives immediate, personalized attention",
      "Perfect for peak periods and call volume spikes",
      "Handles marketing campaign response surges",
      "Scales automatically during emergencies",
    ],
    highlight: "Your business never misses an opportunity due to capacity constraints—every caller gets answered instantly.",
  },
  {
    id: 15,
    icon: BarChart3,
    question: "What kind of reporting and analytics do AI receptionists provide?",
    answer: "AI receptionist platforms provide comprehensive analytics to help optimize staffing, marketing, and operations.",
    details: [
      "Total call volume and trends over time",
      "Peak calling hours and days identification",
      "Average call duration metrics",
      "Appointment booking conversion rates",
      "Common caller questions and topics",
      "Call outcomes breakdown (booked, transferred, message)",
      "Missed call recovery tracking",
      "Caller sentiment analysis",
    ],
    highlight: "Data-driven insights help you understand your callers better and continuously improve your customer service.",
  },
];

export default function WhyUseAIReceptionistPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-primary-500">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary-500">Blog</Link>
            <span>/</span>
            <span className="text-gray-900">Why Use an AI Receptionist</span>
          </nav>

          {/* Category Tag */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              Business Guide
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            15 Reasons Your Business Needs an AI Receptionist in 2026: Complete FAQ Guide
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            Everything you need to know about AI receptionists—from costs and compliance to setup and ROI.
            Get answers to the most common questions businesses ask before making the switch.
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              January 13, 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              15 min read
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              15 FAQs answered
            </span>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
            <img
              src="https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Professional using AI receptionist technology for business calls"
              className="w-full h-64 md:h-96 object-cover"
            />
            <p className="text-xs text-gray-400 p-2 bg-gray-50">Photo by Mikhail Nilov on Pexels</p>
          </div>
        </div>
      </section>

      {/* Quick Summary Box */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary-500" />
              Quick Summary: Why Use an AI Receptionist?
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Save 85-95%</strong> compared to hiring staff</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>24/7/365 availability</strong> with zero hold times</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>HIPAA compliant</strong> for healthcare practices</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Setup in 24-48 hours</strong> with guided onboarding</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Unlimited concurrent calls</strong>—no busy signals</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Direct calendar booking</strong> with integrations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            {faqs.map((faq) => (
              <a
                key={faq.id}
                href={`#faq-${faq.id}`}
                className="text-gray-600 hover:text-primary-500 py-1"
              >
                {faq.id}. {faq.question.replace('?', '')}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed">
              Every missed call is a missed opportunity. Studies show that <strong>80% of callers won't leave a voicemail</strong>,
              and <strong>67% will call a competitor</strong> if they can't reach you. In today's fast-paced business environment,
              an AI receptionist isn't just a nice-to-have—it's essential for capturing leads, serving customers, and growing your business.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              But what exactly is an AI receptionist? How much does it cost? Is it secure enough for healthcare?
              Below, we answer the <strong>15 most common questions</strong> businesses ask before implementing an AI receptionist.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqs.map((faq) => {
              const IconComponent = faq.icon;
              return (
                <article
                  key={faq.id}
                  id={`faq-${faq.id}`}
                  className="scroll-mt-24 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  {/* Question */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-primary-500 uppercase tracking-wider">
                        Question {faq.id}
                      </span>
                      <h2
                        className="text-xl md:text-2xl font-bold text-gray-900 mt-1"
                        itemProp="name"
                      >
                        {faq.question}
                      </h2>
                    </div>
                  </div>

                  {/* Answer */}
                  <div
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                  >
                    {/* Short Answer - Optimized for featured snippets */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <p
                        className="text-gray-800 font-medium"
                        itemProp="text"
                      >
                        <strong>Answer:</strong> {faq.answer}
                      </p>
                    </div>

                    {/* Detailed Points */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                        Key Points:
                      </h3>
                      <ul className="space-y-2">
                        {faq.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highlight Box */}
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                      <p className="text-amber-900 text-sm font-medium">
                        <strong>Key Takeaway:</strong> {faq.highlight}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Implementation Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Get Started with an AI Receptionist
          </h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Choose a Provider', desc: 'Select a HIPAA-compliant AI receptionist that fits your industry needs and budget.' },
              { step: 2, title: 'Configure Your Number', desc: 'Get a new business number or port your existing number to the AI system.' },
              { step: 3, title: 'Customize Your Setup', desc: 'Set up greetings, FAQ responses, business hours, and call handling rules.' },
              { step: 4, title: 'Connect Integrations', desc: 'Link your calendar, CRM, and practice management software for seamless booking.' },
              { step: 5, title: 'Test and Launch', desc: 'Run test calls, train your team on the dashboard, and go live!' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="flex-shrink-0 h-10 w-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Line Summary */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              The Bottom Line: Should You Use an AI Receptionist?
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              If your business receives phone calls and you want to:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                <span>Never miss another call or lead</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                <span>Provide 24/7 availability without hiring night staff</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                <span>Reduce costs by 85-95% compared to human receptionists</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                <span>Improve customer experience with instant responses</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                <span>Automate appointment booking and follow-ups</span>
              </li>
            </ul>
            <p className="text-gray-300 text-lg mb-8">
              <strong className="text-white">Then yes—an AI receptionist is the right choice for your business.</strong>
              {' '}The technology has matured, costs have dropped, and the ROI is clear. Start with a free trial
              to see the difference it makes.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Start Your Free 14-Day Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/law-firm-never-miss-client-call" className="group">
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <span className="text-xs font-medium text-blue-600">Legal</span>
                <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-primary-500">
                  How Law Firms Can Capture Every Potential Client Call
                </h3>
              </div>
            </Link>
            <Link href="/blog/medical-practice-patient-experience" className="group">
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <span className="text-xs font-medium text-red-600">Medical</span>
                <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-primary-500">
                  Reducing Patient Hold Times with AI-Assisted Call Handling
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Never Miss a Call Again?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of businesses using Bright Secure's AI receptionist.
            Start your free 14-day trial today—no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-primary-500 hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="text-primary-500 font-bold text-xl">Bright Secure</Link>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
              <Link href="/privacy#healthcare-compliance" className="hover:text-gray-900">HIPAA Notice</Link>
              <a href="mailto:support@brightsecure.com" className="hover:text-gray-900">Contact</a>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Bright Secure. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
