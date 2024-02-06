import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components'
import { GoBell } from "react-icons/go"
import DefaultButton from "../DefaultButton"
import { notification } from '../../API/UserAPI'


function Alarmbar () {
    const [data, setData] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const res = await notification()
            setData(res)
            console.log(res)
        }
        fetchData()
    })

    const goDetail = () => {
        navigate('/alarm')
    }


    return (
        <>
        <Container>
            <div className="header">
                <div>
                    <GoBell className="icon"/>
                    <span>Alarm</span>
                </div>
                <DefaultButton 
                    text='+'
                    width='1.5rem'
                    height='0.8rem'
                    backgroundcolor='#202C44'
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
                                        <Link to={`/alarm`} className="link">
                                            {alarm.alarmContent.length < 20
                                                ? alarm.alarmContent
                                                : alarm.alarmContent.slice(0, 15) + '...'}
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
        </>
    )
}

export default Alarmbar


const Container = styled.div`
    background-color: #151C2C;
    display: flex;
    flex-direction: column;
    height: 10rem;
    border-radius: 20px;
    padding: 10px;

    .header {
        display: flex;
        justify-content: space-between;
    }

    .icon {
        margin-right: 5px;
    }

    .list-content {
        margin-top: 10px;
    }

    .link {
        text-decoration: none;
        color: white;
        cursor: pointer;
    }
`