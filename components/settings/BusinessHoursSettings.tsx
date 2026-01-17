'use client';

import { useState, useEffect } from 'react';
import { Clock, Save, Plus, Trash2, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

interface BusinessHour {
  id?: string;
  day_of_week: number;
  day_of_week_display?: string;
  is_open: boolean;
  open_time: string | null;
  close_time: string | null;
  break_start: string | null;
  break_end: string | null;
}

interface Holiday {
  id: string;
  name: string;
  date: string;
  is_recurring: boolean;
  custom_message: string;
}

interface BusinessHoursSettingsProps {
  organizationId: string;
}

const DAYS = [
  { value: 0, label: 'Monday' },
  { value: 1, label: 'Tuesday' },
  { value: 2, label: 'Wednesday' },
  { value: 3, label: 'Thursday' },
  { value: 4, label: 'Friday' },
  { value: 5, label: 'Saturday' },
  { value: 6, label: 'Sunday' },
];

const DEFAULT_HOURS: BusinessHour[] = DAYS.map((day) => ({
  day_of_week: day.value,
  is_open: day.value < 5, // Mon-Fri open
  open_time: day.value < 5 ? '09:00' : null,
  close_time: day.value < 5 ? '17:00' : null,
  break_start: null,
  break_end: null,
}));

export function BusinessHoursSettings({ organizationId }: BusinessHoursSettingsProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [hours, setHours] = useState<BusinessHour[]>(DEFAULT_HOURS);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [showAddHoliday, setShowAddHoliday] = useState(false);
  const [newHoliday, setNewHoliday] = useState({
    name: '',
    date: '',
    is_recurring: false,
    custom_message: '',
  });

  useEffect(() => {
    fetchSettings();
  }, [organizationId]);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/organizations/${organizationId}/settings/`);
      if (response.data.success) {
        const data = response.data.data;
        if (data.business_hours && data.business_hours.length > 0) {
          setHours(data.business_hours);
        }
        if (data.holidays) {
          setHolidays(data.holidays);
        }
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHourChange = (dayIndex: number, field: keyof BusinessHour, value: any) => {
    setHours((prev) =>
      prev.map((hour) =>
        hour.day_of_week === dayIndex ? { ...hour, [field]: value } : hour
      )
    );
  };

  const handleSaveHours = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.put(`/organizations/${organizationId}/settings/hours/`, {
        hours: hours,
      });
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.data.error?.message || 'Failed to save');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to save hours');
    } finally {
      setSaving(false);
    }
  };

  const handleAddHoliday = async () => {
    if (!newHoliday.name || !newHoliday.date) return;

    try {
      const response = await api.post(`/organizations/${organizationId}/holidays/`, newHoliday);
      if (response.data.success) {
        setHolidays([...holidays, response.data.data]);
        setNewHoliday({ name: '', date: '', is_recurring: false, custom_message: '' });
        setShowAddHoliday(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to add holiday');
    }
  };

  const handleDeleteHoliday = async (holidayId: string) => {
    try {
      await api.delete(`/organizations/${organizationId}/holidays/${holidayId}/`);
      setHolidays(holidays.filter((h) => h.id !== holidayId));
    } catch (err) {
      console.error('Failed to delete holiday:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary-500" />
            Operating Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {DAYS.map((day) => {
              const hour = hours.find((h) => h.day_of_week === day.value) || {
                day_of_week: day.value,
                is_open: false,
                open_time: null,
                close_time: null,
                break_start: null,
                break_end: null,
              };

              return (
                <div
                  key={day.value}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-lg border',
                    hour.is_open ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
                  )}
                >
                  {/* Day name */}
                  <div className="w-28 font-medium text-gray-900">{day.label}</div>

                  {/* Open/Closed toggle */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hour.is_open}
                      onChange={(e) => handleHourChange(day.value, 'is_open', e.target.checked)}
                      className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-600">
                      {hour.is_open ? 'Open' : 'Closed'}
                    </span>
                  </label>

                  {hour.is_open && (
                    <>
                      {/* Hours */}
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={hour.open_time || '09:00'}
                          onChange={(e) => handleHourChange(day.value, 'open_time', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-gray-400">to</span>
                        <input
                          type="time"
                          value={hour.close_time || '17:00'}
                          onChange={(e) => handleHourChange(day.value, 'close_time', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>

                      {/* Break */}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Break:</span>
                        <input
                          type="time"
                          value={hour.break_start || ''}
                          onChange={(e) => handleHourChange(day.value, 'break_start', e.target.value || null)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm w-24"
                          placeholder="Start"
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={hour.break_end || ''}
                          onChange={(e) => handleHourChange(day.value, 'break_end', e.target.value || null)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm w-24"
                          placeholder="End"
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">Hours saved!</p>}
            </div>
            <Button onClick={handleSaveHours} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Hours'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Holidays */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary-500" />
              Holiday Closures
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddHoliday(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Holiday
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddHoliday && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Holiday Name
                  </label>
                  <Input
                    value={newHoliday.name}
                    onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                    placeholder="e.g., Christmas Day"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={newHoliday.date}
                    onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Message (optional)
                </label>
                <Input
                  value={newHoliday.custom_message}
                  onChange={(e) => setNewHoliday({ ...newHoliday, custom_message: e.target.value })}
                  placeholder="Custom greeting for this holiday"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newHoliday.is_recurring}
                    onChange={(e) => setNewHoliday({ ...newHoliday, is_recurring: e.target.checked })}
                    className="w-4 h-4 text-primary-500 rounded"
                  />
                  <span className="text-sm text-gray-600">Recurring annually</span>
                </label>

                <div className="flex-1" />

                <Button variant="outline" size="sm" onClick={() => setShowAddHoliday(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddHoliday}>
                  Add Holiday
                </Button>
              </div>
            </div>
          )}

          {holidays.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No holidays configured</p>
              <p className="text-sm">Add holidays when your business will be closed</p>
            </div>
          ) : (
            <div className="space-y-2">
              {holidays.map((holiday) => (
                <div
                  key={holiday.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">{holiday.name}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(holiday.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      {holiday.is_recurring && (
                        <Badge variant="default" size="sm" className="ml-2">
                          Recurring
                        </Badge>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteHoliday(holiday.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
