import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import TeamspaceTeam from "../components/teamspace/TeamspaceTeam"
import TeamspaceAudio from "../components/teamspace/TeamspaceAudio"
import TeamspaceFile from "../components/teamspace/TeamspaceFile"
import TeamspaceManage from "../components/teamspace/TeamspaceManage"
import TeamspaceInviteModal from '../components/Modals/TeamspaceInviteModal';

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { ScheduleList } from '../API/ScheduleAPI';
import moment from "moment"
import CalendarBox from '../components/teamspace/schedule/CalendarBox';
import Schedule from '../components/teamspace/schedule/Schedule';
import TodoAddModal from '../components/teamspace/schedule/TodoAddModal';

const TabMenu = styled.ul`
    color: white;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;

    // 메뉴 css
    .submenu {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 30px;
        padding: 10px;
        font-size: 20px;
        cursor: pointer;
    }

    // 선택한 메뉴 css
    .focused {
        text-decoration: underline;
        text-decoration-color: #254EF8;
    }
`

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
`

const CustomCalendar = styled(Calendar)`
    margin-left: 250px;
`
function TeamspaceDetail () {
    const teamspaceId = useParams()

    // 현재 어느 메뉴가 선택 되었는가?
    const [currentTab, clickTab] = useState(0)

    const menuArr = [
        { name: 'Team', content: <TeamspaceTeam/>},
        { name: 'Audio File', content: <TeamspaceAudio/>},
        { name: 'Files', content: <TeamspaceFile/>},
        { name: 'Management', content: <TeamspaceManage/>},
    ]

    // 현재 선택한 인덱스 값을 받아서 clickTab에 저장하여 currentTab 갱신
    const clickMenuHandler = (index) => {
        clickTab(index)
    }


    // 캘린더 
    const [schedule, setSchedule] = useState([])
    const [date, setDate] = useState(new Date())
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const schedules = async() => {     
          try {
              // console.log(teamspaceId)
              const event = await ScheduleList({teamspaceId: teamspaceId.teamspaceIdx})
              console.log(event)
              setSchedule(event)
            } catch (err) {
              console.error(err)
            }
          }; 
          
          schedules()
          // console.log(mark)
        },[teamspaceId])

        useEffect(() => {
          for (let index = 0; index < schedule.length; index++) {
            const element = schedule[index];
            console.log(typeof(element))
            console.log(element.endTime[5] + element.endTime[6])
            console.log(Number(element.endTime[5] + element.endTime[6]))
          }
        }, [schedule]);

          // 일정 클릭 시 일정의 상세 페이지로 이동하는 기능
        const [isList, setIsList] = useState(true);
        const [selectedTodo, setSelectedTodo] = useState({});
        const handleTodo = (todo) => {
          setSelectedTodo(todo);
          setIsList(false);
        }

        const closeDetail = () => {
          setIsList(true);
        }
      
        const openModal = () => {
          setModal(true);
        }

        const closeModal = () => {
          setModal(false);
        }
    return(
        <>
        <div>
            <TabMenu >
                {menuArr.map((el, index) => (
                    <li className={index === currentTab ? "submenu focused" : "submenu" }>
                    <span onClick={() => clickMenuHandler(index)}>
                        {el.name}
                    </span>
                    </li>
                ))}
            </TabMenu>
            <TeamspaceInviteModal />
            {menuArr[currentTab].content}
            <CalendarBox
              date={date}
              handleDate={setDate}
              schedule={schedule}
              closeDetail={closeDetail}
            />
                    {/* <Schedule
              date={date}
              openModal={openModal}
              schedule={schedule}
              // deleteTodoItem={deleteTodoItem}
              isList={isList}
              selectedTodo={selectedTodo}
              handleTodo={handleTodo}
              closeDetail={closeDetail}
              // updateTodoItem={updateTodoItem}
            /> */}
            <TodoAddModal
              open={modal}
              date={date}
              closeModal={closeModal}
              schedule={schedule}
              addSchedule={setSchedule}
            />
            {/* <CustomCalendar
                onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
                formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                value={value}
                minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                navigationLabel={null}
                showNeighboringMonth={true} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                className="mx-auto w-full text-sm border-b"
                tileContent={({ date, view }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
                    // 추가할 html 태그를 변수 초기화
                    let html = [];
                    // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                    if (mark.includes((endTime) => endTime === moment(date).format("YYYY-MM-DD"))) {
                    html.push(<Dot className="dot"></Dot>);
                    }
                    // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
                    return (
                    <>
                        <div className="flex justify-center items-center absoluteDiv">
                        {html}
                        </div>
                    </>
    );
  }}
/> */}
        </div>
        </>
    )
}

export default TeamspaceDetail