import Link from 'next/link';
import { Button } from '@/components/ui';
import { VoiceDemo } from '@/components/demo';
import {
  OrganizationSchema,
  SoftwareApplicationSchema,
  WebsiteSchema,
  FAQSchema,
} from '@/components/seo';
import {
  Phone,
  Shield,
  Calendar,
  Mail,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  MessageSquare,
  Headphones,
  FileText,
  Zap,
  Globe,
  PhoneCall,
  PlayCircle
} from 'lucide-react';

// Homepage FAQ data for schema
const homepageFAQs = [
  {
    question: 'What is Bright Secure?',
    answer: 'Bright Secure is an AI-powered receptionist service that answers your business calls 24/7, books appointments, and sends HIPAA-compliant encrypted transcripts to your team.',
  },
  {
    question: 'Is Bright Secure HIPAA compliant?',
    answer: 'Yes, Bright Secure is fully HIPAA compliant. We also comply with PIPEDA (Canada) and GDPR (EU). All calls are encrypted, and we provide a Business Associate Agreement (BAA) with every account.',
  },
  {
    question: 'How much does Bright Secure cost?',
    answer: 'We offer three plans: Starter at $49/month (1 phone line, 100 minutes), Pro at $99/month (2 lines, 300 minutes), and Business at $199/month (5 lines, 1000 minutes). All plans include a 14-day free trial.',
  },
  {
    question: 'Does the AI replace my receptionist?',
    answer: 'No, Bright Secure supports your existing receptionist. The AI only steps in when your front desk is busy, away, or after hours—ensuring no call ever goes unanswered.',
  },
  {
    question: 'How quickly can I get started?',
    answer: 'Setup takes less than 10 minutes. Customize your greeting, set up call forwarding, and designate team members to receive transcripts. Start your 14-day free trial with no credit card required.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* SEO Schema Markup */}
      <OrganizationSchema />
      <WebsiteSchema />
      <SoftwareApplicationSchema />
      <FAQSchema faqs={homepageFAQs} />

      <div className="min-h-screen">
        {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary-500">Bright Secure</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-dark hover:text-primary-500 transition-colors">Features</a>
              <a href="#why-bright-secure" className="text-dark hover:text-primary-500 transition-colors">Why Us</a>
              <Link href="/pricing" className="text-dark hover:text-primary-500 transition-colors">Pricing</Link>
              <Link href="/industries" className="text-dark hover:text-primary-500 transition-colors">Industries</Link>
              <Link href="/blog" className="text-dark hover:text-primary-500 transition-colors">Blog</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight">
              Never Miss a Call.{' '}
              <span className="text-primary-500">Every Conversation Delivered Securely.</span>
            </h1>
            <p className="mt-6 text-xl text-light max-w-2xl mx-auto">
              AI receptionist answers your phones 24/7, books appointments, and sends
              encrypted transcripts to your team—HIPAA & PIPEDA compliant.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Start Free Trial
                </Button>
              </Link>
              <a href="#hear-it-live">
                <Button variant="secondary" size="lg" leftIcon={<PlayCircle className="h-5 w-5" />}>
                  Hear It Live
                </Button>
              </a>
            </div>
            <p className="mt-4 text-sm text-light">
              14-day free trial • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Voicemail Problem Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* The Problem */}
            <div>
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                The Voicemail Problem
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">
                When callers hit voicemail, you lose.
              </h2>
              <p className="mt-4 text-gray-300 text-lg">
                Studies show that <span className="text-white font-semibold">80% of callers won't leave a voicemail</span>.
                They hang up—and call the next business on their list. That's your competitor
                answering the call you should have taken.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-red-400">80%</div>
                  <p className="text-gray-400 text-sm mt-1">of callers hang up on voicemail</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-red-400">67%</div>
                  <p className="text-gray-400 text-sm mt-1">will call a competitor instead</p>
                </div>
              </div>
            </div>

            {/* The Solution */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8">
              <span className="text-primary-100 font-semibold text-sm uppercase tracking-wider">
                The Bright Secure Solution
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                Every call answered. Every caller helped.
              </h3>
              <p className="mt-4 text-primary-100">
                Our AI receptionist picks up instantly—no hold music, no voicemail, no lost
                opportunities. Callers get the help they need, and you get a complete
                transcript delivered to your inbox.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span>Answers in 2 rings, 24/7/365</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span>Books appointments on the spot</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span>Captures caller info your competitors miss</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Demo Section */}
      <section id="hear-it-live" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
                Hear It In Action
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-dark">
                Listen to an actual AI receptionist call
              </h2>
              <p className="mt-4 text-lg text-light">
                This is a real example of how our AI receptionist handles a new client
                calling an accounting firm. Natural conversation, appointment booking,
                and a transcript delivered instantly.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                  <span className="text-light">Natural, professional conversation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                  <span className="text-light">Collects all relevant information</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                  <span className="text-light">Books appointments automatically</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                  <span className="text-light">Full transcript emailed to your team</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/register">
                  <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                    Try It With Your Business
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <VoiceDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark">
              Everything you need to manage client communications
            </h2>
            <p className="mt-4 text-lg text-light max-w-2xl mx-auto">
              Built for healthcare and professional services that require the highest
              level of security and compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">AI Receptionist</h3>
              <p className="text-light">
                Natural-sounding AI that answers calls, takes messages, and books
                appointments around the clock.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-secondary-500" />
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">Encrypted Email</h3>
              <p className="text-light">
                HIPAA-compliant encrypted email via Paubox ensures patient information
                stays protected.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">Smart Scheduling</h3>
              <p className="text-light">
                Built-in calendar system with availability management and automated
                reminders.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 shadow-airbnb">
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">Auto Notifications</h3>
              <p className="text-light">
                Automatic confirmations, reminders, and follow-ups sent to clients
                and your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Bright Secure Section */}
      <section id="why-bright-secure" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
              Why Bright Secure
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-dark">
              Your receptionist's most reliable backup
            </h2>
            <p className="mt-4 text-lg text-light max-w-3xl mx-auto">
              We don't replace your front desk team—we empower them. When they're busy helping
              someone in person, on another call, at lunch, or it's after hours, our AI ensures
              every caller gets the attention they deserve.
            </p>
          </div>

          {/* Main Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-airbnb border border-gray-100">
              <div className="h-14 w-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6">
                <PhoneCall className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Zero Missed Opportunities</h3>
              <p className="text-light mb-4">
                Every unanswered call is a potential client walking away. Our AI picks up
                instantly when your receptionist can't—no hold music, no voicemail, no lost
                business.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-light">
                  <CheckCircle className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                  <span>Answers within 2 rings</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-light">
                  <CheckCircle className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                  <span>Natural conversation flow</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-light">
                  <CheckCircle className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                  <span>24/7/365 availability</span>
                </li>
              </ul>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-airbnb border border-gray-100">
              <div className="h-14 w-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-6">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Instant Call Transcripts</h3>
              <p className="text-light mb-4">
                Every conversation is transcribed and delivered via encrypted email to your
                team. No more sticky notes, no more forgotten messages, no more "what did
                they say?"
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-light">
                  <CheckCircle className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                  <span>Up to 4 recipients per line</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-light">
                  <CheckCircle className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                  <span>HIPAA-compliant delivery</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-light">
                  <CheckCircle className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                  <span>Searchable conversation history</span>
                </li>
              </ul>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-airbnb border border-gray-100">
              <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Round-the-Clock Coverage</h3>
              <p className="text-light mb-4">
                Emergencies don't wait for office hours. Whether it's 2 PM or 2 AM, your
                callers reach someone who can help—and you wake up to organized messages
                ready for action.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-light">
                  <CheckCircle className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                  <span>After-hours call handling</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-light">
                  <CheckCircle className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                  <span>Weekend & holiday coverage</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-light">
                  <CheckCircle className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                  <span>No overtime costs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Use Cases Row */}
          <div className="bg-surface rounded-2xl p-8 mb-16">
            <h3 className="text-xl font-bold text-dark mb-6 text-center">When Your AI Backup Steps In</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Users className="h-6 w-6 text-primary-500" />
                </div>
                <h4 className="font-semibold text-dark mb-1">Front Desk Busy</h4>
                <p className="text-sm text-light">
                  Patient at window, another call in progress—AI catches the overflow.
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Headphones className="h-6 w-6 text-primary-500" />
                </div>
                <h4 className="font-semibold text-dark mb-1">High Call Volume</h4>
                <p className="text-sm text-light">
                  Tax season, Monday mornings, peak hours—every call answered.
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Clock className="h-6 w-6 text-primary-500" />
                </div>
                <h4 className="font-semibold text-dark mb-1">After Hours</h4>
                <p className="text-sm text-light">
                  Evenings, weekends, holidays—no more voicemail abandonment.
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <MessageSquare className="h-6 w-6 text-primary-500" />
                </div>
                <h4 className="font-semibold text-dark mb-1">Routine Requests</h4>
                <p className="text-sm text-light">
                  Appointment scheduling, refills, directions—handled automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-primary-500 mb-2">35%</div>
              <p className="text-light text-sm">Average increase in captured leads</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-primary-500 mb-2">90%</div>
              <p className="text-light text-sm">Reduction in missed calls</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-primary-500 mb-2">&lt;10min</div>
              <p className="text-light text-sm">Setup time to go live</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-primary-500 mb-2">24/7</div>
              <p className="text-light text-sm">Coverage without extra staff</p>
            </div>
          </div>

          {/* Non-regulated industries callout */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-16 flex items-start gap-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-dark mb-1">Not in a regulated industry?</h4>
              <p className="text-light">
                No problem—our AI receptionist works brilliantly for any business. Consultants,
                retailers, electricians, salons, contractors, and more. You'll still get encrypted email
                as a bonus, giving your clients extra peace of mind and setting you apart
                from the competition.
              </p>
            </div>
          </div>

          {/* Global Compliance */}
          <div className="bg-gradient-to-r from-dark to-gray-800 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-6 w-6 text-secondary-400" />
                  <span className="text-secondary-400 font-semibold">Global Compliance</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Trusted across North America and Europe
                </h3>
                <p className="text-gray-300 mb-6">
                  Whether you're in California, Ontario, or the EU, Bright Secure meets the
                  strictest privacy requirements. We handle sensitive information the right
                  way—so you can focus on your clients.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/10 px-3 py-1 rounded-full text-sm">HIPAA (USA)</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full text-sm">PIPEDA (Canada)</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full text-sm">PHIPA (Ontario)</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full text-sm">GDPR Ready (EU)</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <Shield className="h-8 w-8 text-secondary-400 mb-2" />
                  <h4 className="font-semibold mb-1">Encrypted Storage</h4>
                  <p className="text-sm text-gray-400">Data encrypted at rest and in transit</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <FileText className="h-8 w-8 text-secondary-400 mb-2" />
                  <h4 className="font-semibold mb-1">BAA Included</h4>
                  <p className="text-sm text-gray-400">Business Associate Agreement provided</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <Zap className="h-8 w-8 text-secondary-400 mb-2" />
                  <h4 className="font-semibold mb-1">SOC 2 Certified</h4>
                  <p className="text-sm text-gray-400">Enterprise-grade infrastructure</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <CheckCircle className="h-8 w-8 text-secondary-400 mb-2" />
                  <h4 className="font-semibold mb-1">Audit Trail</h4>
                  <p className="text-sm text-gray-400">Complete access logging</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries-preview" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark">
              Support for your receptionist, not a replacement
            </h2>
            <p className="mt-4 text-lg text-light max-w-2xl mx-auto">
              When your front desk is busy, away, or it's after hours—our AI ensures no call goes unanswered.
              Secure transcripts emailed to up to 4 team members per line.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Law Firms', href: '/industries/legal' },
              { name: 'Medical Practices', href: '/industries/medical' },
              { name: 'Dental Offices', href: '/industries/dental' },
              { name: 'Accounting Firms', href: '/industries/accounting' },
              { name: 'Financial Advisors', href: '/industries/financial' },
              { name: 'Chiropractors', href: '/industries/chiropractic' },
              { name: 'Therapists', href: '/industries/therapy' },
              { name: 'Real Estate', href: '/industries/real-estate' },
            ].map((industry) => (
              <Link
                key={industry.name}
                href={industry.href}
                className="bg-surface rounded-lg p-4 text-center hover:bg-primary-50 hover:text-primary-500 transition-colors group"
              >
                <span className="font-medium text-dark group-hover:text-primary-500">{industry.name}</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/industries">
              <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View All Industries
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Compliance you can trust
              </h2>
              <p className="text-gray-300 mb-8">
                We take security and compliance seriously. Our platform is designed
                from the ground up to meet the strictest privacy regulations.
              </p>
              <ul className="space-y-4">
                {[
                  'HIPAA Compliant (USA)',
                  'PIPEDA Compliant (Canada)',
                  'PHIPA Compliant (Ontario)',
                  'End-to-end encryption',
                  'SOC 2 Type II certified infrastructure',
                  'Business Associate Agreement (BAA) included',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-8">
              <div className="text-center">
                <Shield className="h-16 w-16 mx-auto text-secondary-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Enterprise-grade security</h3>
                <p className="text-gray-300">
                  Your data is encrypted at rest and in transit. We never sell or
                  share your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
            Ready to transform your practice?
          </h2>
          <p className="text-lg text-light mb-8">
            Join hundreds of healthcare and professional service providers who trust
            Bright Secure for their client communications.
          </p>
          <Link href="/register">
            <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-primary-500 font-bold text-xl">Bright Secure</div>
            <div className="flex gap-6 text-sm text-light">
              <Link href="/privacy" className="hover:text-dark">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-dark">Terms of Service</Link>
              <Link href="/privacy#healthcare-compliance" className="hover:text-dark">HIPAA Notice</Link>
              <a href="mailto:support@brightsecure.com" className="hover:text-dark">Contact</a>
            </div>
            <div className="text-sm text-light">
              © {new Date().getFullYear()} Bright Secure. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
