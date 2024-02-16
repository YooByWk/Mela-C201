import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import TeamspaceTeam from "../components/teamspace/TeamspaceTeam"
import TeamspaceAudio from "../components/teamspace/TeamspaceAudio"
import TeamspaceFile from "../components/teamspace/TeamspaceFile"
import TeamspaceManage from "../components/teamspace/TeamspaceManage"
import TeamspaceInviteModal from '../components/Modals/TeamspaceInviteModal'
import CalendarBar from '../components/teamspace/calendar/CalendarBar'

function TeamspaceDetail () {
    // 현재 어느 메뉴가 선택 되었는가?
    const [currentTab, clickTab] = useState(0)
    const  teamspaceIdx  = useParams().teamspaceIdx
    const Navigate = useNavigate()
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
    const goVideo = (e) => {
        e.preventDefault()
        sessionStorage.clear()
        sessionStorage.setItem('teamspaceIdx', teamspaceIdx)
        // console.log(sessionStorage.getItem('teamspaceIdx')+ '세션스토리지')
        Navigate(`../teamspace/video/${teamspaceIdx}`, { state : { teamspace : teamspaceIdx } })
    }
    const goBack = () => {
        // console.log()
        Navigate(-1)
    }

    let au = null
    if (localStorage.getItem('accessToken')) {au = true} else {au = false}
    console.log(au)


    if (au)
    {return(
        <>
        <Container>
            <Header>
                <TabMenu>
                    {menuArr.map((el, index) => (
                        <li className={index === currentTab ? "submenu focused" : "submenu" } key={index}>
                        <span onClick={() => clickMenuHandler(index)}>
                            {el.name}
                        </span>
                        </li>
                    ))}
                </TabMenu>
                <div className='button-wrapper'>
                    <TeamspaceInviteModal />
                </div>
            </Header>
            <div className='content-box'>
                <div className='nowContent'>
                    {menuArr[currentTab].content}
                </div>
                <div className='schedule-box'>
                    <CalendarBar />
                    <div>
                    
                        <h1  
                        onClick={goVideo}
                        style={{color: 'white',}}>
                            화상 회의 참여하기
                        </h1>
                    </div>
                </div>
            </div>
        </Container>
        </>
    )}
    else {
        return (
            <div>로그인이 필요합니다.</div>
        )

}
}
export default TeamspaceDetail


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    .content-box {
        display: flex;
        flex-direction: row;
    }
    
    .nowContent {
        flex: 0.7;
    }
    
    .schedule-box {
        flex: 0.3;
        /* margin-top: -4.5%; */
    }
`

const Header = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

const TabMenu = styled.ul`
    color: white;
    font-weight: bold;
    display: flex;
    flex-direction: row;
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
