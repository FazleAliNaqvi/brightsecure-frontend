'use client';

import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, User, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Badge } from '@/components/ui';

interface CalendarEvent {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  status: string;
  caller_name: string;
  caller_phone?: string;
  caller_email?: string;
  appointment_type_name?: string;
  color?: string;
  notes?: string;
}

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateChange: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onSlotClick: (date: Date, hour: number) => void;
  workingHours?: { start: number; end: number };
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const WORKING_START = 8;
const WORKING_END = 18;

export function DayView({
  currentDate,
  events,
  onDateChange,
  onEventClick,
  onSlotClick,
  workingHours = { start: WORKING_START, end: WORKING_END },
}: DayViewProps) {
  const dayEvents = useMemo(() => {
    return events
      .filter((event) => {
        const eventDate = new Date(event.start_time).toDateString();
        return eventDate === currentDate.toDateString();
      })
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
  }, [events, currentDate]);

  const eventsByHour = useMemo(() => {
    const map = new Map<number, CalendarEvent[]>();

    dayEvents.forEach((event) => {
      const hour = new Date(event.start_time).getHours();
      if (!map.has(hour)) {
        map.set(hour, []);
      }
      map.get(hour)!.push(event);
    });

    return map;
  }, [dayEvents]);

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const isToday = () => {
    const today = new Date();
    return currentDate.toDateString() === today.toDateString();
  };

  const isPast = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const current = new Date(currentDate);
    current.setHours(0, 0, 0, 0);
    return current < today;
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  const formatEventTime = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startTime = startDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const endTime = endDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `${startTime} - ${endTime}`;
  };

  const getEventDuration = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.round(diff / 60000);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const displayHours = HOURS.filter(
    (h) => h >= workingHours.start - 1 && h <= workingHours.end
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-dark">
            {currentDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </h2>
          {isToday() && (
            <Badge variant="primary">Today</Badge>
          )}
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousDay}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-light" />
          </button>
          <button
            onClick={goToNextDay}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-light" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-0">
        {/* Time slots */}
        <div className="lg:col-span-2 overflow-auto max-h-[calc(100vh-300px)] border-r border-border">
          {displayHours.map((hour) => {
            const hourEvents = eventsByHour.get(hour) || [];
            const isWorkingHour = hour >= workingHours.start && hour < workingHours.end;
            const isCurrentHour = isToday() && new Date().getHours() === hour;

            return (
              <div
                key={hour}
                className={cn(
                  'flex border-b border-border',
                  isCurrentHour && 'bg-primary-50'
                )}
              >
                {/* Time label */}
                <div className="w-20 p-3 text-right text-sm text-light border-r border-border flex-shrink-0">
                  {formatHour(hour)}
                </div>

                {/* Events / slot */}
                <div
                  onClick={() => !isPast() && isWorkingHour && onSlotClick(currentDate, hour)}
                  className={cn(
                    'flex-1 min-h-[80px] p-2',
                    isWorkingHour ? 'bg-white' : 'bg-gray-50',
                    !isPast() && isWorkingHour && 'hover:bg-primary-50 cursor-pointer',
                    isPast() && 'bg-gray-100 opacity-50'
                  )}
                >
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className={cn(
                        'p-3 mb-2 rounded-lg cursor-pointer transition-all',
                        'hover:shadow-md',
                        event.status === 'confirmed' && 'bg-green-50 border-l-4 border-green-500',
                        event.status === 'pending' && 'bg-amber-50 border-l-4 border-amber-500',
                        event.status === 'cancelled' && 'bg-red-50 border-l-4 border-red-300 opacity-60',
                        event.status === 'completed' && 'bg-gray-50 border-l-4 border-gray-300'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-dark">
                            {event.caller_name}
                          </div>
                          <div className="text-sm text-light mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatEventTime(event.start_time, event.end_time)}
                            <span className="text-xs">({getEventDuration(event.start_time, event.end_time)})</span>
                          </div>
                        </div>
                        <Badge variant={getStatusVariant(event.status) as any} size="sm">
                          {event.status}
                        </Badge>
                      </div>
                      {event.title && (
                        <div className="text-sm text-dark mt-2">{event.title}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Day summary sidebar */}
        <div className="p-4 bg-gray-50">
          <h3 className="font-semibold text-dark mb-4">
            Appointments ({dayEvents.filter(e => e.status !== 'cancelled').length})
          </h3>

          {dayEvents.length === 0 ? (
            <div className="text-center py-8 text-light">
              <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No appointments scheduled</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className={cn(
                    'p-3 bg-white rounded-lg border border-border cursor-pointer',
                    'hover:shadow-md transition-shadow',
                    event.status === 'cancelled' && 'opacity-50'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-dark truncate">
                      {event.caller_name}
                    </span>
                    <Badge variant={getStatusVariant(event.status) as any} size="sm">
                      {event.status}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-sm text-light">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {formatEventTime(event.start_time, event.end_time)}
                    </div>
                    {event.caller_phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {event.caller_phone}
                      </div>
                    )}
                    {event.appointment_type_name && (
                      <div className="text-xs bg-gray-100 px-2 py-1 rounded inline-block">
                        {event.appointment_type_name}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
