'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface CallsByOutcome {
  outcome: string;
  outcome_display: string;
  count: number;
  percentage: number;
}

interface CallOutcomeChartProps {
  data: CallsByOutcome[];
  title?: string;
}

const COLORS: Record<string, string> = {
  appointment_booked: '#00A699',
  message_taken: '#FF5A5F',
  callback_requested: '#FFB400',
  inquiry: '#767676',
  spam: '#C13515',
  transferred: '#8B5CF6',
  unknown: '#D1D5DB',
};

const DEFAULT_COLOR = '#9CA3AF';

export function CallOutcomeChart({ data, title = 'Call Outcomes' }: CallOutcomeChartProps) {
  // Transform data for chart
  const chartData = data.map((item) => ({
    name: item.outcome_display,
    value: item.count,
    outcome: item.outcome,
    percentage: item.percentage,
  }));

  const totalCalls = data.reduce((sum, item) => sum + item.count, 0);

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
          <p className="text-sm text-light">
            {data.value} calls ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-light">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.outcome] || DEFAULT_COLOR}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-2">
          <p className="text-2xl font-bold text-dark">{totalCalls}</p>
          <p className="text-sm text-light">Total Calls This Month</p>
        </div>
      </CardContent>
    </Card>
  );
}
