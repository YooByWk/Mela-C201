import React, { useEffect, useState } from "react"
import Calendar from 'react-calendar'
import '../../../assets/css/calendar.css'
import moment from 'moment'
import styled from "styled-components"
import { ScheduleList } from "../../../API/ScheduleAPI"
import { useParams } from "react-router-dom"


function CalendarBox () {
    const { teamspaceIdx } = useParams()
    const [date, setDate] = useState(new Date())
    const [event, setEvent] = useState([])
  
    const handleDateChange = (newDate) => {
        setDate(moment(newDate).format('MM/DD(dd)'))
    }

    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const dateInfo = await ScheduleList(teamspaceIdx)
          const eventDate = dateInfo.map(e => moment(e.date).format('MM/DD'))
          setEvent(eventDate)
        } catch (err) {
          console.log(err)
        }
      }
      fetchEvent()
    }, [teamspaceIdx])

    return (
        <Calendar
            onChange={handleDateChange}
            className='mx-auto w-full text-sm border-b'
            formatDay={(locale, date) => moment(date).format("D")}
            value={date}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
        />
    )
}

export default CalendarBox

const StyledDot = styled.div`
  background-color: #00BD79;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`