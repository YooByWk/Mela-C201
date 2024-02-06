import { useState } from "react"
import Calendar from 'react-calendar'
import '../../../assets/css/calendar.css'
import moment from 'moment'
import { ScheduleGenerate } from "../../../API/ScheduleAPI"


function CalendarBox ({ mark }) {
    const [value, setValue] = useState(new Date())
  
    const handleChange = (selectDate) => {
        setValue(moment(selectDate).format('MM/DD(dd)'))
    }

    return (
        <>
        <Calendar
            onChange={handleChange}
            className='mx-auto w-full text-sm border-b'
            formatDay={(locale, date) => moment(date).format("D")}
            value={value}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
            tileContent={({ date, view }) => {
                // 날짜 타일에 컨텐츠 추가
                const html = [];
                if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
                  html.push(<div className="dot"></div>);
                }
                return (
                  <>
                  <div className="flex justify-center items-center absoluteDiv">
                    {html}
                  </div>
                  </>
                );
            }}
        />
        </>
    )
}

export default CalendarBox