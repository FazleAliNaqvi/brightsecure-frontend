import type { Metadata } from 'next';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo';

// Comprehensive FAQ data for schema markup
const faqItems = [
  {
    question: "What is an AI receptionist and how does it work?",
    answer: "An AI receptionist is an artificial intelligence-powered phone system that answers calls, greets callers, schedules appointments, answers frequently asked questions, and routes calls—all without human intervention. It uses natural language processing (NLP) and machine learning to understand caller intent and respond conversationally, operating 24/7 to ensure no call goes unanswered."
  },
  {
    question: "Why should my business use an AI receptionist instead of a traditional answering service?",
    answer: "AI receptionists offer several advantages over traditional answering services: they're available 24/7/365 without breaks or sick days, cost 60-80% less than human receptionists, provide instant responses with no hold times, handle unlimited concurrent calls, deliver consistent service quality, and can be customized to your specific business needs. They also integrate with your existing calendar and CRM systems for seamless appointment booking."
  },
  {
    question: "How much does an AI receptionist cost compared to hiring staff?",
    answer: "An AI receptionist typically costs $50-200 per month depending on features and call volume, while a full-time human receptionist costs $35,000-50,000+ annually in salary, benefits, and overhead. This represents savings of 85-95%. Even compared to outsourced answering services at $1-2 per minute, AI receptionists offer predictable monthly pricing with unlimited calls included in most plans."
  },
  {
    question: "Can an AI receptionist handle complex calls and specific industry needs?",
    answer: "Yes, modern AI receptionists can be trained on industry-specific terminology, protocols, and workflows. For healthcare practices, they understand medical scheduling requirements and maintain HIPAA compliance. For law firms, they can perform basic intake and qualify leads. They handle complex multi-step conversations, ask clarifying questions, and know when to escalate to a human team member."
  },
  {
    question: "Is an AI receptionist HIPAA compliant for healthcare practices?",
    answer: "Reputable AI receptionist providers like Bright Secure are fully HIPAA compliant. This includes encrypted data transmission (TLS 1.2+), encrypted data storage (AES-256), signed Business Associate Agreements (BAAs), audit logging, access controls, and secure delivery of call transcripts via encrypted email. Always verify HIPAA compliance and request a BAA before implementing any AI solution in healthcare."
  },
  {
    question: "What happens if the AI receptionist can't answer a caller's question?",
    answer: "Well-designed AI receptionists have graceful fallback protocols. They can transfer calls to available staff, take detailed messages for callback, offer to schedule a consultation, or provide alternative contact methods. The AI recognizes when it's outside its knowledge base and ensures callers never feel stuck or frustrated. All interactions are logged so your team can follow up appropriately."
  },
  {
    question: "How quickly can an AI receptionist be set up for my business?",
    answer: "Most AI receptionist solutions can be operational within 24-48 hours. Setup typically involves: choosing or porting a phone number, configuring business hours and holiday schedules, customizing greetings and responses, connecting calendar integrations, and setting up team notifications. More complex customizations may take 1-2 weeks. Many providers offer guided onboarding and setup assistance."
  },
  {
    question: "Will callers know they're talking to an AI and not a human?",
    answer: "Modern AI receptionists sound remarkably natural with human-like voices and conversational patterns. However, ethical best practices and some regulations require disclosure that callers are interacting with an AI system. Most callers appreciate the immediate response and efficient service, especially when the alternative is voicemail or long hold times. Studies show caller satisfaction remains high when AI delivers helpful, accurate service."
  },
  {
    question: "Can an AI receptionist book appointments directly into my calendar?",
    answer: "Yes, AI receptionists integrate with popular calendar systems including Google Calendar, Microsoft Outlook, Calendly, and industry-specific practice management software. They check real-time availability, avoid double-booking, respect buffer times between appointments, and send confirmation emails to both staff and callers. This eliminates the back-and-forth of manual scheduling."
  },
  {
    question: "What happens to calls after business hours with an AI receptionist?",
    answer: "Unlike voicemail where 80% of callers hang up, AI receptionists answer every after-hours call live. They can book appointments for the next business day, provide essential information, handle urgent call routing based on keywords, collect detailed messages with caller intent, and send immediate notifications to on-call staff. This captures leads that would otherwise call competitors."
  },
  {
    question: "How does an AI receptionist improve customer experience?",
    answer: "AI receptionists improve customer experience through: zero hold times (instant answer on first ring), 24/7 availability (evenings, weekends, holidays), consistent professional greetings, accurate information delivery, efficient appointment booking, immediate confirmation emails, and follow-up reminders. Callers get their needs met faster without waiting for callbacks or navigating phone trees."
  },
  {
    question: "Can I customize what the AI receptionist says and how it handles calls?",
    answer: "Absolutely. AI receptionists are highly customizable. You can personalize: greeting scripts and business name pronunciation, responses to frequently asked questions, appointment types and durations, qualifying questions for new leads, call routing rules and escalation triggers, voice selection (male/female, tone), languages supported, and integration workflows. Most platforms offer easy-to-use dashboards for ongoing adjustments."
  },
  {
    question: "What industries benefit most from AI receptionists?",
    answer: "AI receptionists provide significant value across many industries, particularly: healthcare (medical, dental, veterinary, chiropractic, therapy practices), legal (law firms, attorneys), financial services (accounting, financial advisors, insurance), real estate agencies, home services (HVAC, plumbing, electrical), salons and spas, consulting firms, and any business receiving high call volumes or needing after-hours coverage."
  },
  {
    question: "How do AI receptionists handle multiple calls at once?",
    answer: "Unlike human receptionists limited to one call at a time, AI receptionists handle unlimited concurrent calls simultaneously. Each caller receives immediate, personalized attention without busy signals or hold queues. This is particularly valuable during peak periods, marketing campaigns, or emergencies when call volume spikes unexpectedly. Your business never misses an opportunity due to capacity constraints."
  },
  {
    question: "What kind of reporting and analytics do AI receptionists provide?",
    answer: "AI receptionist platforms typically provide comprehensive analytics including: total call volume and trends, peak calling hours and days, average call duration, appointment booking rates, common caller questions and topics, call outcomes (booked, transferred, message taken), missed call recovery, and caller sentiment analysis. These insights help optimize staffing, marketing, and operations."
  }
];

