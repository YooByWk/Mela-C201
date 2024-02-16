import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components'
import { GoBell } from "react-icons/go"
import DefaultButton from "../DefaultButton"
import { notification } from '../../API/UserAPI'
import { button } from '@material-tailwind/react';


function Alarmbar () {
    const [data, setData] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const res = await notification()
            setData(res)
            // console.log(res)
        }
        fetchData()
    },[])

    const goDetail = () => {
        navigate('/alarm')
    }


    return (
        <>
        {localStorage.getItem('accessToken') ?
        <Container>
            <div className="header">
                <div>
                    <GoBell className="icon"/>
                    <span>Alarm</span>
                </div>
                <DefaultButton 
                    text='+'
                    width='1.5rem'
                    height='1rem'
                    backgroundcolor='#151C2C'
                    onClick={goDetail}
                />
            </div>
            <div className="listWrapper">
                <ul className="content">
                    {data && data.length > 0 ? (
                        data.map((alarm) => {
                            return (
                                <li key={alarm.notificationIdx} className="list">
                                    <div className="list-content">
                                        <div className={alarm.checked ? 'read' : 'unread'} />
                                        <Link to={`/alarm`} className="link">
                                            {alarm.alarmContent.length < 10
                                                ? alarm.alarmContent
                                                : alarm.alarmContent.slice(0, 9) + '...'}
                                        </Link>
                                    </div>
                                </li>
                            )
                        }) )
                        : (
                            <p style={{marginTop : '10px'}}>알람이 없습니다.</p>
                        )}
                </ul>
            </div> 
        </Container>
        : null }
        </>
    )
}

export default Alarmbar


const Container = styled.div`
    background-color: #202c44;
    display: flex;
    flex-direction: column;
    height: 30%;
    max-height: 30vh;
    border-radius: 20px;
    padding: 15px;
    overflow: hidden;

    .header {
        display: flex;
        justify-content: space-between;
        font-size: large;
    }

    .icon {
        margin-right: 5px;
    }

    .list-content {
        margin-top: 10px;
        display: flex;
    }

    .link {
        text-decoration: none;
        color: white;
        cursor: pointer;
    }

    .read {
        width: 0.7rem;
        height: 0.7rem;
        background-color: #6C7383;
        border-radius: 50%;
        margin-right: 5px;
    }

    .unread {
        width: 0.7rem;
        height: 0.7rem;
        background-color: #254EF8;
        border-radius: 50%;
        margin-right: 5px;
    }
`