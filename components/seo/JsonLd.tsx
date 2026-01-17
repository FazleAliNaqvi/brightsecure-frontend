// JSON-LD Schema Components for SEO

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bright Secure',
    url: 'https://brightsecure.com',
    logo: 'https://brightsecure.com/logo.png',
    description: 'HIPAA-compliant AI receptionist with encrypted email for healthcare and professional services.',
    foundingDate: '2024',
    sameAs: [
      'https://twitter.com/brightsecure',
      'https://linkedin.com/company/brightsecure',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  };

  return <JsonLd data={schema} />;
}

// Software Application Schema
export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Bright Secure AI Receptionist',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'AI-powered receptionist that answers calls 24/7, books appointments, and sends HIPAA-compliant encrypted transcripts.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '49',
      highPrice: '199',
      priceCurrency: 'USD',
      offerCount: '3',
    },
    featureList: [
      '24/7 AI call answering',
      'HIPAA-compliant encrypted email',
      'Appointment scheduling',
      'Call transcription',
      'Multiple phone lines',
      'Custom greetings',
    ],
    screenshot: 'https://brightsecure.com/screenshot.png',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return <JsonLd data={schema} />;
}

// Service Schema
export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Receptionist Service',
    provider: {
      '@type': 'Organization',
      name: 'Bright Secure',
    },
    serviceType: 'Virtual Receptionist',
    description: 'AI-powered receptionist service for healthcare and professional services. HIPAA and PIPEDA compliant.',
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Canada' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Receptionist Plans',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Starter Plan',
            description: '1 phone line, 100 minutes/month',
          },
          price: '49',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '49',
            priceCurrency: 'USD',
            billingDuration: 'P1M',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pro Plan',
            description: '2 phone lines, 300 minutes/month',
          },
          price: '99',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '99',
            priceCurrency: 'USD',
            billingDuration: 'P1M',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Plan',
            description: '5 phone lines, 1000 minutes/month',
          },
          price: '199',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '199',
            priceCurrency: 'USD',
            billingDuration: 'P1M',
          },
        },
      ],
    },
  };

  return <JsonLd data={schema} />;
}

// FAQ Schema
type FAQItem = {
  question: string;
  answer: string;
};

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}

// Article Schema for Blog Posts
type ArticleSchemaProps = {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  url: string;
};

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName = 'Bright Secure Team',
  url,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: 'https://brightsecure.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bright Secure',
      logo: {
        '@type': 'ImageObject',
        url: 'https://brightsecure.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return <JsonLd data={schema} />;
}

// Breadcrumb Schema
type BreadcrumbItem = {
  name: string;
  url: string;
};

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={schema} />;
}

// Local Business Schema (for industry pages)
type LocalBusinessSchemaProps = {
  industry: string;
  description: string;
};

export function LocalBusinessServiceSchema({ industry, description }: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `AI Receptionist for ${industry}`,
    provider: {
      '@type': 'Organization',
      name: 'Bright Secure',
    },
    description: description,
    serviceType: 'Virtual Receptionist',
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Canada' },
    ],
  };

  return <JsonLd data={schema} />;
}

// Website Schema with Search Action
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bright Secure',
    url: 'https://brightsecure.com',
    description: 'HIPAA-compliant AI receptionist with encrypted email for healthcare and professional services.',
    publisher: {
      '@type': 'Organization',
      name: 'Bright Secure',
    },
  };

  return <JsonLd data={schema} />;
}
