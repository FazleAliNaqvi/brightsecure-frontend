'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui';

export default function VeterinaryClinicArticle() {
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
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
            Veterinary
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          After-Hours Pet Emergencies: How Veterinary Clinics Provide 24/7 Support Without Burnout
        </h1>
        <div className="flex items-center gap-6 text-gray-500">
          <span className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            January 3, 2026
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
            src="https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Veterinarian examining a dog"
            className="w-full h-[400px] object-cover"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Photo by Tima Miroshnichenko on Pexels
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            When a beloved pet falls ill at 2 AM, pet owners don't wait until morning.
            They call—and when no one answers, panic sets in. For veterinary clinics,
            managing after-hours calls is a constant challenge that affects client
            retention, emergency triage, and staff wellbeing.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            The Reality of After-Hours Veterinary Calls
          </h2>
          <p className="text-gray-600 mb-6">
            Pet emergencies follow no schedule. A dog ingests chocolate on a Sunday
            evening. A cat shows signs of distress at midnight. A bird owner notices
            concerning symptoms after dinner. These pet owners need guidance immediately—
            not voicemail.
          </p>
          <p className="text-gray-600 mb-6">
            Industry data shows that veterinary clinics receive an average of 15-25 calls
            per night after closing. Of these:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>35% are true emergencies requiring immediate care</li>
            <li>40% are urgent but can wait until morning with guidance</li>
            <li>25% are routine questions that cause owner anxiety</li>
          </ul>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
            <p className="text-amber-800 font-medium text-lg">
              "85% of pet owners who can't reach their regular vet after hours will
              either drive to an emergency clinic unnecessarily or worry all night—
              both negative outcomes we can prevent."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            The Staff Burnout Problem
          </h2>
          <p className="text-gray-600 mb-6">
            Many veterinary clinics have tried rotating on-call duties among staff.
            The result? Exhausted veterinarians and technicians who are less effective
            during regular hours. The veterinary profession already faces significant
            burnout challenges—adding overnight phone duty only makes it worse.
          </p>
          <p className="text-gray-600 mb-6">
            Other clinics use answering services, but generic operators can't provide
            the specialized guidance pet owners need. They often default to "go to
            the emergency clinic" for everything, which creates unnecessary expense
            and stress for pet families.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            How AI Call Support Works for Veterinary Clinics
          </h2>
          <p className="text-gray-600 mb-6">
            AI receptionist support provides intelligent call handling specifically
            designed for veterinary practices. Here's what it means for your clinic:
          </p>

          <div className="bg-gray-50 rounded-xl p-6 my-8">
            <h3 className="font-bold text-gray-900 mb-4">Scenario: Saturday, 11:30 PM</h3>
            <p className="text-gray-600 mb-4">
              A worried pet owner calls because their Labrador just ate several chocolate
              chip cookies. They're panicking and unsure what to do.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Without AI support:</strong> They get voicemail, hang up, and either
              rush to the emergency vet (paying $300+ for a likely non-emergency) or stay
              up all night worrying.
            </p>
            <p className="text-gray-600">
              <strong>With AI support:</strong> The AI answers immediately, collects the
              dog's weight, the type and amount of chocolate consumed, and any symptoms.
              Based on your clinic's protocols, it provides appropriate guidance and
              creates a detailed transcript for your morning review. True emergencies
              are flagged immediately.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Key Capabilities for Veterinary Practices
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Intelligent Triage Questions
          </h3>
          <p className="text-gray-600 mb-6">
            The AI asks species-appropriate questions to assess urgency: breathing
            difficulty, consciousness level, blood presence, toxin exposure details,
            and symptom timeline. This information helps determine if immediate
            emergency care is needed.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Appointment Booking for Non-Emergencies
          </h3>
          <p className="text-gray-600 mb-6">
            For non-urgent concerns, the AI can schedule a next-day appointment,
            capturing the pet's name, species, and reason for visit. Pet owners
            feel heard, and you start your day with appointments already on the books.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Prescription Refill Management
          </h3>
          <p className="text-gray-600 mb-6">
            "Fluffy is almost out of her thyroid medication." These calls don't need
            to wait on hold or go to voicemail. The AI collects pet name, owner name,
            medication, and pharmacy preference—ready for your tech to process in
            the morning.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Secure Transcript Delivery
          </h3>
          <p className="text-gray-600 mb-6">
            Every call generates a detailed transcript delivered via encrypted email
            to up to 4 staff members. You arrive at the clinic knowing exactly what
            happened overnight, prioritized by urgency.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="font-bold text-blue-800 mb-3">Multi-Species Capability</h3>
            <p className="text-blue-700 mb-4">
              Bright Secure is configured to handle calls about:
            </p>
            <ul className="space-y-2 text-blue-700">
              <li>• Dogs and cats (small animal practice)</li>
              <li>• Exotic pets (birds, reptiles, small mammals)</li>
              <li>• Horses and livestock (equine/large animal)</li>
              <li>• Mixed practice configurations</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            What Veterinary Clinics Are Experiencing
          </h2>

          <div className="bg-gray-50 rounded-xl p-6 my-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-1">100%</div>
                <p className="text-gray-600 text-sm">of after-hours calls answered</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-1">45%</div>
                <p className="text-gray-600 text-sm">reduction in unnecessary ER referrals</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-1">30+</div>
                <p className="text-gray-600 text-sm">appointments captured weekly from after-hours calls</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
            <h3 className="font-bold text-green-800 mb-3">Clinic Feedback</h3>
            <p className="text-green-700 italic">
              "Before Bright Secure, I dreaded Monday mornings. We'd have 30 voicemails
              to sort through, half from panicked owners who'd already gone to the
              emergency clinic. Now every call is answered, documented, and waiting
              for us. Our clients feel supported, and my team isn't starting the week
              in crisis mode."
            </p>
            <p className="text-green-600 text-sm mt-2">— Dr. Amanda Foster, Lakeside Animal Hospital</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Supporting Your Team During Business Hours
          </h2>
          <p className="text-gray-600 mb-6">
            AI support isn't just for nights and weekends. During busy clinic hours,
            when your front desk is checking in patients, handling payments, or on
            another call, the AI seamlessly takes overflow calls. No more hold music.
            No more voicemail during lunch.
          </p>
          <p className="text-gray-600 mb-6">
            Your receptionist remains the primary contact—the AI only steps in when
            needed. It's backup support that ensures every pet owner reaches someone
            who can help, every time they call.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Implementation for Veterinary Clinics
          </h2>
          <p className="text-gray-600 mb-6">
            Getting started is straightforward:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>Customize your greeting with your clinic name and hours</li>
            <li>Set up call forwarding from your main line</li>
            <li>Designate up to 4 team members to receive transcripts</li>
            <li>Configure your emergency protocols and referral information</li>
          </ul>
          <p className="text-gray-600 mb-8">
            Within minutes, every call to your clinic will be answered—whether it's
            3 PM or 3 AM. Your clients will appreciate the support, your staff will
            appreciate the coverage, and you'll capture every opportunity to care
            for pets in need.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Never Miss Another Call
          </h3>
          <p className="text-gray-300 mb-6">
            14-day free trial. Support pet owners around the clock.
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
            <Link href="/blog/medical-practice-patient-experience" className="group">
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <span className="text-xs text-red-600 font-medium">Medical</span>
                <h4 className="font-semibold text-gray-900 mt-1 group-hover:text-primary-500 transition-colors">
                  Reducing Patient Hold Times: A Medical Practice's Guide
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
