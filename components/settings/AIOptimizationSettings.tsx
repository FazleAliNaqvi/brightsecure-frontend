'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Wand2,
  Plus,
  Play,
  Pause,
  Trophy,
  Trash2,
  Edit3,
  BarChart3,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Modal } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { PromptPerformanceChart } from '@/components/charts';
import { cn } from '@/lib/utils';
import { promptVariantsApi } from '@/lib/api';
import toast from 'react-hot-toast';

interface VariantStats {
  total_calls: number;
  completed_calls: number;
  appointments_booked: number;
  conversion_rate: number;
  avg_duration_seconds: number;
  outcomes_breakdown: Record<string, number>;
  last_updated: string;
}

interface PromptVariant {
  id: string;
  organization: string;
  name: string;
  description: string;
  system_prompt: string;
  first_message: string;
  status: string;
  status_display: string;
  traffic_percentage: number;
  is_control: boolean;
  stats: VariantStats | null;
  created_at: string;
  updated_at: string;
}

interface AnalyticsData {
  variant_id: string;
  variant_name: string;
  status: string;
  is_control: boolean;
  traffic_percentage: number;
  total_calls: number;
  completed_calls: number;
  appointments_booked: number;
  conversion_rate: number;
  avg_duration_seconds: number;
  outcomes_breakdown: Record<string, number>;
}

interface AIOptimizationSettingsProps {
  organizationId: string;
}

const STATUS_BADGES: Record<string, { color: string; bg: string }> = {
  draft: { color: 'text-gray-700', bg: 'bg-gray-100' },
  active: { color: 'text-teal-700', bg: 'bg-teal-100' },
  paused: { color: 'text-amber-700', bg: 'bg-amber-100' },
  winner: { color: 'text-green-700', bg: 'bg-green-100' },
  archived: { color: 'text-gray-500', bg: 'bg-gray-50' },
};

