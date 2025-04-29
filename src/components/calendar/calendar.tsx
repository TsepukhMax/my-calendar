import { Calendar as BigCalendar, View, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useState } from 'react';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface MyEvent {
  start: Date;
  end: Date;
  title: string;
  color: string;
}

export const MyCalendar = () => {
  const [events, setEvents] = useState<MyEvent[]>([  // Використовуємо state для подій
    {
      start: new Date(2025, 3, 28, 10, 0),
      end: new Date(2025, 3, 28, 11, 0),
      title: 'Перша подія',
      color: '#4caf50',
    },
  ]);
  
  const [view, setView] = useState<View>('month');

  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div style={{ height: 500 }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['month', 'week', 'day']}
        view={view}
        onView={(newView) => setView(newView)}
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />
    </div>
  );
};