'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, ArrowRight, Phone, Mail, Building2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';

type Message = {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
};

type ChatStep = 'welcome' | 'collecting_name' | 'collecting_email' | 'collecting_phone' | 'collecting_business' | 'complete' | 'freeform';

type LeadData = {
  name: string;
  email: string;
  phone: string;
  businessType: string;
};

const businessTypes = [
  'Law Firm',
  'Medical Practice',
  'Dental Office',
  'Accounting Firm',
  'Veterinary Clinic',
  'Real Estate',
  'Other',
];

const quickQuestions = [
  'What are your pricing plans?',
  'How does the AI receptionist work?',
  'Is it HIPAA compliant?',
  'Can I book appointments with it?',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatStep, setChatStep] = useState<ChatStep>('welcome');
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    businessType: '',
  });
  const [isTyping, setIsTyping] = useState(false);
  const [hideQuickQuestions, setHideQuickQuestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show bubble after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 8000); // Show after 8 seconds

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Hi there! I'm the Bright Secure assistant. I can help you learn about our AI receptionist service or get you started with a free trial. What brings you here today?");
    }
  }, [isOpen]);

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    }]);
  };

  // Check if input looks like a question rather than personal info
  const isQuestion = (text: string): boolean => {
    const lower = text.toLowerCase();
    const questionIndicators = [
      '?', 'what', 'how', 'why', 'when', 'where', 'which', 'who',
      'can', 'does', 'do you', 'is it', 'is there', 'are you', 'are there',
      'tell me', 'explain', 'describe',
      'price', 'cost', 'pricing', 'plan',
      'hipaa', 'compliant', 'secure', 'security', 'privacy', 'pipeda', 'baa',
      'work', 'trial', 'demo', 'free',
      'setup', 'set up', 'integrate', 'integration', 'calendar',
      'appointment', 'booking', 'schedule',
      'support', 'help', 'contact',
      'industry', 'medical', 'legal', 'dental', 'law',
      'voice', 'language', 'spanish', 'french',
      'record', 'transcript', 'notification',
      'cancel', 'contract', 'commitment',
      'voicemail', 'answering service', 'compare', 'different',
      'based', 'located', 'toronto', 'canada',
      'feature', 'include'
    ];
    return questionIndicators.some(indicator => lower.includes(indicator));
  };

  // Handle any question intelligently with comprehensive Q&A knowledge base
  const respondToQuestion = (question: string) => {
    const lower = question.toLowerCase();

    // Hide quick questions when answering to keep focus on the answer
    setHideQuickQuestions(true);

    // ===== COMPANY & BASIC INFO =====
    if (lower.includes('where') && (lower.includes('based') || lower.includes('located') || lower.includes('from'))) {
      addBotMessage("Bright Secure is proudly made in Toronto, Canada. We serve businesses across Canada and the United States with our AI receptionist service.");
    }
    else if (lower.includes('who') && (lower.includes('behind') || lower.includes('made') || lower.includes('created') || lower.includes('founded'))) {
      addBotMessage("Bright Secure was founded by a team passionate about helping small businesses and healthcare practices never miss a call. We're based in Toronto, Canada and focused on building the most reliable, secure AI receptionist for professional services.");
    }
    else if ((lower.includes('what is') || lower.includes('what\'s')) && lower.includes('bright secure')) {
      addBotMessage("Bright Secure is an AI-powered receptionist service that answers your business calls 24/7. We specialize in healthcare and professional services, offering HIPAA-compliant call handling, appointment booking, and encrypted transcript delivery. Think of us as your always-available backup receptionist!");
    }

    // ===== PRICING & PLANS =====
    else if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('pricing')) {
      addBotMessage("We have three plans:\n\n• Business: $79 CAD/month (1 line, 250 AI minutes)\n• Pro: $189 CAD/month (2 lines, 750 minutes) — Most Popular\n• Enterprise: $599 CAD/month (10 lines, 2,500 minutes)\n\nAll plans include HIPAA-compliant encrypted email, call recordings, and a 14-day free trial. No contracts!");
    }
    else if (lower.includes('contract') || lower.includes('commitment') || lower.includes('cancel')) {
      addBotMessage("No contracts or long-term commitments! All plans are billed monthly and you can cancel anytime. We also offer annual billing with 2 months free if you'd like to save.");
    }
    else if ((lower.includes('over') || lower.includes('exceed') || lower.includes('extra')) && lower.includes('minute')) {
      addBotMessage("If you exceed your included minutes, additional minutes are billed at $0.10 CAD per minute. We'll notify you when you reach 80% of your limit so there are no surprises. You can also upgrade your plan anytime for more included minutes.");
    }
    else if (lower.includes('change') && lower.includes('plan')) {
      addBotMessage("Yes, you can upgrade or downgrade your plan at any time! When upgrading, you get immediate access to new features. When downgrading, changes take effect at your next billing cycle.");
    }
    else if (lower.includes('payment') && (lower.includes('method') || lower.includes('option') || lower.includes('accept'))) {
      addBotMessage("We accept all major credit cards (Visa, Mastercard, American Express) through our secure payment processor, Stripe. We can also arrange invoicing for Enterprise customers.");
    }

    // ===== FREE TRIAL =====
    else if (lower.includes('trial') || lower.includes('free') || lower.includes('try')) {
      addBotMessage("Yes! We offer a 14-day free trial with full access to all features—no credit card required. You can test the AI receptionist with real calls and see exactly how it works for your practice. Ready to start?");
    }

    // ===== HOW IT WORKS =====
    else if (lower.includes('how') && (lower.includes('work') || lower.includes('does it'))) {
      addBotMessage("Here's how Bright Secure works:\n\n1. Sign up and customize your AI receptionist's greeting and responses\n2. Connect your calendar for appointment booking\n3. Forward calls to your Bright Secure number when busy or after hours\n4. The AI answers, helps callers, and sends you encrypted transcripts\n\nYour existing receptionist stays in control—we're just their reliable backup!");
    }
    else if (lower.includes('setup') || lower.includes('set up') || lower.includes('get started') || lower.includes('long') && lower.includes('take')) {
      addBotMessage("Setup takes less than 15 minutes! Just sign up, customize your greeting and FAQs, connect your calendar, and start forwarding calls. No technical skills needed—our dashboard makes everything easy. We also offer guided onboarding if you'd like help.");
    }
    else if (lower.includes('technical') || lower.includes('developer') || lower.includes('coding')) {
      addBotMessage("No technical skills or developers needed! Our dashboard is designed to be simple and intuitive. You can customize everything yourself—greetings, FAQs, call routing, calendar connections—all without writing any code.");
    }

    // ===== FEATURES =====
    else if (lower.includes('appointment') || lower.includes('booking') || lower.includes('schedule')) {
      addBotMessage("Yes! Our AI receptionist can book appointments directly into your calendar. It checks real-time availability, avoids double-booking, and sends confirmation emails to both you and the caller. We integrate with Google Calendar, Outlook, Calendly, and many practice management systems.");
    }
    else if (lower.includes('calendar') || lower.includes('integration') || lower.includes('integrate')) {
      addBotMessage("We integrate with popular calendars and tools including:\n\n• Google Calendar & Outlook\n• Calendly, Acuity, Appointlet\n• Practice management systems\n• CRMs via Zapier (5,000+ apps)\n\nThis allows seamless appointment booking and automatic syncing.");
    }
    else if (lower.includes('customize') || lower.includes('custom') || lower.includes('personalize')) {
      addBotMessage("Absolutely! You can fully customize:\n\n• Greeting scripts and business name pronunciation\n• Responses to your specific FAQs\n• Appointment types and durations\n• Call routing rules\n• Voice selection (6 options)\n• Team notifications\n\nYour AI receptionist will sound like a natural extension of your team.");
    }
    else if (lower.includes('multiple call') || lower.includes('simultaneous') || lower.includes('busy signal')) {
      addBotMessage("Unlike human receptionists, our AI handles unlimited simultaneous calls—no busy signals ever! Every caller gets answered immediately, even during peak hours or unexpected call surges. This is perfect for busy practices or marketing campaigns.");
    }
    else if (lower.includes('transfer') || lower.includes('forward') || lower.includes('connect') && lower.includes('staff')) {
      addBotMessage("Yes! The AI can transfer calls to your staff when needed. You set up transfer rules—for example, transfer urgent calls immediately, or only transfer when a caller specifically requests to speak with someone. The AI provides context to your team before transferring.");
    }
    else if (lower.includes('recording') || lower.includes('record')) {
      addBotMessage("Yes, all calls are automatically recorded. You can access recordings anytime through your dashboard. Recordings are stored securely with encryption and are included in all plans. This is great for training, quality assurance, and keeping accurate records.");
    }
    else if (lower.includes('transcript')) {
      addBotMessage("Every call generates a detailed transcript that's delivered to your team via encrypted email—HIPAA compliant! You can also access all transcripts in your dashboard. This makes it easy to review calls, follow up with callers, and keep records.");
    }

    // ===== LANGUAGES & VOICE =====
    else if (lower.includes('language') || lower.includes('spanish') || lower.includes('french') || lower.includes('bilingual')) {
      addBotMessage("Currently, Bright Secure supports English. We're actively working on adding Spanish and French support—stay tuned! If bilingual support is critical for your business, let us know and we'll keep you updated on our rollout.");
    }
    else if (lower.includes('voice') && (lower.includes('choose') || lower.includes('option') || lower.includes('sound'))) {
      addBotMessage("Yes! We offer 6 different voice options—a mix of male and female voices with different tones. You can preview each voice and choose the one that best fits your brand. Pro and Enterprise plans get access to all voice options.");
    }
    else if (lower.includes('know') && lower.includes('ai') || lower.includes('tell') && lower.includes('robot') || lower.includes('sound') && lower.includes('natural')) {
      addBotMessage("Our AI uses natural-sounding voices and conversational patterns. We do disclose to callers that they're speaking with an AI assistant—this is both ethical and required in some regions. Most callers appreciate the immediate response and helpful service!");
    }

    // ===== SECURITY & COMPLIANCE =====
    else if (lower.includes('hipaa')) {
      addBotMessage("Yes, Bright Secure is fully HIPAA compliant! We provide:\n\n• Signed Business Associate Agreements (BAAs)\n• AES-256 encryption for all data\n• HIPAA-compliant encrypted email delivery\n• Audit logging and access controls\n• SOC 2 Type II certified infrastructure\n\nWe take healthcare privacy seriously.");
    }
    else if (lower.includes('secure') || lower.includes('security') || lower.includes('safe') || lower.includes('privacy')) {
      addBotMessage("Security is our top priority. We use:\n\n• AES-256 encryption at rest\n• TLS 1.2+ encryption in transit\n• SOC 2 Type II certified cloud infrastructure (AWS)\n• Role-based access controls\n• Regular security audits\n\nWe're HIPAA, PIPEDA, and GDPR compliant.");
    }
    else if (lower.includes('baa') || lower.includes('business associate')) {
      addBotMessage("Yes, we provide a Business Associate Agreement (BAA) with every healthcare account. This is included at no extra cost and is required for HIPAA compliance. You can request your BAA during signup or anytime from your dashboard.");
    }
    else if (lower.includes('data') && (lower.includes('store') || lower.includes('where') || lower.includes('located'))) {
      addBotMessage("All data is stored securely on AWS infrastructure in North America (US and Canada). Data is encrypted at rest using AES-256 encryption. We follow strict data retention policies and you can request data deletion at any time.");
    }
    else if (lower.includes('pipeda') || lower.includes('canada') && lower.includes('privacy')) {
      addBotMessage("Yes! As a Canadian company, we're fully PIPEDA compliant. We follow all Canadian privacy requirements including consent management, data minimization, and providing access to personal information within 30 days of request.");
    }

    // ===== INDUSTRIES =====
    else if (lower.includes('industry') || lower.includes('industries') || lower.includes('who') && lower.includes('use')) {
      addBotMessage("Bright Secure works great for many industries:\n\n• Healthcare (medical, dental, veterinary, chiropractic, therapy)\n• Legal (law firms, attorneys)\n• Financial (accounting, financial advisors)\n• Real estate\n• Home services\n• Consulting & professional services\n\nAnyone who receives calls and values security can benefit!");
    }
    else if (lower.includes('medical') || lower.includes('doctor') || lower.includes('clinic') || lower.includes('healthcare')) {
      addBotMessage("Absolutely! We specialize in healthcare. Medical practices love Bright Secure because we're HIPAA compliant, handle appointment scheduling, and deliver transcripts via encrypted email. We understand medical scheduling needs and can handle patient inquiries professionally.");
    }
    else if (lower.includes('law') || lower.includes('legal') || lower.includes('attorney') || lower.includes('lawyer')) {
      addBotMessage("Yes! Law firms are one of our top customer segments. We help capture potential client calls 24/7, qualify leads, schedule consultations, and ensure no inquiry slips through. Our encrypted transcripts provide excellent documentation for your records.");
    }
    else if (lower.includes('dental') || lower.includes('dentist')) {
      addBotMessage("Dental practices love Bright Secure! We handle appointment booking, answer common questions about services and insurance, and ensure you never miss a call. Plus, we're HIPAA compliant so patient information stays protected.");
    }

    // ===== SUPPORT =====
    else if (lower.includes('support') || lower.includes('help') || lower.includes('contact') || lower.includes('question')) {
      addBotMessage("We're here to help! You can reach our support team via:\n\n• Email: support@brightsecure.com\n• Live chat (that's me!)\n• Help center with guides and tutorials\n\nPro and Enterprise plans include priority support. We typically respond within a few hours during business days.");
    }
    else if (lower.includes('onboarding') || lower.includes('training')) {
      addBotMessage("We offer guided onboarding to help you get set up! Our team will walk you through customizing your AI receptionist, connecting your calendar, and optimizing your call flows. Enterprise plans include a dedicated account manager for ongoing support.");
    }

    // ===== COMPARISONS =====
    else if (lower.includes('voicemail') || lower.includes('voice mail')) {
      addBotMessage("Great question! Unlike voicemail where 80% of callers hang up, our AI answers every call live. Callers can book appointments, get their questions answered, and feel taken care of—rather than leaving a message and hoping for a callback. Studies show 67% of callers who reach voicemail call a competitor instead!");
    }
    else if (lower.includes('answering service') || lower.includes('call center') || lower.includes('live receptionist')) {
      addBotMessage("Compared to traditional answering services, Bright Secure offers:\n\n• 60-80% cost savings\n• Instant answers (no hold times)\n• 24/7 availability without overtime costs\n• Unlimited simultaneous calls\n• Consistent quality every time\n• Direct calendar integration\n\nPlus, all the security of HIPAA compliance!");
    }
    else if (lower.includes('different') || lower.includes('compare') || lower.includes('vs') || lower.includes('versus')) {
      addBotMessage("Bright Secure stands out with our focus on security and healthcare compliance. We offer HIPAA-compliant encrypted email delivery of transcripts, which most competitors don't. Plus we're Canadian-made, offer transparent pricing, and specialize in professional services that need the highest level of data protection.");
    }

    // ===== DEMO =====
    else if (lower.includes('demo') || lower.includes('see') || lower.includes('example') || lower.includes('hear') || lower.includes('sample')) {
      addBotMessage("You can hear a sample call right on our homepage! Just scroll down to the 'Hear It In Action' section to listen to a real example of how the AI handles calls for an accounting firm. It shows appointment booking, question handling, and the natural conversation flow.");
    }

    // ===== MISC =====
    else if (lower.includes('spam') || lower.includes('robocall') || lower.includes('telemarketer')) {
      addBotMessage("Our AI is smart about filtering calls! It can identify and politely handle spam calls, robocalls, and telemarketers so they don't waste your time. These filtered calls don't count against your minutes.");
    }
    else if (lower.includes('notification') || lower.includes('alert') || lower.includes('notify')) {
      addBotMessage("You'll receive instant notifications for every call! Choose email, SMS, or both. You can customize which team members get notified and set up different rules for different call types (e.g., urgent calls notify everyone immediately).");
    }
    else if (lower.includes('after hour') || lower.includes('weekend') || lower.includes('holiday') || lower.includes('24/7') || lower.includes('24 7')) {
      addBotMessage("Yes! Bright Secure works 24/7/365—nights, weekends, and holidays. Your AI receptionist never takes a break. This is perfect for capturing after-hours leads when competitors are closed and callers need help urgently.");
    }
    else if (lower.includes('phone number') || lower.includes('get a number') || lower.includes('my number')) {
      addBotMessage("You can either get a new phone number from us (local Canadian or US numbers available) or forward your existing number to Bright Secure when you're busy or after hours. Most customers keep their existing number and just set up call forwarding.");
    }

    // ===== DEFAULT =====
    else {
      addBotMessage("Great question! I'd be happy to help. Bright Secure is an AI receptionist that answers your calls 24/7, books appointments, and sends you encrypted transcripts—all HIPAA compliant. Is there something specific you'd like to know about our pricing, features, or how it works?");
    }
  };

  const handleQuickQuestion = (question: string) => {
    addUserMessage(question);
    setChatStep('freeform');

    // Respond based on question
    setTimeout(() => {
      respondToQuestion(question);
    }, 500);
  };

  const handleStartTrial = () => {
    addUserMessage("I'd like to start a free trial");
    addBotMessage("Great choice! Let me collect a few details. First, what's your name?");
    setChatStep('collecting_name');
  };

  const handleLearnMore = () => {
    addUserMessage("I want to learn more first");
    addBotMessage("Of course! Here are some common questions. What would you like to know?");
    setChatStep('freeform');
    setHideQuickQuestions(false); // Show quick questions when entering freeform mode
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const value = inputValue.trim();
    addUserMessage(value);
    setInputValue('');

    // If user asks a question during data collection, answer it and stay in freeform
    if (isQuestion(value) && chatStep !== 'freeform') {
      setChatStep('freeform');
      setTimeout(() => {
        respondToQuestion(value);
      }, 500);
      return;
    }

    switch (chatStep) {
      case 'collecting_name':
        setLeadData(prev => ({ ...prev, name: value }));
        setTimeout(() => {
          addBotMessage(`Nice to meet you, ${value}! What's your email address?`);
          setChatStep('collecting_email');
        }, 500);
        break;

      case 'collecting_email':
        if (value.includes('@')) {
          setLeadData(prev => ({ ...prev, email: value }));
          setTimeout(() => {
            addBotMessage("Perfect! And what's the best phone number to reach you?");
            setChatStep('collecting_phone');
          }, 500);
        } else {
          setTimeout(() => {
            addBotMessage("That doesn't look like a valid email. Could you double-check it?");
          }, 500);
        }
        break;

      case 'collecting_phone':
        setLeadData(prev => ({ ...prev, phone: value }));
        setTimeout(() => {
          addBotMessage("Almost done! What type of business do you run?");
          setChatStep('collecting_business');
        }, 500);
        break;

      case 'freeform':
        // Handle freeform questions
        setTimeout(() => {
          respondToQuestion(value);
        }, 500);
        break;

      default:
        break;
    }
  };

  const handleBusinessSelect = (business: string) => {
    setLeadData(prev => ({ ...prev, businessType: business }));
    addUserMessage(business);

    setTimeout(() => {
      addBotMessage(`Excellent! We work with many ${business.toLowerCase()}s. I've got all your details:`);
      setTimeout(() => {
        addBotMessage(`✓ Name: ${leadData.name}\n✓ Email: ${leadData.email}\n✓ Phone: ${leadData.phone}\n✓ Business: ${business}`);
        setTimeout(() => {
          addBotMessage("Our team will reach out within 24 hours to help you get started. In the meantime, you can sign up for your free trial right now!");
          setChatStep('complete');
        }, 1000);
      }, 800);
    }, 500);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Bubble Prompt */}
      {showBubble && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs border border-gray-200 relative">
            <button
              onClick={() => setShowBubble(false)}
              className="absolute -top-2 -right-2 bg-gray-100 rounded-full p-1 hover:bg-gray-200"
            >
              <X className="h-3 w-3 text-gray-500" />
            </button>
            <p className="text-sm text-gray-700 mb-2">
              Have questions about our AI receptionist? Chat with us!
            </p>
            <button
              onClick={() => {
                setShowBubble(false);
                setIsOpen(true);
              }}
              className="text-sm text-primary-500 font-medium hover:text-primary-600"
            >
              Start chat →
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-gray-700 hover:bg-gray-800'
            : 'bg-primary-500 hover:bg-primary-600 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Bright Secure</h3>
                <p className="text-white/80 text-sm">AI Assistant • Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-primary-500 text-white rounded-br-md'
                      : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Scroll anchor - positioned after messages so answers stay visible */}
            <div ref={messagesEndRef} />

            {/* Quick Actions - Welcome */}
            {chatStep === 'welcome' && messages.length > 0 && !isTyping && (
              <div className="space-y-2">
                <button
                  onClick={handleStartTrial}
                  className="w-full bg-primary-500 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  Start Free Trial
                </button>
                <button
                  onClick={handleLearnMore}
                  className="w-full bg-white text-gray-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  Learn More First
                </button>
              </div>
            )}

            {/* Quick Questions - Hidden after answering, show button to reveal */}
            {chatStep === 'freeform' && messages.length > 0 && !isTyping && (
              <div className="space-y-2">
                {hideQuickQuestions ? (
                  // Show compact buttons when quick questions are hidden
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHideQuickQuestions(false)}
                      className="flex-1 bg-gray-100 text-gray-600 rounded-lg px-3 py-2 text-sm hover:bg-gray-200 transition-colors"
                    >
                      More questions
                    </button>
                    <button
                      onClick={handleStartTrial}
                      className="flex-1 bg-primary-500 text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-primary-600 transition-colors"
                    >
                      Start Free Trial
                    </button>
                  </div>
                ) : (
                  // Show full quick questions
                  <>
                    <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQuickQuestion(q)}
                        className="w-full bg-white text-gray-700 rounded-lg px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors border border-gray-200"
                      >
                        {q}
                      </button>
                    ))}
                    <div className="pt-2 border-t border-gray-200 mt-3">
                      <button
                        onClick={handleStartTrial}
                        className="w-full bg-primary-500 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <ArrowRight className="h-4 w-4" />
                        Ready to Start Your Free Trial
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Business Type Selection */}
            {chatStep === 'collecting_business' && !isTyping && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 mb-2">Select your business type:</p>
                <div className="grid grid-cols-2 gap-2">
                  {businessTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleBusinessSelect(type)}
                      className="bg-white text-gray-700 rounded-lg px-3 py-2 text-sm hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-colors border border-gray-200"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Complete - CTA */}
            {chatStep === 'complete' && !isTyping && (
              <div className="space-y-2">
                <a
                  href="/register"
                  className="w-full bg-primary-500 text-white rounded-lg px-4 py-3 text-sm font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  Start Free Trial Now
                </a>
                <a
                  href="/pricing"
                  className="w-full bg-white text-gray-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200 flex items-center justify-center"
                >
                  View Pricing Plans
                </a>
              </div>
            )}
          </div>

          {/* Input */}
          {chatStep !== 'welcome' && chatStep !== 'collecting_business' && chatStep !== 'complete' && (
            <form onSubmit={handleInputSubmit} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    chatStep === 'collecting_name' ? 'Enter your name...' :
                    chatStep === 'collecting_email' ? 'Enter your email...' :
                    chatStep === 'collecting_phone' ? 'Enter your phone...' :
                    'Type a message...'
                  }
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-primary-500 text-white rounded-lg px-4 py-2 hover:bg-primary-600 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