export function AIOptimizationSettings({ organizationId }: AIOptimizationSettingsProps) {
  const [loading, setLoading] = useState(true);
  const [variants, setVariants] = useState<PromptVariant[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVariant, setEditingVariant] = useState<PromptVariant | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    system_prompt: '',
    first_message: "Hello, thank you for calling. How may I help you today?",
    traffic_percentage: 50,
    is_control: false,
  });

  const fetchVariants = useCallback(async () => {
    try {
      const response = await promptVariantsApi.list({ organization_id: organizationId });
      if (response.data.success) {
        setVariants(response.data.data || []);
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load variants');
    }
  }, [organizationId]);

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await promptVariantsApi.getAnalytics(organizationId);
      if (response.data.success) {
        setAnalytics(response.data.data || []);
      }
    } catch (err) {
      // Analytics might not be available yet
      console.log('No analytics data available');
    }
  }, [organizationId]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    await Promise.all([fetchVariants(), fetchAnalytics()]);
    setLoading(false);
  }, [fetchVariants, fetchAnalytics]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateVariant = async () => {
    setActionLoading('create');
    try {
      const response = await promptVariantsApi.create({
        organization_id: organizationId,
        ...formData,
      });

      if (response.data.success) {
        toast.success('Variant created successfully');
        setShowCreateModal(false);
        resetForm();
        loadData();
      } else {
        toast.error(response.data.error?.message || 'Failed to create variant');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to create variant');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateVariant = async () => {
    if (!editingVariant) return;

    setActionLoading('update');
    try {
      const response = await promptVariantsApi.update(editingVariant.id, formData);

      if (response.data.success) {
        toast.success('Variant updated successfully');
        setShowEditModal(false);
        setEditingVariant(null);
        resetForm();
        loadData();
      } else {
        toast.error(response.data.error?.message || 'Failed to update variant');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to update variant');
    } finally {
      setActionLoading(null);
    }
  };

  const handleActivate = async (variant: PromptVariant) => {
    setActionLoading(variant.id);
    try {
      const response = await promptVariantsApi.activate(variant.id, 50);
      if (response.data.success) {
        toast.success(`${variant.name} activated for A/B testing`);
        loadData();
      } else {
        toast.error(response.data.error?.message || 'Failed to activate variant');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to activate variant');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePause = async (variant: PromptVariant) => {
    setActionLoading(variant.id);
    try {
      const response = await promptVariantsApi.pause(variant.id);
      if (response.data.success) {
        toast.success(`${variant.name} paused`);
        loadData();
      } else {
        toast.error(response.data.error?.message || 'Failed to pause variant');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to pause variant');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePromote = async (variant: PromptVariant) => {
    if (!confirm(`Promote "${variant.name}" as the winner? This will archive other variants and apply this prompt to your AI receptionist.`)) {
      return;
    }

    setActionLoading(variant.id);
    try {
      const response = await promptVariantsApi.promote(variant.id);
      if (response.data.success) {
        toast.success(`${variant.name} promoted as winner!`);
        loadData();
      } else {
        toast.error(response.data.error?.message || 'Failed to promote variant');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to promote variant');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (variant: PromptVariant) => {
    if (!confirm(`Delete "${variant.name}"? This action cannot be undone.`)) {
      return;
    }

    setActionLoading(variant.id);
    try {
      await promptVariantsApi.delete(variant.id);
      toast.success(`${variant.name} deleted`);
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to delete variant');
    } finally {
      setActionLoading(null);
    }
  };

  const openEditModal = (variant: PromptVariant) => {
    setEditingVariant(variant);
    setFormData({
      name: variant.name,
      description: variant.description,
      system_prompt: variant.system_prompt,
      first_message: variant.first_message,
      traffic_percentage: variant.traffic_percentage,
      is_control: variant.is_control,
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      system_prompt: '',
      first_message: "Hello, thank you for calling. How may I help you today?",
      traffic_percentage: 50,
      is_control: false,
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-600">{error}</p>
            <Button onClick={loadData} className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wand2 className="h-6 w-6 text-primary-500" />
              <div>
                <CardTitle>AI Prompt Optimization</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  A/B test different prompts to improve your AI receptionist's performance
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm" onClick={() => setShowCreateModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Variant
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Performance Chart */}
      {analytics.length > 0 && (
        <PromptPerformanceChart data={analytics} />
      )}

      {/* Variants List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary-500" />
            Prompt Variants
          </CardTitle>
        </CardHeader>
        <CardContent>
          {variants.length === 0 ? (
            <div className="text-center py-12">
              <Wand2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No variants yet</h3>
              <p className="text-gray-500 mb-4">
                Create your first prompt variant to start A/B testing
              </p>
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Variant
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {variants.map((variant) => {
                const statusStyle = STATUS_BADGES[variant.status] || STATUS_BADGES.draft;
                const stats = variant.stats;
                const isLoading = actionLoading === variant.id;

                return (
                  <div
                    key={variant.id}
                    className={cn(
                      'border rounded-lg p-4 transition-all',
                      variant.status === 'winner' ? 'border-green-300 bg-green-50' : 'border-gray-200',
                      variant.status === 'active' ? 'border-teal-200' : ''
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{variant.name}</h4>
                          <Badge className={cn(statusStyle.bg, statusStyle.color)}>
                            {variant.status_display}
                          </Badge>
                          {variant.is_control && (
                            <Badge variant="outline" size="sm">Control</Badge>
                          )}
                          {variant.traffic_percentage > 0 && (
                            <span className="text-xs text-gray-500">
                              {variant.traffic_percentage}% traffic
                            </span>
                          )}
                        </div>
                        {variant.description && (
                          <p className="text-sm text-gray-600 mb-3">{variant.description}</p>
                        )}

                        {/* Stats */}
                        {stats && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 pt-3 border-t border-gray-100">
                            <div>
                              <p className="text-xs text-gray-500">Total Calls</p>
                              <p className="text-lg font-semibold text-gray-900">
                                {stats.total_calls}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Conversion Rate</p>
                              <p className={cn(
                                'text-lg font-semibold',
                                stats.conversion_rate > 30 ? 'text-green-600' :
                                stats.conversion_rate > 15 ? 'text-amber-600' : 'text-gray-900'
                              )}>
                                {stats.conversion_rate.toFixed(1)}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Appointments</p>
                              <p className="text-lg font-semibold text-gray-900">
                                {stats.appointments_booked}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Avg Duration</p>
                              <p className="text-lg font-semibold text-gray-900">
                                {formatDuration(stats.avg_duration_seconds)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        {variant.status === 'draft' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleActivate(variant)}
                            disabled={isLoading}
                          >
                            {isLoading ? <Spinner size="sm" /> : <Play className="h-4 w-4" />}
                          </Button>
                        )}
                        {variant.status === 'active' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePause(variant)}
                              disabled={isLoading}
                              title="Pause"
                            >
                              {isLoading ? <Spinner size="sm" /> : <Pause className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePromote(variant)}
                              disabled={isLoading}
                              title="Promote as Winner"
                              className="text-green-600 hover:text-green-700"
                            >
                              <Trophy className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {variant.status === 'paused' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleActivate(variant)}
                            disabled={isLoading}
                            title="Resume"
                          >
                            {isLoading ? <Spinner size="sm" /> : <Play className="h-4 w-4" />}
                          </Button>
                        )}
                        {variant.status !== 'winner' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditModal(variant)}
                              disabled={isLoading}
                              title="Edit"
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(variant)}
                              disabled={isLoading}
                              className="text-red-600 hover:text-red-700"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How A/B Testing Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">1. Create Variants</h4>
              <p className="text-sm text-gray-600">
                Create different prompt versions with varying approaches or tones
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">2. Split Traffic</h4>
              <p className="text-sm text-gray-600">
                Calls are randomly assigned to different variants based on traffic allocation
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">3. Promote Winner</h4>
              <p className="text-sm text-gray-600">
                Once you identify the best performer, promote it to use for all calls
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        title="Create Prompt Variant"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variant Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Friendly Approach, Professional Tone"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief description of this variant's approach"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              System Prompt *
            </label>
            <textarea
              value={formData.system_prompt}
              onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Enter the system prompt that defines how the AI should behave..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Message
            </label>
            <textarea
              value={formData.first_message}
              onChange={(e) => setFormData({ ...formData, first_message: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="The greeting message when a call starts"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Traffic Percentage
              </label>
              <input
                type="number"
                value={formData.traffic_percentage}
                onChange={(e) => setFormData({ ...formData, traffic_percentage: parseInt(e.target.value) || 0 })}
                min={0}
                max={100}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="is_control"
                checked={formData.is_control}
                onChange={(e) => setFormData({ ...formData, is_control: e.target.checked })}
                className="h-4 w-4 text-primary-600 rounded"
              />
              <label htmlFor="is_control" className="text-sm text-gray-700">
                Mark as control group
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => {
              setShowCreateModal(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateVariant}
              disabled={!formData.name || !formData.system_prompt || actionLoading === 'create'}
            >
              {actionLoading === 'create' ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Creating...
                </>
              ) : (
                'Create Variant'
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingVariant(null);
          resetForm();
        }}
        title={`Edit Variant: ${editingVariant?.name}`}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variant Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              System Prompt *
            </label>
            <textarea
              value={formData.system_prompt}
              onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Message
            </label>
            <textarea
              value={formData.first_message}
              onChange={(e) => setFormData({ ...formData, first_message: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Traffic Percentage
              </label>
              <input
                type="number"
                value={formData.traffic_percentage}
                onChange={(e) => setFormData({ ...formData, traffic_percentage: parseInt(e.target.value) || 0 })}
                min={0}
                max={100}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="is_control_edit"
                checked={formData.is_control}
                onChange={(e) => setFormData({ ...formData, is_control: e.target.checked })}
                className="h-4 w-4 text-primary-600 rounded"
              />
              <label htmlFor="is_control_edit" className="text-sm text-gray-700">
                Mark as control group
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => {
              setShowEditModal(false);
              setEditingVariant(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateVariant}
              disabled={!formData.name || !formData.system_prompt || actionLoading === 'update'}
            >
              {actionLoading === 'update' ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
