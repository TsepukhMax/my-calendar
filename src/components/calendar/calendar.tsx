import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'; // імпортуємо Event, якщо він є
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

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

// Оголошуємо тип події
interface MyEvent extends Event {
  start: Date;
  end: Date;
  title: string;
}

const events: MyEvent[] = []; // тепер TypeScript знає тип подій

export const MyCalendar = () => {
  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
    </div>
  );
};