export const metadata: Metadata = {
  title: '15 Reasons Your Business Needs an AI Receptionist in 2026 | Complete FAQ Guide',
  description: 'Discover why businesses are switching to AI receptionists. Get answers to the top 15 questions about AI phone answering: costs, HIPAA compliance, setup time, customization, and ROI.',
  keywords: [
    'AI receptionist',
    'why use AI receptionist',
    'AI receptionist benefits',
    'AI phone answering',
    'virtual receptionist',
    'automated receptionist',
    'AI receptionist cost',
    'AI receptionist HIPAA',
    'business phone answering',
    'after hours answering service',
  ],
  openGraph: {
    title: '15 Reasons Your Business Needs an AI Receptionist in 2026',
    description: 'Complete FAQ guide answering every question about AI receptionists: costs, compliance, setup, and why businesses are making the switch.',
    type: 'article',
    publishedTime: '2026-01-13',
    modifiedTime: '2026-01-13',
    authors: ['Bright Secure'],
    tags: ['AI Receptionist', 'Business Technology', 'Customer Service', 'Healthcare', 'HIPAA'],
    images: [
      {
        url: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'AI receptionist answering business calls',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '15 Reasons Your Business Needs an AI Receptionist in 2026',
    description: 'Complete FAQ guide: costs, HIPAA compliance, setup time, and ROI of AI receptionists.',
  },
  alternates: {
    canonical: '/blog/why-use-ai-receptionist',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

// FAQ Schema Component
function FAQPageSchema({ items }: { items: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// HowTo Schema for implementation steps
function HowToSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Implement an AI Receptionist for Your Business',
    description: 'Step-by-step guide to setting up an AI receptionist for your business.',
    totalTime: 'PT48H',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '50-200/month',
    },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Choose a Provider',
        text: 'Select a HIPAA-compliant AI receptionist provider that fits your industry needs.',
      },
      {
        '@type': 'HowToStep',
        name: 'Configure Your Phone Number',
        text: 'Get a new number or port your existing business number to the AI system.',
      },
      {
        '@type': 'HowToStep',
        name: 'Customize Greetings and Responses',
        text: 'Set up personalized greetings, FAQ responses, and call handling rules.',
      },
      {
        '@type': 'HowToStep',
        name: 'Connect Calendar Integrations',
        text: 'Link your calendar system for automated appointment booking.',
      },
      {
        '@type': 'HowToStep',
        name: 'Test and Launch',
        text: 'Run test calls, train your team, and go live with your AI receptionist.',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function WhyUseAIReceptionistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* FAQ Schema for AIO and Featured Snippets */}
      <FAQPageSchema items={faqItems} />

      {/* HowTo Schema for implementation */}
      <HowToSchema />

      {/* Article Schema */}
      <ArticleSchema
        title="15 Reasons Your Business Needs an AI Receptionist in 2026 | Complete FAQ Guide"
        description="Discover why businesses are switching to AI receptionists. Get answers to the top 15 questions about AI phone answering: costs, HIPAA compliance, setup time, customization, and ROI."
        image="https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1200"
        datePublished="2026-01-13"
        dateModified="2026-01-13"
        url="https://brightsecure.com/blog/why-use-ai-receptionist"
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://brightsecure.com' },
          { name: 'Blog', url: 'https://brightsecure.com/blog' },
          { name: 'Why Use an AI Receptionist', url: 'https://brightsecure.com/blog/why-use-ai-receptionist' },
        ]}
      />

      {children}
    </>
  );
}
