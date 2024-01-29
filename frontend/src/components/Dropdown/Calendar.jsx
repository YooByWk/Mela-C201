import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from "moment"

function CalendarDropdown({onChange, value}) {
    const [nowDate, setNowDate] = useState("날짜")
    console.log(value)
    const handleDateChange = (selectedDate) => {
      onChange(selectedDate)
      setNowDate(moment(selectedDate).format("YYYY-MM-DD"))
    }

  return (
    <div>
      <Calendar onChange={handleDateChange} value={value} />
    </div> 
  )
}

export default CalendarDropdown