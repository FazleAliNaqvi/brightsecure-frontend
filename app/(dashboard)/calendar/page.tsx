'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon, Plus, Grid, List, LayoutGrid } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { CalendarGrid, WeekView, DayView, AppointmentModal } from '@/components/calendar';
import { calendarsApi, appointmentsApi } from '@/lib/api';

type ViewType = 'month' | 'week' | 'day';

interface CalendarData {
  id: string;
  name: string;
  timezone: string;
  working_hours: Record<string, { start: string; end: string; enabled: boolean }>;
  slot_duration: number;
}

interface AppointmentType {
  id: string;
  name: string;
  duration_minutes: number;
  color: string;
}

interface Appointment {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  status: string;
  caller_name: string;
  caller_phone: string;
  caller_email?: string;
  appointment_type?: {
    id: string;
    name: string;
    color: string;
  };
  notes?: string;
}

export default function CalendarPage() {
  const [view, setView] = useState<ViewType>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedHour, setSelectedHour] = useState<number | undefined>();

  const [calendar, setCalendar] = useState<CalendarData | null>(null);
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Fetch calendar data
  useEffect(() => {
    fetchCalendarData();
  }, []);

  // Fetch events when date changes
  useEffect(() => {
    if (calendar) {
      fetchEvents();
    }
  }, [calendar, currentDate, view]);

  const fetchCalendarData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get calendars
      const calResponse = await calendarsApi.list();
      const calendars = calResponse.data.data?.results || calResponse.data.data;
      if (calResponse.data.success && calendars?.length > 0) {
        setCalendar(calendars[0]);
      }

      // Get appointment types
      const typesResponse = await appointmentsApi.list({ upcoming: false });
      // Appointment types would come from a separate endpoint in production
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load calendar');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    if (!calendar) return;

    try {
      // Calculate date range based on view
      let startDate: Date;
      let endDate: Date;

      if (view === 'month') {
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        // Include previous/next month days that appear in the grid
        startDate.setDate(startDate.getDate() - startDate.getDay());
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
      } else if (view === 'week') {
        startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
      } else {
        startDate = new Date(currentDate);
        endDate = new Date(currentDate);
      }

      const response = await calendarsApi.getEvents(calendar.id, {
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
      });

      if (response.data.success) {
        setAppointments(response.data.data.appointments);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (view === 'month') {
      setCurrentDate(date);
      setView('day');
    }
  };

  const handleSlotClick = (date: Date, hour: number) => {
    setSelectedDate(date);
    setSelectedHour(hour);
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: any) => {
    setSelectedAppointment(event as Appointment);
    setIsModalOpen(true);
  };

  const handleSaveAppointment = async (data: Partial<Appointment>) => {
    if (!calendar) throw new Error('No calendar selected');

    if (data.id) {
      // Update
      const response = await appointmentsApi.update(data.id, data);
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to update');
      }
    } else {
      // Create
      const response = await appointmentsApi.create({
        calendar_id: calendar.id,
        title: data.title || '',
        start_time: data.start_time || '',
        end_time: data.end_time,
        caller_name: data.caller_name || '',
        caller_phone: data.caller_phone || '',
        caller_email: data.caller_email,
        notes: data.notes,
      });
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to create');
      }
    }

    // Refresh events
    fetchEvents();
  };

  const handleConfirmAppointment = async (id: string) => {
    const response = await appointmentsApi.confirm(id);
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to confirm');
    }
    fetchEvents();
  };

  const handleCancelAppointment = async (id: string) => {
    const response = await appointmentsApi.cancel(id);
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to cancel');
    }
    fetchEvents();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    setSelectedDate(undefined);
    setSelectedHour(undefined);
  };

  const getWorkingHours = () => {
    if (!calendar?.working_hours) return { start: 9, end: 17 };

    // Find earliest start and latest end from working hours
    let earliestStart = 9;
    let latestEnd = 17;

    Object.values(calendar.working_hours).forEach((day) => {
      if (day.enabled) {
        const startHour = parseInt(day.start.split(':')[0]);
        const endHour = parseInt(day.end.split(':')[0]);
        if (startHour < earliestStart) earliestStart = startHour;
        if (endHour > latestEnd) latestEnd = endHour;
      }
    });

    return { start: earliestStart, end: latestEnd };
  };

  // Transform appointments to calendar event format
  const calendarEvents = appointments.map((apt) => ({
    id: apt.id,
    title: apt.title,
    start_time: apt.start_time,
    end_time: apt.end_time,
    status: apt.status,
    caller_name: apt.caller_name,
    caller_phone: apt.caller_phone,
    caller_email: apt.caller_email,
    appointment_type_name: apt.appointment_type?.name,
    color: apt.appointment_type?.color,
    notes: apt.notes,
  }));

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
            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchCalendarData}>Try Again</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!calendar) {
    return (
      <div className="space-y-6">
        <Card>
          <div className="p-8 text-center">
            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-dark mb-2">No Calendar Found</h3>
            <p className="text-light mb-4">Create a calendar to start scheduling appointments.</p>
            <Button>Create Calendar</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-1">{calendar.name}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Switcher */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === 'month'
                  ? 'bg-white text-dark shadow-sm'
                  : 'text-light hover:text-dark'
              }`}
            >
              <LayoutGrid className="h-4 w-4 inline mr-1" />
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === 'week'
                  ? 'bg-white text-dark shadow-sm'
                  : 'text-light hover:text-dark'
              }`}
            >
              <Grid className="h-4 w-4 inline mr-1" />
              Week
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === 'day'
                  ? 'bg-white text-dark shadow-sm'
                  : 'text-light hover:text-dark'
              }`}
            >
              <List className="h-4 w-4 inline mr-1" />
              Day
            </button>
          </div>

          <Button onClick={() => {
            setSelectedAppointment(null);
            setSelectedDate(new Date());
            setSelectedHour(9);
            setIsModalOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-1" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Calendar View */}
      {view === 'month' && (
        <CalendarGrid
          currentDate={currentDate}
          events={calendarEvents}
          onDateChange={setCurrentDate}
          onDateSelect={handleDateSelect}
          onEventClick={handleEventClick}
          selectedDate={selectedDate}
        />
      )}

      {view === 'week' && (
        <WeekView
          currentDate={currentDate}
          events={calendarEvents}
          onDateChange={setCurrentDate}
          onEventClick={handleEventClick}
          onSlotClick={handleSlotClick}
          workingHours={getWorkingHours()}
        />
      )}

      {view === 'day' && (
        <DayView
          currentDate={currentDate}
          events={calendarEvents}
          onDateChange={setCurrentDate}
          onEventClick={handleEventClick}
          onSlotClick={handleSlotClick}
          workingHours={getWorkingHours()}
        />
      )}

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span className="text-light">Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-500 rounded" />
          <span className="text-light">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span className="text-light">Cancelled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-400 rounded" />
          <span className="text-light">Completed</span>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveAppointment}
        onConfirm={handleConfirmAppointment}
        onCancel={handleCancelAppointment}
        appointment={selectedAppointment}
        appointmentTypes={appointmentTypes}
        selectedDate={selectedDate}
        selectedHour={selectedHour}
        calendarId={calendar.id}
      />
    </div>
  );
}
