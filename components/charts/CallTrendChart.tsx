'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface CallsByDay {
  date: string;
  total: number;
  completed: number;
  appointments_booked: number;
}

interface CallTrendChartProps {
  data: CallsByDay[];
  title?: string;
}

export function CallTrendChart({ data, title = 'Call Trends' }: CallTrendChartProps) {
  // Transform data for chart
  const chartData = data.map((item) => {
    const date = new Date(item.date);
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      total: item.total,
      appointments: item.appointments_booked,
      other: item.total - item.appointments_booked,
    };
  });

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5A5F" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF5A5F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A699" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00A699" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EBEBEB" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#767676' }}
                tickLine={false}
                axisLine={{ stroke: '#EBEBEB' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#767676' }}
                tickLine={false}
                axisLine={{ stroke: '#EBEBEB' }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #EBEBEB',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
                labelStyle={{ color: '#484848', fontWeight: 600 }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
              />
              <Area
                type="monotone"
                dataKey="total"
                name="Total Calls"
                stroke="#FF5A5F"
                strokeWidth={2}
                fill="url(#colorTotal)"
              />
              <Area
                type="monotone"
                dataKey="appointments"
                name="Appointments Booked"
                stroke="#00A699"
                strokeWidth={2}
                fill="url(#colorAppointments)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
