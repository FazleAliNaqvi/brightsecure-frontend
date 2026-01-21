'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Wand2,
  Building2,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { AIOptimizationSettings } from '@/components/settings';
import { organizationsApi } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Organization {
  id: string;
  name: string;
  industry_type: string;
}

export default function AdminOptimizationPage() {
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await organizationsApi.list();
        if (response.data.success) {
          const orgs = response.data.data?.results || response.data.data || [];
          setOrganizations(orgs);
          if (orgs.length > 0) {
            setSelectedOrg(orgs[0]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch organizations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (organizations.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Optimization</h1>
          <p className="text-gray-600 mt-1">
            A/B test and optimize AI prompts across organizations
          </p>
        </div>

        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Organizations</h3>
            <p className="text-gray-500">
              There are no organizations to manage yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Optimization</h1>
          <p className="text-gray-600 mt-1">
            A/B test and optimize AI prompts across organizations
          </p>
        </div>
      </div>

      {/* Organization Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Select Organization:
            </label>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors min-w-[250px]"
              >
                <Building2 className="h-5 w-5 text-gray-400" />
                <span className="flex-1 text-left font-medium text-gray-900">
                  {selectedOrg?.name || 'Select...'}
                </span>
                <ChevronDown className={cn(
                  "h-4 w-4 text-gray-400 transition-transform",
                  dropdownOpen && "rotate-180"
                )} />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    {organizations.map((org) => (
                      <button
                        key={org.id}
                        onClick={() => {
                          setSelectedOrg(org);
                          setDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors",
                          selectedOrg?.id === org.id && "bg-primary-50"
                        )}
                      >
                        <Building2 className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{org.name}</div>
                          <div className="text-xs text-gray-500 capitalize">
                            {org.industry_type?.replace('_', ' ') || 'General'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Optimization Settings for Selected Org */}
      {selectedOrg && (
        <AIOptimizationSettings
          key={selectedOrg.id}
          organizationId={selectedOrg.id}
        />
      )}
    </div>
  );
}
