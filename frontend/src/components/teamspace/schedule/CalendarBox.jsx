import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import moment from "moment";
import { useContext } from "react";

function CalendarBox({
    date: selectedDate,
    handleDate,
    schedule,
    closeDetail
}) {
    // 그 날의 스케쥴 달력에 표시
    const show = ({ date, view }) => {
        if (view === 'month') {
            const month = date.getMonth() + '월'
            let html = []
            for (let index = 0; index < schedule.length; index++) {
                const element = schedule[index];
                
                const scheduleMonth = element.endTime[5] + element.endTime[6]
                const scheduleDay = element.endTime[8] + element.endTime[9]
                const scheduleList = Number(scheduleMonth) === date.getMonth() + 1 
                    ? schedule.filter(
                        (todo) => todo.date === moment(date)
                    )
                    : [] 
                    for (let i = 0; i < scheduleList.length; i++) {
                            if (i === 2) break;
                            html.push(
                                <div
                                key={scheduleList[i].scheduleIdx}
                                >
                          {scheduleList[i].title.length > 6
                            ? scheduleList[i].title.substring(0, 5) + '..'
                            : scheduleList[i].title}
                        </div>
                      )
                }
                }
            }
        }
    
        return (
        <div className="container">
            <Calendar
                onChange={handleDate}
                value={selectedDate}
                formatDay={(locale, date) => {
                    date.toLocaleString('ko', {day: 'numeric'})
                }}
                next2Label={null}
                prev2Label={null}
                tileContent={show}
                onClickDay={closeDetail}
                />
        </div>
    )
    }

export default CalendarBox