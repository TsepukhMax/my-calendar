import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { InputLabel } from '@mui/material';

interface EventDialogProps {
  open: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSubmit: (eventData: { title: string; notes: string; start: Date; end: Date; color?: string }) => void;
  onDelete?: () => void;
  initialData?: {
    title: string;
    notes: string;
    start: Date;
    end: Date;
    color: string;
  };
}

export const EventDialog: FC<EventDialogProps> = ({
  open,
  mode,
  onClose,
  onSubmit,
  onDelete,
  initialData,
}) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const [color, setColor] = useState('#2196f3');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setNotes(initialData.notes || '');
      setStart(initialData.start || new Date());
      setEnd(initialData.end || new Date());
      setColor(initialData.color || '#2196f3');
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        notes,
        start,
        end,
        color,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setTitle('');
    setNotes('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{mode === 'edit' ? 'Edit Event' : 'Add Event'}</DialogTitle>
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
          <div>
            <InputLabel shrink>Color</InputLabel>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: '100%', height: 40, border: 'none', cursor: 'pointer' }}
            />
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        {mode === 'edit' && onDelete && (
          <Button onClick={() => { onDelete(); handleClose(); }} color="error">
            Delete
          </Button>
        )}
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!title.trim()}
        >
          {mode === 'edit' ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};