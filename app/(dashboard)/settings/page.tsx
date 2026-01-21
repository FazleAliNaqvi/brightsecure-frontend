'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  Clock,
  Users,
  Mic,
  Bell,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import { organizationsApi } from '@/lib/api';

import {
  ProfileSettings,
  BusinessHoursSettings,
  TeamSettings,
  VoiceSettings,
  NotificationSettings,
} from '@/components/settings';

type SettingsTab = 'profile' | 'hours' | 'team' | 'voice' | 'notifications';

interface TabConfig {
  id: SettingsTab;
  label: string;
  icon: any;
  description: string;
}

const TABS: TabConfig[] = [
  {
    id: 'profile',
    label: 'Organization Profile',
    icon: Building2,
    description: 'Basic information and branding',
  },
  {
    id: 'hours',
    label: 'Business Hours',
    icon: Clock,
    description: 'Operating hours and holidays',
  },
  {
    id: 'team',
    label: 'Team Members',
    icon: Users,
    description: 'Manage staff and permissions',
  },
  {
    id: 'voice',
    label: 'AI Receptionist',
    icon: Mic,
    description: 'Voice and greeting settings',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    description: 'Email and alert preferences',
  },
];

interface Organization {
  id: string;
  name: string;
  slug: string;
  industry_type: string;
  email: string;
  phone: string;
  website: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  timezone: string;
  twilio_phone_number: string;
  voice: any;
  greeting_script: string;
  subscription_tier: string;
  settings: Record<string, any>;
  members_count: number;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await organizationsApi.list();
      const orgs = response.data.data?.results || response.data.data;
      if (response.data.success && orgs?.length > 0) {
        setOrganization(orgs[0]);
      } else {
        setError('No organization found');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load organization');
    } finally {
      setLoading(false);
    }
  };

  const handleOrganizationUpdate = (updated: Partial<Organization>) => {
    if (organization) {
      setOrganization({ ...organization, ...updated });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !organization) {
    return (
      <div className="space-y-6">
        <Card>
          <div className="p-8 text-center">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-red-600">{error || 'No organization found'}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your organization settings and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <nav className="p-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    <Icon className={cn('h-5 w-5', isActive ? 'text-primary-500' : 'text-gray-400')} />
                    <div className="flex-1 min-w-0">
                      <div className={cn('font-medium', isActive && 'text-primary-600')}>
                        {tab.label}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {tab.description}
                      </div>
                    </div>
                    <ChevronRight className={cn(
                      'h-4 w-4 transition-transform',
                      isActive ? 'text-primary-500' : 'text-gray-300'
                    )} />
                  </button>
                );
              })}
            </nav>
          </Card>

          {/* Quick Info */}
          <Card className="mt-4">
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-2">Current Plan</div>
              <div className="font-semibold text-gray-900 capitalize">
                {organization.subscription_tier}
              </div>
              <div className="mt-3 text-sm text-gray-500">AI Phone Number</div>
              <div className="font-mono text-sm text-gray-900">
                {organization.twilio_phone_number || 'Not assigned'}
              </div>
            </div>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <ProfileSettings
              organization={organization}
              onUpdate={handleOrganizationUpdate}
            />
          )}

          {activeTab === 'hours' && (
            <BusinessHoursSettings
              organizationId={organization.id}
            />
          )}

          {activeTab === 'team' && (
            <TeamSettings
              organizationId={organization.id}
            />
          )}

          {activeTab === 'voice' && (
            <VoiceSettings
              organization={organization}
              onUpdate={handleOrganizationUpdate}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationSettings
              organizationId={organization.id}
              settings={organization.settings}
              onUpdate={(settings) => handleOrganizationUpdate({ settings })}
            />
          )}
        </div>
      </div>
    </div>
  );
}
