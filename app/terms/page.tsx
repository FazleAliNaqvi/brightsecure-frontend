import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Bright Secure',
  description: 'Terms and conditions for using Bright Secure AI receptionist services. Read our service agreement, usage policies, and legal terms.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">
            Last Updated: January 13, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">

            {/* Agreement */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Bright Secure Inc.
                ("Bright Secure," "we," "us," or "our") governing your access to and use of our AI receptionist platform,
                dashboard, website, and related services (collectively, the "Services").
              </p>
              <p className="text-gray-700 mb-4">
                By creating an account, accessing, or using our Services, you acknowledge that you have read, understood,
                and agree to be bound by these Terms and our{' '}
                <Link href="/privacy" className="text-primary-500 hover:text-primary-600">Privacy Policy</Link>.
                If you do not agree to these Terms, you may not use our Services.
              </p>
              <p className="text-gray-700 mb-4">
                If you are using the Services on behalf of a business or organization, you represent and warrant that you
                have the authority to bind that entity to these Terms.
              </p>
            </div>

            {/* Service Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
              <p className="text-gray-700 mb-4">
                Bright Secure provides an AI-powered virtual receptionist service that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Answers incoming phone calls on behalf of your business</li>
                <li>Schedules appointments and manages calendar availability</li>
                <li>Records calls and generates transcripts</li>
                <li>Delivers call summaries via encrypted email</li>
                <li>Provides a dashboard for call management and analytics</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Our Services are designed to support—not replace—your existing staff. The AI receptionist handles calls
                when your team is busy, unavailable, or outside business hours.
              </p>
            </div>

            {/* Account Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration and Security</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Eligibility</h3>
              <p className="text-gray-700 mb-4">
                To use our Services, you must be at least 18 years old and capable of forming a binding contract.
                Our Services are available to businesses located in the United States and Canada.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Account Information</h3>
              <p className="text-gray-700 mb-4">
                You agree to provide accurate, current, and complete information during registration and to update
                such information as necessary. You are responsible for maintaining the confidentiality of your account
                credentials and for all activities that occur under your account.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3 Account Security</h3>
              <p className="text-gray-700 mb-4">
                You must notify us immediately at{' '}
                <a href="mailto:support@brightsecure.com" className="text-primary-500 hover:text-primary-600">
                  support@brightsecure.com
                </a>{' '}
                if you suspect any unauthorized access to your account. We are not liable for any loss or damage
                arising from unauthorized use of your credentials.
              </p>
            </div>

            {/* Subscription and Payment */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription and Payment</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Subscription Plans</h3>
              <p className="text-gray-700 mb-4">
                Our Services are offered on a subscription basis. Current pricing and plan features are available on our{' '}
                <Link href="/pricing" className="text-primary-500 hover:text-primary-600">Pricing page</Link>.
                We reserve the right to modify pricing with 30 days' notice to existing subscribers.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Billing Cycle</h3>
              <p className="text-gray-700 mb-4">
                Subscriptions are billed monthly in advance. Your subscription automatically renews each billing cycle
                unless cancelled. All fees are quoted and charged in United States dollars (USD).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.3 Payment Methods</h3>
              <p className="text-gray-700 mb-4">
                Payment is processed through our third-party payment processor, Stripe. By providing payment information,
                you authorize us to charge your payment method for all fees due. You are responsible for keeping your
                payment information current.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.4 Failed Payments</h3>
              <p className="text-gray-700 mb-4">
                If a payment fails, we will attempt to process the charge again and notify you via email. If payment
                cannot be collected after reasonable attempts, we may suspend or terminate your access to the Services.
                Late payments may incur a fee of $10 plus interest at 1.5% per month on the outstanding balance.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.5 Refund Policy</h3>
              <p className="text-gray-700 mb-4">
                Subscription fees are generally non-refundable. However, if you cancel within the first 14 days of your
                initial subscription and have not used more than 30 minutes of AI receptionist time, you may request a
                full refund by contacting support.
              </p>
            </div>

            {/* Free Trial */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Free Trial</h2>
              <p className="text-gray-700 mb-4">
                We may offer a free trial period for new subscribers. During the trial, you will have access to
                the Services as described at signup. At the end of the trial period, your subscription will
                automatically convert to a paid plan unless you cancel before the trial ends.
              </p>
              <p className="text-gray-700 mb-4">
                We reserve the right to limit free trials to one per business and to modify or discontinue
                free trial offers at any time.
              </p>
            </div>

            {/* Acceptable Use */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Acceptable Use Policy</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 Permitted Uses</h3>
              <p className="text-gray-700 mb-4">
                You may use the Services only for lawful business purposes in accordance with these Terms. You are
                responsible for ensuring that your use of the Services complies with all applicable laws and regulations,
                including healthcare privacy laws if applicable.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 Prohibited Activities</h3>
              <p className="text-gray-700 mb-4">You agree NOT to use the Services to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Violate any applicable law, regulation, or third-party rights</li>
                <li>Engage in fraudulent, deceptive, or misleading conduct</li>
                <li>Transmit content that is defamatory, obscene, threatening, or harassing</li>
                <li>Promote discrimination, hatred, or violence against any individual or group</li>
                <li>Distribute illegal substances or engage in illegal activities</li>
                <li>Collect or harvest personal information without proper consent</li>
                <li>Interfere with or disrupt the integrity or performance of the Services</li>
                <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                <li>Use automated means to access the Services without our permission</li>
                <li>Resell, redistribute, or sublicense the Services without authorization</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.3 Industry Restrictions</h3>
              <p className="text-gray-700 mb-4">
                We reserve the right to refuse or terminate service to any business whose activities we determine,
                in our sole discretion, to be harmful, unethical, or incompatible with our Services. This includes
                businesses that may expose our systems or personnel to illegal content or unsafe conditions.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.1 Our Property</h3>
              <p className="text-gray-700 mb-4">
                The Services, including all software, algorithms, designs, text, graphics, and other content
                (excluding your data), are owned by Bright Secure and protected by intellectual property laws.
                We grant you a limited, non-exclusive, non-transferable license to access and use the Services
                solely for your internal business purposes during your subscription period.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.2 Your Content</h3>
              <p className="text-gray-700 mb-4">
                You retain ownership of all data, content, and information you provide to the Services ("Your Content").
                By using the Services, you grant us a limited license to use Your Content solely to provide and improve
                the Services. This includes processing call data, generating transcripts, and enhancing AI performance.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.3 Feedback</h3>
              <p className="text-gray-700 mb-4">
                If you provide suggestions, ideas, or feedback about the Services, we may use such feedback without
                any obligation to compensate you.
              </p>
            </div>

            {/* Caller Data */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Caller Data and Recordings</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.1 Data Controller Status</h3>
              <p className="text-gray-700 mb-4">
                You acknowledge that you are the data controller for all caller information collected through
                your AI receptionist. You are responsible for providing appropriate notice to callers about
                data collection and for complying with applicable privacy laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.2 Call Recording Consent</h3>
              <p className="text-gray-700 mb-4">
                Our AI receptionist provides an automated disclosure to callers that the call may be recorded.
                You are responsible for ensuring that call recording complies with applicable laws in your
                jurisdiction, including any two-party consent requirements.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.3 Healthcare Data</h3>
              <p className="text-gray-700 mb-4">
                If you are a covered entity under HIPAA, you must execute our Business Associate Agreement before
                using the Services for any purpose involving Protected Health Information. You remain responsible
                for your HIPAA compliance obligations as a covered entity.
              </p>
            </div>

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Services and Integrations</h2>
              <p className="text-gray-700 mb-4">
                Our Services may integrate with or link to third-party services such as calendars, CRM systems,
                and communication platforms. Your use of such third-party services is governed by their respective
                terms and privacy policies. We are not responsible for the availability, accuracy, or practices
                of third-party services.
              </p>
            </div>

            {/* Service Availability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Service Availability and Modifications</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.1 Availability</h3>
              <p className="text-gray-700 mb-4">
                We strive to provide reliable, 24/7 service availability. However, we do not guarantee uninterrupted
                access and may occasionally experience downtime for maintenance, updates, or circumstances beyond our control.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.2 Modifications</h3>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time.
                We will provide reasonable notice of material changes that may adversely affect your use of the Services.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Disclaimers</h2>
              <p className="text-gray-700 mb-4 uppercase text-sm">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS,
                IMPLIED, OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING
                IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-gray-700 mb-4">
                We do not warrant that the Services will be uninterrupted, error-free, or completely secure.
                We do not guarantee the accuracy of AI-generated transcripts or the AI receptionist's responses
                in all situations. You acknowledge that AI technology has inherent limitations.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4 uppercase text-sm">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, BRIGHT SECURE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, BUSINESS OPPORTUNITIES,
                OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES, REGARDLESS OF THE THEORY OF LIABILITY.
              </p>
              <p className="text-gray-700 mb-4 uppercase text-sm">
                OUR TOTAL LIABILITY FOR ALL CLAIMS ARISING UNDER THESE TERMS SHALL NOT EXCEED THE GREATER OF (A) THE
                AMOUNT YOU PAID US IN THE THREE MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100).
              </p>
              <p className="text-gray-700 mb-4">
                Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability.
                In such jurisdictions, our liability shall be limited to the maximum extent permitted by law.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify, defend, and hold harmless Bright Secure and its officers, directors, employees,
                and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable
                attorneys' fees) arising out of or related to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Your use of the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any applicable law or third-party rights</li>
                <li>Any content or data you provide through the Services</li>
              </ul>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Termination</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">14.1 Termination by You</h3>
              <p className="text-gray-700 mb-4">
                You may cancel your subscription at any time through your account dashboard or by contacting support.
                Cancellation takes effect at the end of your current billing cycle, and you will retain access until then.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">14.2 Termination by Us</h3>
              <p className="text-gray-700 mb-4">
                We may suspend or terminate your access to the Services immediately, without prior notice, if we
                reasonably believe you have violated these Terms, engaged in fraudulent activity, or if continued
                service would expose us to legal liability.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">14.3 Effect of Termination</h3>
              <p className="text-gray-700 mb-4">
                Upon termination, your right to use the Services ceases immediately. You have 30 days after
                termination to download your data through the dashboard. After this period, we may delete your
                data in accordance with our data retention policies.
              </p>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Dispute Resolution</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.1 Informal Resolution</h3>
              <p className="text-gray-700 mb-4">
                Before initiating formal dispute proceedings, you agree to first contact us at{' '}
                <a href="mailto:legal@brightsecure.com" className="text-primary-500 hover:text-primary-600">
                  legal@brightsecure.com
                </a>{' '}
                to attempt informal resolution. We will make good faith efforts to resolve disputes within 30 days.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.2 Binding Arbitration</h3>
              <p className="text-gray-700 mb-4">
                If informal resolution is unsuccessful, any dispute arising under these Terms shall be resolved
                through binding arbitration administered by the American Arbitration Association in accordance with
                its Commercial Arbitration Rules. The arbitration shall take place in the jurisdiction where your
                business is located, or remotely if mutually agreed.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.3 Class Action Waiver</h3>
              <p className="text-gray-700 mb-4">
                You agree that disputes will be resolved on an individual basis and that you will not bring or
                participate in any class action, collective action, or representative proceeding against Bright Secure.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.4 Exceptions</h3>
              <p className="text-gray-700 mb-4">
                Notwithstanding the above, either party may seek injunctive relief in any court of competent
                jurisdiction for violations of intellectual property rights or confidentiality obligations.
              </p>
            </div>

            {/* General Provisions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. General Provisions</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.1 Governing Law</h3>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware,
                United States, without regard to its conflict of law provisions.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.2 Entire Agreement</h3>
              <p className="text-gray-700 mb-4">
                These Terms, together with our Privacy Policy and any applicable Business Associate Agreement,
                constitute the entire agreement between you and Bright Secure regarding the Services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.3 Severability</h3>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions shall
                continue in full force and effect.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.4 Waiver</h3>
              <p className="text-gray-700 mb-4">
                Our failure to enforce any right or provision of these Terms shall not constitute a waiver of
                such right or provision.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.5 Assignment</h3>
              <p className="text-gray-700 mb-4">
                You may not assign or transfer these Terms without our prior written consent. We may assign
                these Terms without restriction.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.6 Notices</h3>
              <p className="text-gray-700 mb-4">
                We may provide notices to you via email to the address associated with your account or by
                posting on our website. Notices to us should be sent to{' '}
                <a href="mailto:legal@brightsecure.com" className="text-primary-500 hover:text-primary-600">
                  legal@brightsecure.com
                </a>.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Changes to These Terms</h2>
              <p className="text-gray-700 mb-4">
                We may revise these Terms from time to time. If we make material changes, we will notify you
                via email or through the Services at least 30 days before the changes take effect. Your continued
                use of the Services after the effective date constitutes acceptance of the revised Terms.
              </p>
              <p className="text-gray-700 mb-4">
                If you do not agree to the revised Terms, you must stop using the Services and cancel your
                subscription before the changes take effect.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mt-4">
                <p className="text-gray-700 mb-2"><strong>Bright Secure Inc.</strong></p>
                <p className="text-gray-700 mb-2">Legal Department</p>
                <p className="text-gray-700 mb-2">
                  Email:{' '}
                  <a href="mailto:legal@brightsecure.com" className="text-primary-500 hover:text-primary-600">
                    legal@brightsecure.com
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  Support:{' '}
                  <a href="mailto:support@brightsecure.com" className="text-primary-500 hover:text-primary-600">
                    support@brightsecure.com
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
            Have questions about our terms?
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
