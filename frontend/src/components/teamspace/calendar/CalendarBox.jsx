import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarBox.css';
import moment from 'moment';

export default function CalendarBox({
  date: selectedDate,
  handleDate,
  schedule,
  closeDetail,
}) {

  const show = ({ date, view }) => {
    if (view === 'month') {
      const month = date.getMonth() + '월';
      let html = [];
      const scheduleList = Object.keys(schedule).includes(
        `${date.getMonth()}월`
      )
        ? schedule[month].filter(
            (todo) => todo.date === moment(date).format('YYYY년 MM월 DD일')
          )
        : [];
      for (let i = 0; i < scheduleList.length; i++) {
        if (i === 2) break;
        html.push(
          <div
            key={scheduleList[i].id}
          >
            {scheduleList[i].title.length > 6
              ? scheduleList[i].title.substring(0, 5) + '..'
              : scheduleList[i].title}
          </div>
        );
      }
      return <div className="scheduleBox">{html}</div>;
    }
  };
  return (
    <div className="container">
      <Calendar
        onChange={handleDate}
        value={selectedDate}
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        }
        next2Label={null}
        prev2Label={null}
        tileContent={show}
        onClickDay={closeDetail}
      />
    </div>
  );
}
