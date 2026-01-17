'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, FileText, Check, Trash2 } from 'lucide-react';
import { Button, Input, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface AppointmentType {
  id: string;
  name: string;
  duration_minutes: number;
  color: string;
}

interface Appointment {
  id?: string;
  title: string;
  start_time: string;
  end_time: string;
  status: string;
  caller_name: string;
  caller_phone: string;
  caller_email?: string;
  appointment_type_id?: string;
  notes?: string;
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Appointment>) => Promise<void>;
  onConfirm?: (id: string) => Promise<void>;
  onCancel?: (id: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  appointment?: Appointment | null;
  appointmentTypes: AppointmentType[];
  selectedDate?: Date;
  selectedHour?: number;
  calendarId: string;
}

export function AppointmentModal({
  isOpen,
  onClose,
  onSave,
  onConfirm,
  onCancel,
  onDelete,
  appointment,
  appointmentTypes,
  selectedDate,
  selectedHour,
  calendarId,
}: AppointmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    caller_name: '',
    caller_phone: '',
    caller_email: '',
    appointment_type_id: '',
    date: '',
    start_time: '',
    end_time: '',
    notes: '',
  });

  useEffect(() => {
    if (appointment) {
      // Edit mode
      const startDate = new Date(appointment.start_time);
      const endDate = new Date(appointment.end_time);

      setFormData({
        title: appointment.title || '',
        caller_name: appointment.caller_name || '',
        caller_phone: appointment.caller_phone || '',
        caller_email: appointment.caller_email || '',
        appointment_type_id: appointment.appointment_type_id || '',
        date: startDate.toISOString().split('T')[0],
        start_time: startDate.toTimeString().slice(0, 5),
        end_time: endDate.toTimeString().slice(0, 5),
        notes: appointment.notes || '',
      });
    } else if (selectedDate) {
      // Create mode with pre-selected date/time
      const hour = selectedHour ?? 9;
      setFormData({
        title: '',
        caller_name: '',
        caller_phone: '',
        caller_email: '',
        appointment_type_id: appointmentTypes[0]?.id || '',
        date: selectedDate.toISOString().split('T')[0],
        start_time: `${hour.toString().padStart(2, '0')}:00`,
        end_time: `${(hour + 1).toString().padStart(2, '0')}:00`,
        notes: '',
      });
    } else {
      // Reset form
      setFormData({
        title: '',
        caller_name: '',
        caller_phone: '',
        caller_email: '',
        appointment_type_id: appointmentTypes[0]?.id || '',
        date: new Date().toISOString().split('T')[0],
        start_time: '09:00',
        end_time: '10:00',
        notes: '',
      });
    }
  }, [appointment, selectedDate, selectedHour, appointmentTypes]);

  // Update end time when appointment type changes
  useEffect(() => {
    if (formData.appointment_type_id && formData.start_time) {
      const selectedType = appointmentTypes.find(t => t.id === formData.appointment_type_id);
      if (selectedType) {
        const [hours, minutes] = formData.start_time.split(':').map(Number);
        const endMinutes = hours * 60 + minutes + selectedType.duration_minutes;
        const endHours = Math.floor(endMinutes / 60);
        const endMins = endMinutes % 60;
        setFormData(prev => ({
          ...prev,
          end_time: `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`,
        }));
      }
    }
  }, [formData.appointment_type_id, formData.start_time, appointmentTypes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const startDateTime = new Date(`${formData.date}T${formData.start_time}`);
      const endDateTime = new Date(`${formData.date}T${formData.end_time}`);

      await onSave({
        id: appointment?.id,
        title: formData.title || `Appointment with ${formData.caller_name}`,
        caller_name: formData.caller_name,
        caller_phone: formData.caller_phone,
        caller_email: formData.caller_email,
        appointment_type_id: formData.appointment_type_id || undefined,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        notes: formData.notes,
      });

      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!appointment?.id || !onConfirm) return;
    setLoading(true);
    try {
      await onConfirm(appointment.id);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to confirm appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!appointment?.id || !onCancel) return;
    setLoading(true);
    try {
      await onCancel(appointment.id);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to cancel appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!appointment?.id || !onDelete) return;
    if (!confirm('Are you sure you want to delete this appointment?')) return;

    setLoading(true);
    try {
      await onDelete(appointment.id);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to delete appointment');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isEditMode = Boolean(appointment?.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-dark">
            {isEditMode ? 'Edit Appointment' : 'New Appointment'}
          </h2>
          <div className="flex items-center gap-2">
            {isEditMode && appointment?.status && (
              <Badge
                variant={
                  appointment.status === 'confirmed'
                    ? 'success'
                    : appointment.status === 'pending'
                    ? 'warning'
                    : 'default'
                }
              >
                {appointment.status}
              </Badge>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-surface rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-light" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Appointment Type */}
          {appointmentTypes.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                Appointment Type
              </label>
              <select
                value={formData.appointment_type_id}
                onChange={(e) => setFormData({ ...formData, appointment_type_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select type...</option>
                {appointmentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name} ({type.duration_minutes} min)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date and Time */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                <Calendar className="h-4 w-4 inline mr-1" />
                Date
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                <Clock className="h-4 w-4 inline mr-1" />
                Start
              </label>
              <Input
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                End
              </label>
              <Input
                type="time"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                <User className="h-4 w-4 inline mr-1" />
                Client Name *
              </label>
              <Input
                value={formData.caller_name}
                onChange={(e) => setFormData({ ...formData, caller_name: e.target.value })}
                placeholder="John Smith"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone *
                </label>
                <Input
                  type="tel"
                  value={formData.caller_phone}
                  onChange={(e) => setFormData({ ...formData, caller_phone: e.target.value })}
                  placeholder="+1 (416) 555-1234"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.caller_email}
                  onChange={(e) => setFormData({ ...formData, caller_email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>

          {/* Title / Reason */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Title / Reason
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Initial consultation"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              <FileText className="h-4 w-4 inline mr-1" />
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Any additional notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              {isEditMode && onDelete && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDelete}
                  disabled={loading}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isEditMode && appointment?.status === 'pending' && onConfirm && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleConfirm}
                  disabled={loading}
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Confirm
                </Button>
              )}

              {isEditMode && appointment?.status !== 'cancelled' && onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel Apt
                </Button>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Close
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
