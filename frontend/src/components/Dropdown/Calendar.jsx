import { useState } from 'react';
import Calendar from 'react-calendar';

function CalendarDropdown() {
    const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default CalendarDropdown