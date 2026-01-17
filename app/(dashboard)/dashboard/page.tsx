'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Calendar,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  MessageSquare,
  PhoneIncoming,
  AlertCircle,
  Activity,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { CallTrendChart, CallOutcomeChart, HourlyCallsChart } from '@/components/charts';
import { dashboardApi } from '@/lib/api';
import { formatDate, formatTime, formatPhone, formatDuration } from '@/lib/utils';

interface DashboardStats {
  total_calls: number;
  calls_change_percent: number;
  total_appointments: number;
  appointments_change_percent: number;
  avg_call_duration: number;
  avg_duration_change_percent: number;
  pending_confirmations: number;
  active_calls: number;
  appointments_booked_today: number;
  messages_taken_today: number;
  callbacks_requested_today: number;
}

interface RecentCall {
  id: string;
  caller_phone: string;
  caller_name: string;
  duration_seconds: number;
  duration_formatted: string;
  outcome: string;
  outcome_display: string;
  status: string;
  started_at: string;
  summary: string;
}

interface UpcomingAppointment {
  id: string;
  title: string;
  caller_name: string;
  caller_phone: string;
  start_time: string;
  end_time: string;
  status: string;
  status_display: string;
  appointment_type_name: string | null;
  duration_minutes: number;
}

interface CallsByOutcome {
  outcome: string;
  outcome_display: string;
  count: number;
  percentage: number;
}

interface CallsByHour {
  hour: number;
  count: number;
}

interface CallsByDay {
  date: string;
  total: number;
  completed: number;
  appointments_booked: number;
}

