'use client';

import { useState } from 'react';
import { Bell, Mail, MessageSquare, Phone, Save, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui';
import api from '@/lib/api';

interface NotificationSettingsProps {
  organizationId: string;
  settings: Record<string, any>;
  onUpdate: (settings: Record<string, any>) => void;
}

export function NotificationSettings({ organizationId, settings, onUpdate }: NotificationSettingsProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    // Email notifications
    email_new_appointment: settings?.email_new_appointment ?? true,
    email_cancelled_appointment: settings?.email_cancelled_appointment ?? true,
    email_missed_call: settings?.email_missed_call ?? true,
    email_daily_summary: settings?.email_daily_summary ?? true,
    email_weekly_report: settings?.email_weekly_report ?? true,

    // SMS notifications
    sms_new_appointment: settings?.sms_new_appointment ?? false,
    sms_cancelled_appointment: settings?.sms_cancelled_appointment ?? false,
    sms_urgent_only: settings?.sms_urgent_only ?? true,

    // Notification timing
    daily_summary_time: settings?.daily_summary_time ?? '18:00',
    weekly_report_day: settings?.weekly_report_day ?? 'monday',

    // Caller notifications
    caller_confirmation_email: settings?.caller_confirmation_email ?? true,
    caller_reminder_email: settings?.caller_reminder_email ?? true,
    caller_reminder_hours: settings?.caller_reminder_hours ?? 24,
  });

  const handleChange = (key: string, value: any) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.put(`/organizations/${organizationId}/settings/notifications/`, {
        settings: notificationSettings,
      });

      if (response.data.success) {
        onUpdate(notificationSettings);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.data.error?.message || 'Failed to save');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary-500" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Choose which events trigger email notifications to your team.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">New Appointment</div>
                <div className="text-sm text-gray-500">
                  When the AI books a new appointment
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.email_new_appointment}
                  onChange={(e) => handleChange('email_new_appointment', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Cancelled Appointment</div>
                <div className="text-sm text-gray-500">
                  When an appointment is cancelled
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.email_cancelled_appointment}
                  onChange={(e) => handleChange('email_cancelled_appointment', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Missed Call Alert</div>
                <div className="text-sm text-gray-500">
                  When a call could not be completed
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.email_missed_call}
                  onChange={(e) => handleChange('email_missed_call', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Daily Summary</div>
                <div className="text-sm text-gray-500">
                  Receive a daily recap of calls and appointments
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.email_daily_summary}
                  onChange={(e) => handleChange('email_daily_summary', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Weekly Report</div>
                <div className="text-sm text-gray-500">
                  Receive a weekly analytics report
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.email_weekly_report}
                  onChange={(e) => handleChange('email_weekly_report', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary-500" />
            SMS Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Get text message alerts for urgent notifications.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">New Appointment SMS</div>
                <div className="text-sm text-gray-500">
                  Text alert for new bookings
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.sms_new_appointment}
                  onChange={(e) => handleChange('sms_new_appointment', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Urgent Only</div>
                <div className="text-sm text-gray-500">
                  Only send SMS for flagged urgent calls
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.sms_urgent_only}
                  onChange={(e) => handleChange('sms_urgent_only', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timing Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary-500" />
            Notification Timing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Summary Time
              </label>
              <input
                type="time"
                value={notificationSettings.daily_summary_time}
                onChange={(e) => handleChange('daily_summary_time', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">When to send the daily summary email</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Report Day
              </label>
              <select
                value={notificationSettings.weekly_report_day}
                onChange={(e) => handleChange('weekly_report_day', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Day to receive weekly report</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Caller Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary-500" />
            Caller Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Configure automatic notifications sent to your callers.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Confirmation Email</div>
                <div className="text-sm text-gray-500">
                  Send email confirmation when appointment is booked
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.caller_confirmation_email}
                  onChange={(e) => handleChange('caller_confirmation_email', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Reminder Email</div>
                <div className="text-sm text-gray-500">
                  Send reminder before appointment
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.caller_reminder_email}
                  onChange={(e) => handleChange('caller_reminder_email', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            {notificationSettings.caller_reminder_email && (
              <div className="ml-4 p-4 border-l-2 border-primary-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reminder Timing
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    max={72}
                    value={notificationSettings.caller_reminder_hours}
                    onChange={(e) => handleChange('caller_reminder_hours', parseInt(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm text-gray-600">hours before appointment</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex items-center justify-between">
        <div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">Settings saved!</p>}
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Notification Settings'}
        </Button>
      </div>
    </div>
  );
}
