'use client';

import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface CalendarEvent {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  status: string;
  caller_name: string;
  appointment_type_name?: string;
  color?: string;
}

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateChange: (date: Date) => void;
  onDateSelect: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  selectedDate?: Date;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function CalendarGrid({
  currentDate,
  events,
  onDateChange,
  onDateSelect,
  onEventClick,
  selectedDate,
}: CalendarGridProps) {
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Start from the Sunday before the first day
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    // End on the Saturday after the last day
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    const days: Date[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }, [currentDate]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();

    events.forEach((event) => {
      const dateKey = new Date(event.start_time).toDateString();
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(event);
    });

    // Sort events by start time
    map.forEach((dayEvents) => {
      dayEvents.sort((a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      );
    });

    return map;
  }, [events]);

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const formatEventTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-amber-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-primary-500';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-dark">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-light" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-light" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-border">
        {DAYS.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-sm font-medium text-light"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((date, index) => {
          const dateKey = date.toDateString();
          const dayEvents = eventsByDate.get(dateKey) || [];
          const isInCurrentMonth = isCurrentMonth(date);

          return (
            <div
              key={index}
              onClick={() => onDateSelect(date)}
              className={cn(
                'min-h-[120px] p-2 border-b border-r border-border cursor-pointer transition-colors',
                !isInCurrentMonth && 'bg-gray-50',
                isSelected(date) && 'bg-primary-50',
                'hover:bg-surface',
                index % 7 === 6 && 'border-r-0'
              )}
            >
              <div
                className={cn(
                  'w-7 h-7 flex items-center justify-center rounded-full text-sm mb-1',
                  isToday(date) && 'bg-primary-500 text-white font-semibold',
                  !isToday(date) && isInCurrentMonth && 'text-dark',
                  !isToday(date) && !isInCurrentMonth && 'text-light'
                )}
              >
                {date.getDate()}
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={cn(
                      'px-2 py-1 rounded text-xs truncate cursor-pointer',
                      'hover:opacity-80 transition-opacity',
                      event.status === 'confirmed' && 'bg-green-100 text-green-800',
                      event.status === 'pending' && 'bg-amber-100 text-amber-800',
                      event.status === 'cancelled' && 'bg-red-100 text-red-800 line-through',
                      event.status === 'completed' && 'bg-gray-100 text-gray-600'
                    )}
                    style={event.color ? { backgroundColor: `${event.color}20`, color: event.color } : undefined}
                  >
                    <span className="font-medium">{formatEventTime(event.start_time)}</span>
                    {' '}
                    {event.caller_name}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-light px-2">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