const outcomeColors: Record<string, { bg: string; text: string; variant: 'success' | 'primary' | 'warning' | 'error' | 'default' }> = {
  appointment_booked: { bg: 'bg-green-100', text: 'text-green-700', variant: 'success' },
  message_taken: { bg: 'bg-blue-100', text: 'text-blue-700', variant: 'primary' },
  callback_requested: { bg: 'bg-amber-100', text: 'text-amber-700', variant: 'warning' },
  inquiry: { bg: 'bg-gray-100', text: 'text-gray-700', variant: 'default' },
  spam: { bg: 'bg-red-100', text: 'text-red-700', variant: 'error' },
  transferred: { bg: 'bg-purple-100', text: 'text-purple-700', variant: 'warning' },
  unknown: { bg: 'bg-gray-100', text: 'text-gray-700', variant: 'default' },
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentCalls, setRecentCalls] = useState<RecentCall[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>([]);
  const [callsByOutcome, setCallsByOutcome] = useState<CallsByOutcome[]>([]);
  const [callsByHour, setCallsByHour] = useState<CallsByHour[]>([]);
  const [callsByDay, setCallsByDay] = useState<CallsByDay[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await dashboardApi.getOverview();

      if (response.data.success) {
        const data = response.data.data;
        setStats(data.stats);
        setRecentCalls(data.recent_calls);
        setUpcomingAppointments(data.upcoming_appointments);
        setCallsByOutcome(data.calls_by_outcome);
        setCallsByHour(data.calls_by_hour || []);
        setCallsByDay(data.calls_by_day || []);
      } else {
        setError(response.data.error?.message || 'Failed to load dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <div className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>Try Again</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
          <p className="text-light mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        {stats?.active_calls && stats.active_calls > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <Activity className="h-4 w-4 text-green-600 animate-pulse" />
            <span className="text-sm font-medium text-green-700">
              {stats.active_calls} active call{stats.active_calls > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Calls"
          value={stats?.total_calls || 0}
          change={stats?.calls_change_percent}
          icon={Phone}
          period="this month"
        />
        <StatCard
          title="Appointments"
          value={stats?.total_appointments || 0}
          change={stats?.appointments_change_percent}
          icon={Calendar}
          period="this month"
        />
        <StatCard
          title="Avg Call Duration"
          value={formatDuration(stats?.avg_call_duration || 0)}
          change={stats?.avg_duration_change_percent}
          icon={Clock}
          period="this month"
        />
        <StatCard
          title="Pending"
          value={stats?.pending_confirmations || 0}
          icon={TrendingUp}
          period="need confirmation"
          highlight={Boolean(stats?.pending_confirmations && stats.pending_confirmations > 0)}
        />
      </div>

      {/* Today's Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickStatCard
          icon={CheckCircle}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          label="Appointments Booked Today"
          value={stats?.appointments_booked_today || 0}
        />
        <QuickStatCard
          icon={MessageSquare}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          label="Messages Taken Today"
          value={stats?.messages_taken_today || 0}
        />
        <QuickStatCard
          icon={PhoneIncoming}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          label="Callbacks Requested Today"
          value={stats?.callbacks_requested_today || 0}
        />
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Calls */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Calls</CardTitle>
              <Link href="/calls" className="text-sm text-primary-500 hover:underline">
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {recentCalls.length === 0 ? (
              <div className="text-center py-8 text-light">
                <Phone className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No calls yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentCalls.map((call) => (
                  <Link
                    key={call.id}
                    href={`/calls/${call.id}`}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-surface -mx-4 px-4 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-surface rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-light" />
                      </div>
                      <div>
                        <div className="font-medium text-dark">
                          {call.caller_name || formatPhone(call.caller_phone)}
                        </div>
                        <div className="text-sm text-light">
                          {call.duration_formatted} • {formatTime(call.started_at)}
                        </div>
                      </div>
                    </div>
                    <Badge variant={outcomeColors[call.outcome]?.variant || 'default'}>
                      {call.outcome_display}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Appointments</CardTitle>
              <Link href="/calendar" className="text-sm text-primary-500 hover:underline">
                View calendar
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8 text-light">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No upcoming appointments</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-primary-50 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary-500" />
                      </div>
                      <div>
                        <div className="font-medium text-dark">{apt.title}</div>
                        <div className="text-sm text-light">
                          {apt.caller_name} • {formatDate(apt.start_time, { month: 'short', day: 'numeric' })} at {formatTime(apt.start_time)}
                        </div>
                      </div>
                    </div>
                    <Badge variant={apt.status === 'confirmed' ? 'success' : 'warning'}>
                      {apt.status_display}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts Section */}
      {(callsByDay.length > 0 || callsByOutcome.length > 0) && (
        <div className="grid lg:grid-cols-2 gap-6">
          {callsByDay.length > 0 && (
            <CallTrendChart data={callsByDay} title="Call Trends (Last 7 Days)" />
          )}
          {callsByOutcome.length > 0 && (
            <CallOutcomeChart data={callsByOutcome} title="Call Outcomes This Month" />
          )}
        </div>
      )}

      {/* Hourly Distribution Chart */}
      {callsByHour.length > 0 && (
        <HourlyCallsChart data={callsByHour} title="Call Volume by Hour" />
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/calls">
              <QuickActionButton
                icon={Phone}
                label="View Calls"
                description="See call history"
              />
            </Link>
            <Link href="/calendar">
              <QuickActionButton
                icon={Calendar}
                label="Manage Calendar"
                description="View appointments"
              />
            </Link>
            <Link href="/settings">
              <QuickActionButton
                icon={Zap}
                label="AI Settings"
                description="Configure receptionist"
              />
            </Link>
            <Link href="/billing">
              <QuickActionButton
                icon={TrendingUp}
                label="View Usage"
                description="Check billing"
              />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  change,
  icon: Icon,
  period,
  highlight,
}: {
  title: string;
  value: number | string;
  change?: number;
  icon: any;
  period: string;
  highlight?: boolean;
}) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className={highlight ? 'border-primary-200 bg-primary-50' : ''}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
            highlight ? 'bg-primary-100' : 'bg-surface'
          }`}>
            <Icon className={`h-5 w-5 ${highlight ? 'text-primary-500' : 'text-light'}`} />
          </div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${
              isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-light'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : isNegative ? (
                <ArrowDownRight className="h-4 w-4" />
              ) : null}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div className="text-2xl font-bold text-dark">{value}</div>
        <div className="text-sm text-light mt-1">{title} • {period}</div>
      </div>
    </Card>
  );
}

// Quick Stat Card Component
function QuickStatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
}: {
  icon: any;
  iconBg: string;
  iconColor: string;
  label: string;
  value: number;
}) {
  return (
    <Card>
      <div className="p-4 flex items-center gap-4">
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <div className="text-2xl font-bold text-dark">{value}</div>
          <div className="text-sm text-light">{label}</div>
        </div>
      </div>
    </Card>
  );
}

// Quick Action Button Component
function QuickActionButton({
  icon: Icon,
  label,
  description,
}: {
  icon: any;
  label: string;
  description: string;
}) {
  return (
    <div className="p-4 border border-border rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors cursor-pointer group">
      <div className="h-10 w-10 bg-surface rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary-100">
        <Icon className="h-5 w-5 text-light group-hover:text-primary-500" />
      </div>
      <div className="font-medium text-dark">{label}</div>
      <div className="text-sm text-light">{description}</div>
    </div>
  );
}
