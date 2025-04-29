import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

interface AddEventDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (eventData: { title: string; notes: string; start: Date; end: Date }) => void;
  slotInfo: { start: Date; end: Date } | null;
}

export const AddEventDialog: FC<AddEventDialogProps> = ({
  open,
  onClose,
  onAdd,
  slotInfo,
}) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());

  useEffect(() => {
    if (slotInfo) {
      setStart(slotInfo.start);
      setEnd(slotInfo.end);
    }
  }, [slotInfo]);

  const handleAdd = () => {
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        notes,
        start,
        end,
      });
      setTitle('');
      setNotes('');
    }
  };

  const handleClose = () => {
    onClose();
    setTitle('');
    setNotes('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Event name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Date"
            value={start.toLocaleDateString()}
            disabled
            fullWidth
          />
          <TimePicker
            label="Start time"
            value={start}
            onChange={(newVal) => newVal && setStart(newVal)}
          />
          <TimePicker
            label="End time"
            value={end}
            onChange={(newVal) => newVal && setEnd(newVal)}
          />
          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => {
              if (e.target.value.length <= 30) setNotes(e.target.value);
            }}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          disabled={!title.trim()}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};