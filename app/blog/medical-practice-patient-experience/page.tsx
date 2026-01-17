'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui';

export default function MedicalPracticeArticle() {
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
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
            Medical
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Reducing Patient Hold Times: A Medical Practice's Guide to AI-Assisted Call Handling
        </h1>
        <div className="flex items-center gap-6 text-gray-500">
          <span className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            January 5, 2026
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            7 min read
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Medical receptionist at front desk"
            className="w-full h-[400px] object-cover"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Photo by Karolina Grabowska on Pexels
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Nothing frustrates patients more than being put on hold. In healthcare, where
            people are often anxious, unwell, or caring for sick family members, long wait
            times don't just hurt satisfaction scores—they can impact health outcomes when
            patients give up trying to reach you.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            The Hidden Cost of the Hold Button
          </h2>
          <p className="text-gray-600 mb-6">
            A recent healthcare study found that the average patient spends 18 minutes on
            hold when calling their doctor's office. Nearly 30% of callers hang up before
            ever speaking to anyone. What happens to those patients?
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>Some delay care, potentially worsening their condition</li>
            <li>Others seek care elsewhere, impacting practice revenue</li>
            <li>Many turn to urgent care or emergency rooms for non-emergencies</li>
            <li>Patient satisfaction and retention both suffer</li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-lg">
            <p className="text-red-800 font-medium text-lg">
              "30% of patients who can't reach their doctor's office on the first call
              will seek care somewhere else."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Understanding Your Call Volume Patterns
          </h2>
          <p className="text-gray-600 mb-6">
            Medical practices experience predictable call surges that overwhelm front desk
            staff:
          </p>

          <div className="bg-gray-50 rounded-xl p-6 my-8">
            <h3 className="font-bold text-gray-900 mb-4">Peak Call Times in Medical Practices</h3>
            <ul className="text-gray-600 space-y-3">
              <li><strong>8:00-9:30 AM:</strong> Morning rush—same-day appointments, sick calls, prescription refills from overnight</li>
              <li><strong>11:30 AM-1:00 PM:</strong> Lunch hour callers who couldn't call during work</li>
              <li><strong>4:00-5:00 PM:</strong> End-of-day rush before closing, prescription requests before pharmacies close</li>
              <li><strong>Monday mornings:</strong> Weekend illness accumulation, highest volume of the week</li>
            </ul>
          </div>

          <p className="text-gray-600 mb-6">
            During these peaks, even the best receptionist can only handle one call at a time.
            The result? Hold times spike, patients get frustrated, and staff feels overwhelmed.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            How AI Call Support Transforms Patient Access
          </h2>
          <p className="text-gray-600 mb-6">
            AI receptionist support doesn't replace your front desk team—it gives them
            superhuman backup. When your receptionist is on a call, helping a patient at
            the window, or processing insurance, the AI seamlessly handles incoming calls.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Prescription Refill Management
          </h3>
          <p className="text-gray-600 mb-6">
            Refill requests account for roughly 25% of all calls to primary care practices.
            These calls follow a predictable pattern: patient name, date of birth, medication,
            pharmacy. The AI collects this information and routes it directly to your clinical
            staff for approval—no hold time required.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Appointment Scheduling & Changes
          </h3>
          <p className="text-gray-600 mb-6">
            About 30% of calls involve scheduling. The AI checks availability, offers options,
            confirms appointments, and sends reminders—all while your human team focuses on
            the patients in front of them.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Symptom Triage & Routing
          </h3>
          <p className="text-gray-600 mb-6">
            For calls requiring clinical guidance, the AI gathers initial symptom information
            and routes appropriately. Urgent concerns are flagged immediately; routine questions
            are documented for callback. Your nurses spend time on clinical work, not intake.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="font-bold text-blue-800 mb-3">HIPAA Compliance Built-In</h3>
            <p className="text-blue-700 mb-4">
              Every aspect of Bright Secure is designed for healthcare:
            </p>
            <ul className="space-y-2 text-blue-700">
              <li>• Full HIPAA compliance with BAA provided</li>
              <li>• End-to-end encryption for all calls and transcripts</li>
              <li>• PIPEDA compliant for Canadian practices</li>
              <li>• Secure transcript delivery to designated staff only</li>
              <li>• Complete audit trail for compliance documentation</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Real Impact: What Practices Are Seeing
          </h2>

          <div className="bg-gray-50 rounded-xl p-6 my-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-1">60%</div>
                <p className="text-gray-600 text-sm">reduction in patient hold times</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-1">40%</div>
                <p className="text-gray-600 text-sm">decrease in front desk stress</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-1">90%</div>
                <p className="text-gray-600 text-sm">of routine calls handled automatically</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Implementation That Works With Your EHR
          </h2>
          <p className="text-gray-600 mb-6">
            The concern we hear most from practice managers: "Will this integrate with our
            systems?" The good news: Bright Secure is designed to work alongside your existing
            workflow, not replace it.
          </p>
          <p className="text-gray-600 mb-6">
            Call transcripts and patient information are delivered via secure email to your
            designated staff members. They can then update your EHR as part of their normal
            workflow. There's no complex integration required to get started.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            The Patient Perspective
          </h2>
          <p className="text-gray-600 mb-6">
            What do patients experience? Instead of holding for 18 minutes, they're greeted
            immediately. The AI handles their request professionally and efficiently. They
            receive a confirmation of next steps. They feel heard.
          </p>
          <p className="text-gray-600 mb-6">
            For patients who need to speak with a human, the AI captures their information
            and schedules a callback—so when your staff does call back, they have context
            and can provide better service.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
            <h3 className="font-bold text-green-800 mb-3">Patient Feedback</h3>
            <p className="text-green-700 italic">
              "I was surprised when someone actually answered right away. Usually I'm on
              hold for 15-20 minutes. The AI scheduled my appointment and I got a
              confirmation email immediately. Much better experience."
            </p>
            <p className="text-green-600 text-sm mt-2">— Patient at Riverside Family Medicine</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Getting Started
          </h2>
          <p className="text-gray-600 mb-6">
            Implementation takes about 10 minutes. Customize your greeting, set up call
            forwarding, and designate up to 4 staff members to receive transcripts per phone
            line. Your front desk keeps doing what they do best—with AI backup when they
            need it.
          </p>
          <p className="text-gray-600 mb-8">
            Your patients will notice the difference immediately. Your staff will feel the
            relief. And your practice will run more smoothly than ever.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Improve Patient Access Today
          </h3>
          <p className="text-gray-300 mb-6">
            14-day free trial. HIPAA compliant from day one.
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
            <Link href="/blog/veterinary-clinic-emergency-calls" className="group">
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <span className="text-xs text-amber-600 font-medium">Veterinary</span>
                <h4 className="font-semibold text-gray-900 mt-1 group-hover:text-primary-500 transition-colors">
                  After-Hours Pet Emergencies: How Veterinary Clinics Provide 24/7 Support
                </h4>
              </div>
            </Link>
            <Link href="/blog/law-firm-never-miss-client-call" className="group">
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <span className="text-xs text-blue-600 font-medium">Legal</span>
                <h4 className="font-semibold text-gray-900 mt-1 group-hover:text-primary-500 transition-colors">
                  How Law Firms Can Capture Every Potential Client Call
                </h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
