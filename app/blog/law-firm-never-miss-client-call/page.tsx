'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui';

export default function LawFirmArticle() {
  return (
    <article className="py-8">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Hero */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            Legal
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          How Law Firms Can Capture Every Potential Client Call—Even After Hours
        </h1>
        <div className="flex items-center gap-6 text-gray-500">
          <span className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            January 10, 2026
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            6 min read
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Lawyer working at desk with documents"
            className="w-full h-[400px] object-cover"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Photo by Sora Shimazaki on Pexels
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            For personal injury attorneys, family lawyers, and criminal defense practices,
            the difference between a new client and a missed opportunity often comes down
            to one thing: who answers the phone first. Studies show that 67% of legal calls
            go unanswered after hours—and those callers rarely leave voicemails.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            The Cost of Missed Calls in Legal Practice
          </h2>
          <p className="text-gray-600 mb-6">
            When a potential client calls your law firm, they're often in a moment of crisis.
            A car accident victim needs immediate guidance. A parent facing custody issues
            needs someone to listen. A person just arrested needs legal representation now,
            not tomorrow morning.
          </p>
          <p className="text-gray-600 mb-6">
            Research from the American Bar Association indicates that the average personal
            injury lead is worth over $1,200 in potential fees—and 73% of those leads go to
            the first attorney who responds. Every unanswered call represents not just lost
            revenue, but a person in need who didn't get help.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
            <p className="text-blue-800 font-medium text-lg">
              "73% of personal injury leads go to the first firm that responds. If you're
              not answering, your competitor is."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            The Receptionist's Dilemma
          </h2>
          <p className="text-gray-600 mb-6">
            Your receptionist is excellent at their job. But they can only handle one call
            at a time. When they're helping a client at the front desk, on another line, or
            at lunch—who's answering the phone? And what happens at 7 PM when a potential
            client finally has time to call after work?
          </p>
          <p className="text-gray-600 mb-6">
            Traditional solutions have significant drawbacks:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Voicemail:</strong> Only 20% of callers leave messages. The rest call your competitor.</li>
            <li><strong>Answering services:</strong> Often sound impersonal and can't capture case-specific details.</li>
            <li><strong>Hiring more staff:</strong> Expensive, and still doesn't solve the after-hours problem.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            How AI Receptionist Support Works for Law Firms
          </h2>
          <p className="text-gray-600 mb-6">
            AI receptionist support doesn't replace your front desk team—it empowers them.
            Here's how it works in practice:
          </p>

          <div className="bg-gray-50 rounded-xl p-6 my-8">
            <h3 className="font-bold text-gray-900 mb-4">Scenario: Tuesday, 8:47 PM</h3>
            <p className="text-gray-600 mb-4">
              Maria was just in a car accident. Her car is totaled, and the other driver's
              insurance company is already calling her. She searches "personal injury lawyer
              near me" and calls your firm.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Without AI support:</strong> Maria gets voicemail. She hangs up and calls
              the next firm on the list.
            </p>
            <p className="text-gray-600">
              <strong>With AI support:</strong> Maria is greeted professionally. The AI captures
              her name, contact information, accident details, and insurance information. It
              schedules a consultation for 9 AM the next morning. Maria receives a confirmation
              email, and you receive an encrypted transcript with all details.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Key Benefits for Law Firms
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            1. Capture Time-Sensitive Leads 24/7
          </h3>
          <p className="text-gray-600 mb-6">
            Personal injury cases, criminal arrests, and family emergencies happen around the
            clock. AI ensures every caller gets a professional response, no matter when they call.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            2. Protect Attorney-Client Privilege
          </h3>
          <p className="text-gray-600 mb-6">
            All calls are encrypted end-to-end. Transcripts are delivered securely to up to 4
            team members via HIPAA-compliant encrypted email. Your clients' sensitive information
            is protected from the first contact.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            3. Support Your Receptionist, Don't Replace Them
          </h3>
          <p className="text-gray-600 mb-6">
            The AI only steps in when your receptionist is unavailable—on another call, helping
            someone in person, at lunch, or after hours. When your team is available, they handle
            calls as usual.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            4. Detailed Case Information Capture
          </h3>
          <p className="text-gray-600 mb-6">
            The AI is trained to ask relevant questions: accident details, injury severity,
            insurance information, statute of limitations concerns. You receive comprehensive
            intake information before the first consultation.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
            <h3 className="font-bold text-green-800 mb-3">Results from Real Law Firms</h3>
            <ul className="space-y-2 text-green-700">
              <li>• 40% increase in after-hours consultations booked</li>
              <li>• 90% reduction in missed calls</li>
              <li>• Average 35% increase in qualified leads captured</li>
              <li>• $0 additional staff costs for 24/7 coverage</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Getting Started
          </h2>
          <p className="text-gray-600 mb-6">
            Implementing AI receptionist support takes less than 10 minutes. You customize your
            greeting, set up your call forwarding, and choose which team members receive transcripts.
            From there, every call is captured—and you never miss another potential client.
          </p>
          <p className="text-gray-600 mb-8">
            Your receptionist will thank you. Your clients will appreciate the immediate response.
            And your practice will grow with every call that used to go to voicemail.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Capture Every Lead?
          </h3>
          <p className="text-gray-300 mb-6">
            Start your 14-day free trial. No credit card required.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
              Start Free Trial
            </Button>
          </Link>
        </div>

        {/* Share */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Share this article</span>
            <div className="flex items-center gap-3">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Twitter className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Linkedin className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Facebook className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/accounting-firm-tax-season" className="group">
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <span className="text-xs text-green-600 font-medium">Accounting</span>
                <h4 className="font-semibold text-gray-900 mt-1 group-hover:text-primary-500 transition-colors">
                  Surviving Tax Season: How AI Receptionists Help Accounting Firms
                </h4>
              </div>
            </Link>
            <Link href="/blog/medical-practice-patient-experience" className="group">
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <span className="text-xs text-red-600 font-medium">Medical</span>
                <h4 className="font-semibold text-gray-900 mt-1 group-hover:text-primary-500 transition-colors">
                  Reducing Patient Hold Times: A Medical Practice's Guide
                </h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
