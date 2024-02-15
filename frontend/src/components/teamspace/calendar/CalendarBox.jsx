import React, { useEffect, useState } from "react"
import Calendar from 'react-calendar'
import '../../../assets/css/calendar.css'
import styled from 'styled-components'
import moment from 'moment'
import { ScheduleList } from "../../../API/ScheduleAPI"
import { useParams } from "react-router-dom"


function CalendarBox () {
    const { teamspaceIdx } = useParams()
    const [date, setDate] = useState(new Date())
    const [marks, setMarks] = useState([])
  
    const handleDateChange = (newDate) => {
        setDate(newDate)
    }

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const dateInfo = await ScheduleList(teamspaceIdx)
          const eventDates = dateInfo.map(e => moment(e.startTime).format('MM/DD'))
          setMarks(eventDates)
          // console.log(eventDates)
        } catch (err) {
        }
      }
        fetchEvents()
    }, [teamspaceIdx])


    return (
        <Calendar
            onChange={handleDateChange}
            className='mx-auto w-full text-sm border-b'
            calendarType="gregory"
            formatDay={(locale, date) => moment(date).format("D")} // '일' 제거하고 숫자만 보이게
            value={date}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
            tileContent={({ date, view }) => {
              let html = []
              if (
                marks.find((x) => x === moment(date).format("MM/DD"))
              ) {
                html.push(<StyledDot key={moment(date).format("MM/DD")} />);
              }
              return <>{html}</>;
            }}
        />
    )
}

export default CalendarBox

const StyledDot = styled.div`
    background-color: #76ff91;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 5px;
    margin-top: 2px;
`