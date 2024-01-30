import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarDropdown = ({ handleBirthClick }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      dateClick={handleBirthClick}
    />
  );
};

export default CalendarDropdown
