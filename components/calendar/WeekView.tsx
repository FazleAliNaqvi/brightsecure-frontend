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

interface WeekViewProps {
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

export function WeekView({
  currentDate,
  events,
  onDateChange,
  onEventClick,
  onSlotClick,
  workingHours = { start: WORKING_START, end: WORKING_END },
}: WeekViewProps) {
  const weekDays = useMemo(() => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay()); // Go to Sunday

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      return date;
    });
  }, [currentDate]);

  const eventsByDayAndHour = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();

    events.forEach((event) => {
      const startDate = new Date(event.start_time);
      const dateKey = startDate.toDateString();
      const hourKey = startDate.getHours();
      const key = `${dateKey}-${hourKey}`;

      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(event);
    });

    return map;
  }, [events]);

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    onDateChange(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  const formatEventTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getWeekRange = () => {
    const start = weekDays[0];
    const end = weekDays[6];
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const year = end.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${year}`;
    }
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${year}`;
  };

  const displayHours = HOURS.filter(
    (h) => h >= workingHours.start - 1 && h <= workingHours.end
  );

  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-dark">{getWeekRange()}</h2>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousWeek}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-light" />
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-light" />
          </button>
        </div>
      </div>

      <div className="overflow-auto max-h-[calc(100vh-300px)]">
        {/* Day headers */}
        <div className="grid grid-cols-8 border-b border-border sticky top-0 bg-white z-10">
          <div className="p-2 border-r border-border" /> {/* Time column */}
          {weekDays.map((date, index) => (
            <div
              key={index}
              className={cn(
                'p-3 text-center border-r border-border last:border-r-0',
                isToday(date) && 'bg-primary-50'
              )}
            >
              <div className="text-sm text-light">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div
                className={cn(
                  'text-lg font-semibold',
                  isToday(date) ? 'text-primary-500' : 'text-dark'
                )}
              >
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="grid grid-cols-8">
          {displayHours.map((hour) => (
            <div key={hour} className="contents">
              {/* Time label */}
              <div className="p-2 text-right text-xs text-light border-r border-b border-border bg-gray-50">
                {formatHour(hour)}
              </div>

              {/* Day columns */}
              {weekDays.map((date, dayIndex) => {
                const key = `${date.toDateString()}-${hour}`;
                const hourEvents = eventsByDayAndHour.get(key) || [];
                const isWorkingHour = hour >= workingHours.start && hour < workingHours.end;
                const isPast = date < new Date() && !isToday(date);

                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    onClick={() => !isPast && isWorkingHour && onSlotClick(date, hour)}
                    className={cn(
                      'min-h-[60px] p-1 border-r border-b border-border last:border-r-0',
                      'transition-colors',
                      isWorkingHour ? 'bg-white' : 'bg-gray-50',
                      !isPast && isWorkingHour && 'hover:bg-primary-50 cursor-pointer',
                      isPast && 'bg-gray-100 opacity-50'
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
                          'px-2 py-1 mb-1 rounded text-xs cursor-pointer',
                          'hover:opacity-80 transition-opacity',
                          event.status === 'confirmed' && 'bg-green-100 text-green-800 border-l-2 border-green-500',
                          event.status === 'pending' && 'bg-amber-100 text-amber-800 border-l-2 border-amber-500',
                          event.status === 'cancelled' && 'bg-red-100 text-red-800 line-through',
                          event.status === 'completed' && 'bg-gray-100 text-gray-600'
                        )}
                      >
                        <div className="font-medium truncate">
                          {formatEventTime(event.start_time)} - {event.caller_name}
                        </div>
                        {event.title && (
                          <div className="truncate opacity-75">{event.title}</div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
