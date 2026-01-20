'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface VariantData {
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
}

interface PromptPerformanceChartProps {
  data: VariantData[];
  title?: string;
}

const STATUS_COLORS: Record<string, string> = {
  active: '#00A699',
  winner: '#008A05',
  paused: '#FFB400',
  draft: '#9CA3AF',
  archived: '#6B7280',
};

export function PromptPerformanceChart({
  data,
  title = 'Variant Performance Comparison',
}: PromptPerformanceChartProps) {
  // Transform data for chart
  const chartData = data.map((item) => ({
    name: item.variant_name.length > 15
      ? item.variant_name.substring(0, 15) + '...'
      : item.variant_name,
    fullName: item.variant_name,
    conversionRate: item.conversion_rate,
    calls: item.total_calls,
    appointments: item.appointments_booked,
    status: item.status,
    isControl: item.is_control,
    trafficPercentage: item.traffic_percentage,
  }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            No variant data available. Create and activate variants to see performance comparison.
          </div>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{item.fullName}</p>
          {item.isControl && (
            <p className="text-xs text-blue-600 mb-1">Control Group</p>
          )}
          <p className="text-sm text-gray-600">
            Conversion: <span className="font-medium">{item.conversionRate.toFixed(1)}%</span>
          </p>
          <p className="text-sm text-gray-600">
            Total Calls: <span className="font-medium">{item.calls}</span>
          </p>
          <p className="text-sm text-gray-600">
            Appointments: <span className="font-medium">{item.appointments}</span>
          </p>
          <p className="text-sm text-gray-600">
            Traffic: <span className="font-medium">{item.trafficPercentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
                label={{
                  value: 'Conversion Rate (%)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 12, fill: '#6B7280' },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="conversionRate" name="Conversion Rate" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.status] || '#9CA3AF'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {Object.entries(STATUS_COLORS).map(([status, color]) => (
            <div key={status} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-600 capitalize">{status}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
