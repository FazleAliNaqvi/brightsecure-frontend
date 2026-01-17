'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui';

export default function AccountingFirmArticle() {
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
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            Accounting
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Surviving Tax Season: How AI Receptionists Help Accounting Firms Handle 10x Call Volume
        </h1>
        <div className="flex items-center gap-6 text-gray-500">
          <span className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            January 8, 2026
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            5 min read
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Accountant working with calculator and documents"
            className="w-full h-[400px] object-cover"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Photo by Nataliya Vaitkevich on Pexels
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Every CPA knows the feeling: January hits, and suddenly your phone never stops
            ringing. Tax season transforms a manageable practice into a high-pressure
            environment where every missed call could mean a lost client—or worse, an
            extension deadline missed.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            The Tax Season Call Volume Challenge
          </h2>
          <p className="text-gray-600 mb-6">
            During off-season months, a typical accounting firm might receive 15-20 calls
            per day. But from January through April 15th, that number can spike to 150+
            calls daily. That's a 10x increase in volume with the same staff.
          </p>
          <p className="text-gray-600 mb-6">
            The calls are relentless: "Where's my refund?" "Did you get my W-2?" "I need
            to schedule my tax appointment." "Can I file an extension?" "I just got a
            1099 I forgot about." Each call is important, but there's simply not enough
            time to handle them all.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
            <p className="text-green-800 font-medium text-lg">
              "During tax season, 67% of our calls were about scheduling and document status.
              Now the AI handles those, and my team focuses on actual tax preparation."
            </p>
            <p className="text-green-600 text-sm mt-2">— Robert Chen, CPA, Thompson Tax & Advisory</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Traditional Solutions Fall Short
          </h2>
          <p className="text-gray-600 mb-6">
            Accounting firms have tried various approaches to manage the seasonal surge:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Hiring temps:</strong> Training takes weeks, and quality varies wildly. By the time they're useful, tax season is half over.</li>
            <li><strong>Overtime for existing staff:</strong> Leads to burnout, errors, and turnover. Your best people leave after surviving one brutal season.</li>
            <li><strong>Voicemail during busy periods:</strong> Clients hate it. They'll call a competitor who answers.</li>
            <li><strong>Ignoring non-urgent calls:</strong> Impossible to know what's urgent until you answer.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            How AI Receptionist Support Transforms Tax Season
          </h2>
          <p className="text-gray-600 mb-6">
            AI receptionist support provides instant scalability without the staffing headaches.
            Here's how it works for accounting firms:
          </p>

          <div className="bg-gray-50 rounded-xl p-6 my-8">
            <h3 className="font-bold text-gray-900 mb-4">A Day in Tax Season: Before vs. After</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Before AI Support</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 9:00 AM: 5 calls waiting, receptionist overwhelmed</li>
                  <li>• 10:30 AM: Client on hold for 15 minutes, hangs up</li>
                  <li>• 12:00 PM: Lunch? What lunch?</li>
                  <li>• 2:00 PM: CPA interrupted 8 times for "quick questions"</li>
                  <li>• 5:00 PM: 23 missed calls, 4 angry voicemails</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">With AI Support</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 9:00 AM: AI handles overflow, no calls waiting</li>
                  <li>• 10:30 AM: Client scheduled, transcript sent to team</li>
                  <li>• 12:00 PM: Receptionist takes actual lunch break</li>
                  <li>• 2:00 PM: CPA works uninterrupted on returns</li>
                  <li>• 5:00 PM: 0 missed calls, all documented</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Common Call Types Handled by AI
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            1. Appointment Scheduling (35% of calls)
          </h3>
          <p className="text-gray-600 mb-6">
            "I need to schedule my tax appointment." The AI checks availability, books the
            appointment, sends confirmation, and adds a reminder—all without human intervention.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            2. Document Status Inquiries (25% of calls)
          </h3>
          <p className="text-gray-600 mb-6">
            "Did you receive my W-2?" The AI collects the caller's information and creates
            a support ticket for your team to check and respond, rather than interrupting
            a CPA mid-calculation.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            3. Extension Requests (15% of calls)
          </h3>
          <p className="text-gray-600 mb-6">
            "I need to file an extension." The AI collects the necessary information,
            explains the process, and schedules a callback if needed.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            4. New Client Inquiries (15% of calls)
          </h3>
          <p className="text-gray-600 mb-6">
            "Do you accept new clients?" The AI qualifies the lead, collects business
            information, and schedules an initial consultation. No new client slips away.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
            <h3 className="font-bold text-amber-800 mb-3">Security & Compliance</h3>
            <p className="text-amber-700 mb-4">
              Financial information requires the highest security standards. Bright Secure provides:
            </p>
            <ul className="space-y-2 text-amber-700">
              <li>• End-to-end encryption for all calls</li>
              <li>• SOC 2 Type II certified infrastructure</li>
              <li>• Secure transcript delivery to up to 4 team members</li>
              <li>• Compliant with IRS data handling requirements</li>
              <li>• Full audit trail for all client interactions</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            The ROI of AI Receptionist Support
          </h2>
          <p className="text-gray-600 mb-6">
            Let's look at the numbers for a typical 5-partner CPA firm:
          </p>

          <div className="bg-gray-50 rounded-xl p-6 my-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Cost of Missed Opportunities</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 20 missed calls/day × $500 avg client value = <strong>$10,000/day at risk</strong></li>
                  <li>• 10% conversion rate on new inquiries</li>
                  <li>• Potential loss: <strong>$50,000+ per tax season</strong></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Cost of AI Support</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Pro plan: $189/month</li>
                  <li>• 4-month tax season: <strong>$756 total</strong></li>
                  <li>• ROI: <strong>66x return</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Getting Ready for Next Tax Season
          </h2>
          <p className="text-gray-600 mb-6">
            The best time to implement AI receptionist support is before the rush starts.
            Here's a simple timeline:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>December:</strong> Set up your account and customize your greeting</li>
            <li><strong>Early January:</strong> Train your team on the transcript system</li>
            <li><strong>January 15:</strong> Go live with AI support for overflow calls</li>
            <li><strong>April 16:</strong> Take a well-deserved vacation</li>
          </ul>

          <p className="text-gray-600 mb-8">
            Your receptionist will have backup when they need it. Your CPAs will work
            uninterrupted. Your clients will always reach someone. And you'll capture
            every opportunity, even at 10x normal call volume.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Prepare for Tax Season Now
          </h3>
          <p className="text-gray-300 mb-6">
            Start your 14-day free trial. Set up in under 10 minutes.
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
            <Link href="/blog/law-firm-never-miss-client-call" className="group">
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <span className="text-xs text-blue-600 font-medium">Legal</span>
                <h4 className="font-semibold text-gray-900 mt-1 group-hover:text-primary-500 transition-colors">
                  How Law Firms Can Capture Every Potential Client Call
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
