import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import TeamspaceTeam from "../components/teamspace/TeamspaceTeam"
import TeamspaceAudio from "../components/teamspace/TeamspaceAudio"
import TeamspaceFile from "../components/teamspace/TeamspaceFile"
import TeamspaceManage from "../components/teamspace/TeamspaceManage"
import TeamspaceInviteModal from '../components/Modals/TeamspaceInviteModal';

// 캘린더
import CalendarBox from '../components/teamspace/calendar/CalendarBox';
import Schedule from '../components/teamspace/calendar/Schedule';
import TodoAddModal from '../components/teamspace/calendar/TodoAddModal';
// import styles from './MyCalendarPage.module.css';

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

function TeamspaceDetail () {

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

    // 캘린더 부분
    const [date, setDate] = useState(new Date())
    const [modal, setModal] = useState(false)
    const [schedule, setSchedule] = useState(() => loadData())

    useEffect(() => {
        localStorage.setItem('schedule', JSON.stringify(schedule));
      }, [schedule]);

      // 일정 클릭 시 일정의 상세 페이지로 이동하는 기능
  const [isList, setIsList] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState({});
  const handleTodo = (todo) => {
    setSelectedTodo(todo);
    setIsList(false);
  };
  const closeDetail = () => {
    setIsList(true);
  };

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const deleteTodoItem = (month, id) => {
    const newList = schedule[month].filter((todo) => todo.id !== id);
    setSchedule((prev) => ({
      ...prev,
      [month]: newList,
    }));
  };
  const updateTodoItem = (month, newTodo) => {
    const newList = schedule[month]
      .filter((todo) => todo.id !== newTodo.id)
      .concat(newTodo);
    setSchedule((prev) => ({
      ...prev,
      [month]: newList,
    }));
  };

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
        </div>
        {/* 캘린더 */}
        <div>
      {/* <div className={styles.box}> */}
      <div>
        <CalendarBox
          date={date}
          handleDate={setDate}
          schedule={schedule}
          closeDetail={closeDetail}
        />
        <Schedule
          date={date}
          openModal={openModal}
          schedule={schedule}
          deleteTodoItem={deleteTodoItem}
          isList={isList}
          selectedTodo={selectedTodo}
          handleTodo={handleTodo}
          closeDetail={closeDetail}
          updateTodoItem={updateTodoItem}
        />
        <TodoAddModal
          open={modal}
          date={date}
          closeModal={closeModal}
          schedule={schedule}
          addSchedule={setSchedule}
        />
      </div>
    </div>
        </>
    )
}

function loadData() {
    const schedule = JSON.parse(localStorage.getItem('schedule'));
    return schedule ? schedule : {};
  }

export default TeamspaceDetail