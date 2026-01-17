'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Phone, Calendar, MessageSquare, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { dashboardApi } from '@/lib/api';
import { formatTime } from '@/lib/utils';

interface ActivityItem {
  id: string;
  type: 'call' | 'appointment' | 'note';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface ActivityFeedProps {
  limit?: number;
  showHeader?: boolean;
}

const typeIcons = {
  call: Phone,
  appointment: Calendar,
  note: MessageSquare,
};

const typeColors = {
  call: 'bg-blue-100 text-blue-600',
  appointment: 'bg-green-100 text-green-600',
  note: 'bg-amber-100 text-amber-600',
};

export function ActivityFeed({ limit = 10, showHeader = true }: ActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivity();
  }, [limit]);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const response = await dashboardApi.getActivity({ limit });
      if (response.data.success) {
        setActivities(response.data.data.activities);
      }
    } catch (err) {
      setError('Failed to load activity');
    } finally {
      setLoading(false);
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatTime(timestamp);
  };

  const getActivityLink = (activity: ActivityItem) => {
    if (activity.type === 'call') {
      return `/calls/${activity.id}`;
    }
    if (activity.type === 'appointment') {
      return `/calendar`;
    }
    return '#';
  };

  if (loading) {
    return (
      <Card>
        {showHeader && (
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        {showHeader && (
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="text-center py-8 text-light">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-light">
            <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = typeIcons[activity.type];
              const colorClass = typeColors[activity.type];

              return (
                <Link
                  key={`${activity.type}-${activity.id}`}
                  href={getActivityLink(activity)}
                  className="flex items-start gap-4 p-3 -mx-3 rounded-lg hover:bg-surface transition-colors"
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-dark truncate">
                      {activity.title}
                    </div>
                    <div className="text-sm text-light truncate">
                      {activity.description}
                    </div>
                  </div>
                  <div className="text-xs text-light flex-shrink-0">
                    {getRelativeTime(activity.timestamp)}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
