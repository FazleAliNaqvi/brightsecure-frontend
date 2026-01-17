import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bright Secure',
  description: 'Learn how Bright Secure collects, uses, and protects your personal information. Our commitment to HIPAA and PIPEDA compliance.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Last Updated: January 13, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Bright Secure Inc. ("Bright Secure," "we," "us," or "our") provides AI-powered receptionist services
                to healthcare providers, professional service firms, and other businesses ("Subscribers"). This Privacy
                Policy describes how we collect, use, disclose, and protect information through our AI receptionist
                platform, subscriber dashboard, and website at brightsecure.com (collectively, the "Services").
              </p>
              <p className="text-gray-700 mb-4">
                By using our Services, you acknowledge that you have read and understood this Privacy Policy. If you
                do not agree with our practices, please do not use our Services.
              </p>
            </div>

            {/* Scope */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Scope of This Policy</h2>
              <p className="text-gray-700 mb-4">
                This Privacy Policy applies to information we collect from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Subscribers who register for and use our AI receptionist services</li>
                <li>Visitors to our website</li>
                <li>Individuals who contact us for support or inquiries</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Important Notice:</strong> When our AI receptionist handles calls on behalf of a Subscriber,
                the Subscriber—not Bright Secure—is the data controller for caller information. Each Subscriber
                determines how caller data is collected, used, and retained. We encourage callers to review the
                privacy practices of the business they are contacting.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Information from Subscribers</h3>
              <p className="text-gray-700 mb-4">When you create an account and use our Services, we collect:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Account Information:</strong> Business name, contact name, email address, phone number, and business type</li>
                <li><strong>Configuration Data:</strong> AI receptionist settings, voice preferences, greeting scripts, and appointment types</li>
                <li><strong>Integration Data:</strong> Information from connected calendars, CRM systems, or practice management software</li>
                <li><strong>Communication Records:</strong> Support tickets, emails, and chat conversations with our team</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Information from Callers</h3>
              <p className="text-gray-700 mb-4">
                On behalf of our Subscribers, our AI receptionist may collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Contact Details:</strong> Name, phone number, email address</li>
                <li><strong>Appointment Information:</strong> Preferred dates, times, and reason for visit</li>
                <li><strong>Call Content:</strong> Information shared during the conversation, which may include health-related information for medical practices</li>
                <li><strong>Recordings and Transcripts:</strong> Audio recordings and text transcriptions of calls</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">We automatically collect certain technical information:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, and interaction patterns</li>
                <li><strong>Network Information:</strong> IP address, referring URLs, and access timestamps</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use collected information to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Provide Services:</strong> Operate the AI receptionist, process appointments, and deliver call transcripts</li>
                <li><strong>Improve Our Platform:</strong> Analyze usage patterns, enhance AI accuracy, and develop new features</li>
                <li><strong>Communicate:</strong> Send service updates, respond to inquiries, and provide technical support</li>
                <li><strong>Ensure Security:</strong> Detect fraud, prevent abuse, and protect our systems</li>
                <li><strong>Meet Legal Obligations:</strong> Comply with applicable laws and respond to lawful requests</li>
                <li><strong>Process Payments:</strong> Manage subscriptions and billing through our payment processors</li>
              </ul>
            </div>

            {/* Call Recordings */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Call Recordings and Transcripts</h2>
              <p className="text-gray-700 mb-4">
                Our AI receptionist records calls and generates transcripts to provide our Services. Callers receive
                an automated notification at the beginning of each call informing them that the call may be recorded.
                By continuing the call after this notification, callers consent to recording.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Ownership:</strong> Recordings and transcripts belong to the Subscriber, not Bright Secure.
                Subscribers control how long recordings are retained and how they are used within their practice.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Encrypted Delivery:</strong> All transcripts are delivered via HIPAA-compliant encrypted email
                to designated recipients within the Subscriber's organization.
              </p>
            </div>

            {/* Data Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. How We Share Information</h2>
              <p className="text-gray-700 mb-4">
                <strong>We do not sell your personal information.</strong> We do not share personal information with
                third parties for their marketing purposes.
              </p>
              <p className="text-gray-700 mb-4">We may share information in the following circumstances:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>With Subscribers:</strong> Caller information is shared with the Subscriber whose AI receptionist handled the call</li>
                <li><strong>Service Providers:</strong> We work with trusted vendors for cloud hosting (AWS), email delivery, payment processing (Stripe), and telecommunications (Twilio)</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law, court order, or governmental authority</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, information may be transferred to the acquiring entity</li>
                <li><strong>With Consent:</strong> We may share information when you have given us explicit permission</li>
              </ul>
            </div>

            {/* Healthcare Compliance */}
            <div id="healthcare-compliance" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Healthcare Privacy Compliance</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.1 HIPAA Compliance (United States)</h3>
              <p className="text-gray-700 mb-4">
                For healthcare Subscribers subject to the Health Insurance Portability and Accountability Act (HIPAA),
                Bright Secure acts as a Business Associate. We:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Execute Business Associate Agreements (BAAs) with covered entities</li>
                <li>Implement administrative, physical, and technical safeguards for Protected Health Information (PHI)</li>
                <li>Use HIPAA-compliant encrypted email for all PHI transmissions</li>
                <li>Limit PHI access to authorized personnel only</li>
                <li>Maintain audit logs of PHI access and disclosure</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.2 PIPEDA Compliance (Canada)</h3>
              <p className="text-gray-700 mb-4">
                For Canadian Subscribers, we comply with the Personal Information Protection and Electronic Documents
                Act (PIPEDA) and applicable provincial privacy legislation by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Collecting personal information only for identified purposes</li>
                <li>Obtaining meaningful consent for collection and use</li>
                <li>Limiting collection to what is necessary for stated purposes</li>
                <li>Providing access to personal information upon request within 30 days</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement comprehensive security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Encryption:</strong> All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.2+</li>
                <li><strong>Infrastructure:</strong> Our systems are hosted on AWS with SOC 2 Type II certified data centers</li>
                <li><strong>Access Controls:</strong> Role-based access ensures only authorized personnel can access sensitive data</li>
                <li><strong>Monitoring:</strong> Continuous security monitoring and regular vulnerability assessments</li>
                <li><strong>Training:</strong> All employees complete privacy and security training</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Payment Security:</strong> We do not store payment card information. All payment processing is
                handled by Stripe, a PCI-DSS Level 1 certified payment processor.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Retention</h2>
              <p className="text-gray-700 mb-4">We retain information as follows:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Subscriber Accounts:</strong> Active account data is retained while your subscription is active. Upon cancellation, account data is deleted within 30 days unless longer retention is required by law</li>
                <li><strong>Call Recordings:</strong> Retained according to Subscriber preferences and applicable retention requirements. Default retention is 90 days unless otherwise specified</li>
                <li><strong>Billing Records:</strong> Retained for 7 years to comply with financial record-keeping requirements</li>
                <li><strong>Marketing Communications:</strong> Contact information is retained until you opt out or after 2 years of inactivity</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Your Privacy Rights</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.1 Rights for All Users</h3>
              <p className="text-gray-700 mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements</li>
                <li><strong>Portability:</strong> Receive your data in a structured, commonly used format</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.2 California Residents</h3>
              <p className="text-gray-700 mb-4">
                Under the California Consumer Privacy Act (CCPA), California residents have additional rights including
                the right to know what personal information is collected and the right to opt out of the sale of personal
                information. As stated above, we do not sell personal information.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.3 Exercising Your Rights</h3>
              <p className="text-gray-700 mb-4">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:privacy@brightsecure.com" className="text-primary-500 hover:text-primary-600">
                  privacy@brightsecure.com
                </a>
                . We will respond to verified requests within 30 days.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to operate our website and improve your experience:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.
              </p>
            </div>

            {/* Children */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our Services are designed for business use and are not directed at individuals under 18 years of age.
                We do not knowingly collect personal information from children. If we become aware that we have
                inadvertently collected information from a child, we will promptly delete it.
              </p>
            </div>

            {/* Geographic Limitations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Geographic Limitations</h2>
              <p className="text-gray-700 mb-4">
                Our Services are available to businesses located in the United States and Canada. Subscribers may
                not make our AI receptionist available to callers in jurisdictions outside these countries without
                our prior written consent.
              </p>
            </div>

            {/* Changes */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements.
                We will notify Subscribers of material changes via email and post the updated policy on our website with
                a revised "Last Updated" date. Your continued use of our Services after such changes constitutes
                acceptance of the updated policy.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mt-4">
                <p className="text-gray-700 mb-2"><strong>Bright Secure Inc.</strong></p>
                <p className="text-gray-700 mb-2">Privacy Inquiries</p>
                <p className="text-gray-700 mb-2">
                  Email:{' '}
                  <a href="mailto:privacy@brightsecure.com" className="text-primary-500 hover:text-primary-600">
                    privacy@brightsecure.com
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-4">
            Have questions about our privacy practices?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
