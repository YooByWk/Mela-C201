import { useState } from 'react'
import styled from "styled-components";
import TeamspaceTeam from "../components/TeamspaceTeam"
import TeamspaceAudio from "../components/TeamspaceAudio"
import TeamspaceFile from "../components/TeamspaceFile"
import TeamspaceManage from "../components/TeamspaceManage"

const TabMenu = styled.ul`
    color: white;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;

    .submenu {
        display: flex;
        justify-content: space-between;
        width: 200px;
        height: 30px;
        padding: 10px;
        font-size: 20px;
    }

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
            <TabMenu>
                {menuArr.map((el, index) => (
                    <li className={index === currentTab ? "submenu focused" : "submenu" }
                    onClick={() => clickMenuHandler(index)}>
                        {el.name}
                    </li>
                ))}
            </TabMenu>
            {menuArr[currentTab].content}
        </div>
        </>
    )
}

export default TeamspaceDetail