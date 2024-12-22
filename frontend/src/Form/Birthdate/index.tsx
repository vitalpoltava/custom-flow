import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useEffect, useState} from "react";
const Birthdate = () => {
  useEffect(() => {
    const stateAddress = localStorage.getItem('birthdate');
    if (stateAddress) {
      setBirthdate(dayjs(stateAddress));
    }
  }, []);
  const handleChange = (value: Dayjs | null) => {
    if (value) {
      setBirthdate(value)
      localStorage.setItem('birthdate', value.format('YYYY-MM-DD'));
    }
  }
  const [birthdate, setBirthdate] = useState<Dayjs | null>(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{marginBottom: 3}}
        label="Birthdate"
        value={birthdate}
        onChange={handleChange}
      />
    </LocalizationProvider>
  )
}

export default Birthdate;
