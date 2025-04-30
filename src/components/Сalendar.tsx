import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  SlotInfo,
  View
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useState } from 'react';
import { EventDialog } from './EventDialog';

const DnDCalendar = withDragAndDrop(BigCalendar);

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
  id: string;
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

  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  const handleSlotSelect = (slotInfo: SlotInfo) => {
    setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
    setDialogMode('add');
    setDialogOpen(true);
  };

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSlot(null);
    setSelectedEvent(null);
  };

  const handleSubmit = (eventData: {
    title: string;
    notes: string;
    start: Date;
    end: Date;
    color?: string;
  }) => {
    if (dialogMode === 'add') {
      const newEvent: MyEvent = {
        ...eventData,
        id: crypto.randomUUID(),
        color: eventData.color || '#2196f3',
      };
      setEvents([...events, newEvent]);
    } else if (dialogMode === 'edit' && selectedEvent) {
      setEvents(
        events.map((ev) =>
          ev.id === selectedEvent.id
            ? {
                ...eventData,
                id: ev.id,
                color: eventData.color || ev.color,
              }
            : ev
        )
      );
    }
    handleCloseDialog();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((ev) => ev.id !== selectedEvent.id));
      handleCloseDialog();
    }
  };

  const handleEventDrop = ({ event, start, end }: any) => {
    setEvents(
      events.map((ev) =>
        ev.id === event.id ? { ...ev, start, end } : ev
      )
    );
  };

  return (
    <div style={{ height: 500 }}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor={(event: any) => new Date(event.start)}
        endAccessor={(event: any) => new Date(event.end)}
        style={{ height: '100%' }}
        views={['month', 'week', 'day']}
        view={view}
        onView={setView}
        date={currentDate}
        onNavigate={setCurrentDate}
        onSelectSlot={handleSlotSelect}
        selectable
        onSelectEvent={handleEventSelect}
        onEventDrop={handleEventDrop}
        eventPropGetter={(event: any) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />

      <EventDialog
        open={dialogOpen}
        mode={dialogMode}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        onDelete={dialogMode === 'edit' ? handleDeleteEvent : undefined}
        initialData={
          dialogMode === 'add'
            ? selectedSlot
              ? { title: '', notes: '', start: selectedSlot.start, end: selectedSlot.end, color: '' }
              : { title: '', notes: '', start: new Date(), end: new Date(), color: '' }
            : selectedEvent || { title: '', notes: '', start: new Date(), end: new Date(), color: '' }
        }
      />
    </div>
  );
};