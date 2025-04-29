import { Calendar as BigCalendar, SlotInfo, View, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useState } from 'react';
import { AddEventDialog } from '../AddEventDialog';

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
  notes: string;
}

export const MyCalendar = () => {
  const [events, setEvents] = useState<MyEvent[]>([]);


  const [view, setView] = useState<View>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);


  const handleSlotSelect = (slotInfo: SlotInfo) => {
    setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
    setIsDialogOpen(true);
  };

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
        onView={setView}
        date={currentDate}
        onNavigate={setCurrentDate}
        onSelectSlot={handleSlotSelect}
        selectable
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />

      <AddEventDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        slotInfo={selectedSlot}
        onAdd={({title, notes, start, end}) => {
          if (selectedSlot) {
            const newEvent: MyEvent = {
              title,
              notes,
              start,
              end,
              color: '#2196f3',
            };
            setEvents([...events, newEvent]);
            setSelectedSlot(null);
            setIsDialogOpen(false);
          }
        }}
      />
    </div>
  );
};