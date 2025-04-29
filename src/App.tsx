import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MyCalendar } from './components/calendar/Сalendar';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MyCalendar />
    </LocalizationProvider>
  );
}

export default App;