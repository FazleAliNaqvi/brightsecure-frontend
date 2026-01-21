'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Wand2,
  Building2,
  Users,
  Phone,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { organizationsApi } from '@/lib/api';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    organizations: 0,
    users: 0,
    calls: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await organizationsApi.list();
        if (response.data.success) {
          const orgs = response.data.data?.results || response.data.data || [];
          setStats(prev => ({ ...prev, organizations: orgs.length }));
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  const quickLinks = [
    {
      title: 'AI Optimization',
      description: 'A/B test and optimize AI prompts across organizations',
      href: '/admin/optimization',
      icon: Wand2,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Organizations',
      description: 'Manage all customer organizations',
      href: '/admin/organizations',
      icon: Building2,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Users',
      description: 'View and manage user accounts',
      href: '/admin/users',
      icon: Users,
      color: 'bg-green-100 text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage your platform and optimize AI performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Organizations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.organizations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Calls</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group"
              >
                <div className={`p-3 rounded-lg ${link.color}`}>
                  <link.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-primary-600">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-500 mt-1" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
