'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui';

const categories = [
  { id: 'all', name: 'All Posts' },
  { id: 'guide', name: 'Business Guides' },
  { id: 'legal', name: 'Legal' },
  { id: 'medical', name: 'Medical' },
  { id: 'accounting', name: 'Accounting' },
  { id: 'veterinary', name: 'Veterinary' },
];

const articles = [
  {
    id: 'why-use-ai-receptionist',
    title: '15 Reasons Your Business Needs an AI Receptionist in 2026: Complete FAQ Guide',
    excerpt: 'Everything you need to know about AI receptionists—from costs and HIPAA compliance to setup and ROI. Get answers to the 15 most common questions.',
    category: 'Business Guide',
    categoryId: 'guide',
    categoryColor: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    industryLink: '/blog/why-use-ai-receptionist',
    date: 'January 13, 2026',
    readTime: '15 min read',
    image: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageCredit: 'Photo by Mikhail Nilov on Pexels',
    slug: 'why-use-ai-receptionist',
    featured: true,
  },
  {
    id: 'law-firm-never-miss-client-call',
    title: 'How Law Firms Can Capture Every Potential Client Call—Even After Hours',
    excerpt: 'Personal injury leads don\'t wait for business hours. Learn how AI receptionists help law firms capture time-sensitive cases and increase consultations by 40%.',
    category: 'Legal',
    categoryId: 'legal',
    categoryColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    industryLink: '/industries/legal',
    date: 'January 10, 2026',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageCredit: 'Photo by Sora Shimazaki on Pexels',
    slug: 'law-firm-never-miss-client-call',
    featured: true,
  },
  {
    id: 'accounting-firm-tax-season',
    title: 'Surviving Tax Season: How AI Receptionists Help Accounting Firms Handle 10x Call Volume',
    excerpt: 'Tax season means phone lines ringing off the hook. Discover how AI support helps your receptionist manage the surge without hiring temporary staff.',
    category: 'Accounting',
    categoryId: 'accounting',
    categoryColor: 'bg-green-100 text-green-700 hover:bg-green-200',
    industryLink: '/industries/accounting',
    date: 'January 8, 2026',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageCredit: 'Photo by Nataliya Vaitkevich on Pexels',
    slug: 'accounting-firm-tax-season',
    featured: true,
  },
  {
    id: 'medical-practice-patient-experience',
    title: 'Reducing Patient Hold Times: A Medical Practice\'s Guide to AI-Assisted Call Handling',
    excerpt: 'Patients hate waiting on hold. See how medical practices use AI to handle appointment scheduling, refill requests, and triage—all while staying HIPAA compliant.',
    category: 'Medical',
    categoryId: 'medical',
    categoryColor: 'bg-red-100 text-red-700 hover:bg-red-200',
    industryLink: '/industries/medical',
    date: 'January 5, 2026',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageCredit: 'Photo by Karolina Grabowska on Pexels',
    slug: 'medical-practice-patient-experience',
    featured: false,
  },
  {
    id: 'veterinary-clinic-emergency-calls',
    title: 'After-Hours Pet Emergencies: How Veterinary Clinics Provide 24/7 Support Without Burnout',
    excerpt: 'Pet emergencies don\'t wait for office hours. Learn how veterinary clinics use AI to triage urgent calls and capture every appointment opportunity.',
    category: 'Veterinary',
    categoryId: 'veterinary',
    categoryColor: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
    industryLink: '/industries/veterinary',
    date: 'January 3, 2026',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageCredit: 'Photo by Tima Miroshnichenko on Pexels',
    slug: 'veterinary-clinic-emergency-calls',
    featured: false,
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(article => article.categoryId === selectedCategory);

  const featuredArticles = filteredArticles.filter(a => a.featured);
  const hasFilteredResults = filteredArticles.length > 0;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Bright Secure Blog
            </h1>
            <p className="text-xl text-gray-600">
              Insights, use cases, and best practices for AI-powered receptionist support
              across healthcare and professional services.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="border-b border-gray-200 sticky top-16 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
                {category.id !== 'all' && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({articles.filter(a => a.categoryId === category.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* No Results Message */}
      {!hasFilteredResults && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 text-lg">No articles found in this category yet.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 text-primary-500 font-medium hover:text-primary-600"
            >
              View all articles →
            </button>
          </div>
        </section>
      )}

      {/* Featured Articles - Only show when viewing all or if there are featured articles in the filter */}
      {featuredArticles.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {selectedCategory === 'all' ? 'Featured Articles' : `Featured ${categories.find(c => c.id === selectedCategory)?.name} Articles`}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedCategory(article.categoryId);
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${article.categoryColor}`}
                        >
                          {article.category}
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <span className="inline-flex items-center text-primary-500 font-medium text-sm">
                        Read more <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                    <div className="px-6 pb-4">
                      <p className="text-xs text-gray-400">{article.imageCredit}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      {hasFilteredResults && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {selectedCategory === 'all' ? 'All Articles' : `All ${categories.find(c => c.id === selectedCategory)?.name} Articles`}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedCategory(article.categoryId);
                          }}
                          className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${article.categoryColor}`}
                        >
                          {article.category}
                        </button>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{article.excerpt}</p>
                      <p className="text-xs text-gray-400">{article.imageCredit}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Support Your Receptionist?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            See how Bright Secure can help your practice never miss a call.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-primary-500 hover:bg-gray-100">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="text-primary-500 font-bold text-xl">Bright Secure</Link>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
              <Link href="/privacy#healthcare-compliance" className="hover:text-gray-900">HIPAA Notice</Link>
              <a href="mailto:support@brightsecure.com" className="hover:text-gray-900">Contact</a>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Bright Secure. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
