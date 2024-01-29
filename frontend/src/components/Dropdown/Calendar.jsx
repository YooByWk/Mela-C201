import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from "moment";

function CalendarDropdown({ onChange }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onChange(moment(newDate).format("YYYY-MM-DD"));
  }

  return (
    <div>
      <Calendar onChange={handleDateChange} value={date} />
    </div> 
  );
}

export default CalendarDropdown