import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

function GatherCal({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript의 month는 0부터 시작
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    const dateString = `${year}-${formattedMonth}-${formattedDay}`;

    onDateChange(dateString);
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        popperPlacement="right"
        required
      />
    </div>
  );
}
export default GatherCal
