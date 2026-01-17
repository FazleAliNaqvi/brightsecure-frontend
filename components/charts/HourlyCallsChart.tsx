'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface CallsByHour {
  hour: number;
  count: number;
}

interface HourlyCallsChartProps {
  data: CallsByHour[];
  title?: string;
}

export function HourlyCallsChart({ data, title = 'Calls by Hour' }: HourlyCallsChartProps) {
  // Transform data for chart - ensure all 24 hours are represented
  const chartData = Array.from({ length: 24 }, (_, hour) => {
    const hourData = data.find((d) => d.hour === hour);
    return {
      hour,
      name: `${hour.toString().padStart(2, '0')}:00`,
      calls: hourData?.count || 0,
      isBusinessHours: hour >= 9 && hour < 17,
    };
  });

  const peakHour = chartData.reduce((max, item) =>
    item.calls > max.calls ? item : max, chartData[0]
  );

  const totalCalls = chartData.reduce((sum, item) => sum + item.calls, 0);
  const businessHoursCalls = chartData
    .filter((item) => item.isBusinessHours)
    .reduce((sum, item) => sum + item.calls, 0);
  const businessHoursPercent = totalCalls > 0
    ? Math.round((businessHoursCalls / totalCalls) * 100)
    : 0;

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-light">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-border rounded-lg shadow-lg">
          <p className="font-semibold text-dark">{data.name}</p>
          <p className="text-sm text-light">{data.calls} calls</p>
          {data.isBusinessHours && (
            <p className="text-xs text-primary-500 mt-1">Business hours</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="text-sm text-light">
            Peak: <span className="font-medium text-dark">{peakHour.name}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#EBEBEB" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: '#767676' }}
                tickLine={false}
                axisLine={{ stroke: '#EBEBEB' }}
                interval={2}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#767676' }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F7F7F7' }} />
              <ReferenceLine x="09:00" stroke="#00A699" strokeDasharray="3 3" />
              <ReferenceLine x="17:00" stroke="#00A699" strokeDasharray="3 3" />
              <Bar
                dataKey="calls"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isBusinessHours ? '#FF5A5F' : '#D1D5DB'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-500 rounded" />
              <span className="text-sm text-light">Business hours (9am-5pm)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded" />
              <span className="text-sm text-light">After hours</span>
            </div>
          </div>
          <div className="text-sm text-light">
            <span className="font-medium text-dark">{businessHoursPercent}%</span> during business hours
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
