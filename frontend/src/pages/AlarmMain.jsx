import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import AlarmAll from '../components/alarm/AlarmAll'
import AlarmUnread from '../components/alarm/AlarmUnread'
import DefaultButton from '../components/DefaultButton'
import { FaRegBell } from "react-icons/fa6"
import { LuBellDot } from "react-icons/lu"
import { delNotification } from '../API/UserAPI'


function AlarmMain () {
    const [currentTab, setCurrentTab] = useState(0)
    const navigate = useNavigate()

    const menuArr = [
        { name: 'All', content: <AlarmAll />, icon: <FaRegBell />},
        { name: 'Unread', content: <AlarmUnread />, icon: <LuBellDot />}
    ]

    const handleClickMenu = (index) => {
        setCurrentTab(index)
    }

    // const handleDelete = async () => {
        
    // }

    return (
        <>
        <Container>
            <TabMenu>
                {menuArr.map((el, index) => (
                    <li className={index === currentTab ? 'submenu focused' : 'submenu'} key={index}>
                        <span onClick={() => handleClickMenu(index)}>
                            <span className='menu-wrapper'>
                                {el.icon}
                                <span className='spacing'>{el.name}</span>
                            </span>
                        </span>
                    </li>
                ))}
                <p>Mark all as read</p>
            </TabMenu>
            <div className='main-box'>
                <hr className='line'/>
                {menuArr[currentTab].content}
            </div>

        </Container>
        <div className='footer'>
            <div className='btnWrapper'>
                
                <DefaultButton
                    text='Delete'
                    backgroundcolor='#C02525'
                    width='4rem'
                    height='2rem'
                    // onClick={() => handleDelete()}
                />
            </div>
        </div>
        </>
    )
}

export default AlarmMain


const Container = styled.div`
    background-color: #202C44;
    height: 70%;
    width: 80%;
    border-radius: 20px;
    margin-bottom: 1rem;
    color: white;

    .main-box {
        padding: 20px;
    }

    .footer {
        display: flex;
    }

    .line {
        border: 1px solid #254EF8;
        width: 96%;
    }
`

const TabMenu = styled.ul`
    color: white;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    justify-content: space-evenly;

    .menu-wrapper {
        display: flex;
        align-items: center;
    }

    .spacing {
        margin-left: 10px;
    }

    // 메뉴 css
    .submenu {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 30px;
        padding: 10px;
        font-size: 20px;
        margin-top: 10px;
        cursor: pointer;
    }

    // 선택한 메뉴 css
    .focused {
        border-bottom: solid 2px #254EF8;
    }

    p {
        color: #254EF8;
        font-size: 20px;
    }

`