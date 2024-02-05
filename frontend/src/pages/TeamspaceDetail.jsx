import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import TeamspaceTeam from "../components/teamspace/TeamspaceTeam"
import TeamspaceAudio from "../components/teamspace/TeamspaceAudio"
import TeamspaceFile from "../components/teamspace/TeamspaceFile"
import TeamspaceManage from "../components/teamspace/TeamspaceManage"
import TeamspaceInviteModal from '../components/Modals/TeamspaceInviteModal';

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
        </>
    )
}

export default TeamspaceDetail