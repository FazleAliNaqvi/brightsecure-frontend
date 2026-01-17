'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

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

interface CallsChartProps {
  data: CallsByHour[] | CallsByDay[];
  type: 'hourly' | 'daily';
  title?: string;
}

export function CallsChart({ data, type, title }: CallsChartProps) {
  const maxValue = useMemo(() => {
    if (type === 'hourly') {
      return Math.max(...(data as CallsByHour[]).map((d) => d.count), 1);
    }
    return Math.max(...(data as CallsByDay[]).map((d) => d.total), 1);
  }, [data, type]);

  if (type === 'hourly') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title || 'Calls by Hour'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1 h-40">
            {(data as CallsByHour[]).map((item) => {
              const height = (item.count / maxValue) * 100;
              const isBusinessHours = item.hour >= 9 && item.hour < 17;
              return (
                <div
                  key={item.hour}
                  className="flex-1 flex flex-col items-center group"
                >
                  <div
                    className={`w-full rounded-t transition-all ${
                      isBusinessHours
                        ? 'bg-primary-500 hover:bg-primary-600'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    style={{ height: `${Math.max(height, 2)}%` }}
                    title={`${item.hour}:00 - ${item.count} calls`}
                  />
                  {item.hour % 4 === 0 && (
                    <span className="text-xs text-light mt-1">
                      {item.hour.toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-500 rounded" />
              <span className="text-light">Business hours (9am-5pm)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded" />
              <span className="text-light">After hours</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Daily chart
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title || 'Calls by Day'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {(data as CallsByDay[]).slice(-7).map((item) => {
            const totalWidth = (item.total / maxValue) * 100;
            const date = new Date(item.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            return (
              <div key={item.date} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-dark">{dayName} {dateStr}</span>
                  <span className="text-light">{item.total} calls</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-200 rounded-full relative"
                    style={{ width: `${totalWidth}%` }}
                  >
                    {item.appointments_booked > 0 && (
                      <div
                        className="absolute left-0 top-0 h-full bg-green-500 rounded-full"
                        style={{ width: `${(item.appointments_booked / item.total) * 100}%` }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span className="text-light">Appointments booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-200 rounded" />
            <span className="text-light">Other calls</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
