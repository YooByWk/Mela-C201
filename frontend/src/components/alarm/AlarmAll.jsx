import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { notification, checkNotification, delNotification } from '../../API/UserAPI'
import moment from 'moment'
import DefaultButton from '../DefaultButton'

function AlarmAll () {
    const [data, setData] = useState(null)
    const [checkAlarm, setCheckAlarm] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await notification()
                setData(res)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    // 단일 선택
    const handleSingleCheck = (checked, notificationIdx) => {
        if (checked) {
            setCheckAlarm(prev => [...prev, notificationIdx])
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열
            setCheckAlarm(checkAlarm.filter((el) => el !== notificationIdx))
        }
    }

    // 전체 선택
    const handleAllCheck = (checked) => {
        if (checked) {
            const idArray = []
            data.forEach((el) => idArray.push(el.notificationIdx))
            setCheckAlarm(idArray)
        } else {
            // 해제 시 빈 배열로 업데이트
            setCheckAlarm([])
        }
    }

    // 읽기 체크
    const handleRead = async () => {
        checkAlarm.forEach(notificationIdx => {
            checkNotification({ notificationid: notificationIdx })
            .then(() => {
                console.log(notificationIdx)
                refreshNotification()
            })
            .catch(err => {
                console.log(err)
            })
        })
    }

    // 삭제
    const handleDelete = async () => {
        checkAlarm.forEach(notificationIdx => {
            delNotification({ notificationid: notificationIdx })
            .then(() => {
                console.log(notificationIdx)
                refreshNotification()
            })
            .catch(err => {
                console.log(err)
            })
        })
    }

    // 새로고침
    const refreshNotification = async () => {
        try {
            const res = await notification()
            setData(res)
            setCheckAlarm([])
        } catch (err) {
            console.log(err)
        }
    }
  

    return (
        <>
        <Container>
            <div className='header'>
                <div className='all-check'>
                    <input type="checkbox"
                        onChange={(e) => handleAllCheck(e.target.checked)}
                        checked={data && checkAlarm.length === data.length ? true : false }
                    />
                    <span>전체 선택</span>
                </div>
                <div className="right">
                    <div className='btnWrapper'>
                        <DefaultButton
                            text='Delete'
                            backgroundcolor='#C02525'
                            width='4rem'
                            height='2rem'
                            onClick={() => handleDelete()}
                        />
                    </div>
                    <div className='read'>
                        <p onClick={handleRead}>
                            Mark all as read
                        </p>
                    </div>
                </div>
            </div>
        <hr className='line'/>
            <div>
                <ul>
                    {data && data.length > 0? (
                        data.map((alarm) =>{
                            return (
                                <li key={alarm.notificationIdx}>
                                    <div className='content-box'>
                                        <div>
                                            <input 
                                                type="checkbox"
                                                checked={checkAlarm.includes(alarm.notificationIdx) ? true : false }
                                                onChange={(e) => handleSingleCheck(e.target.checked, alarm.notificationIdx)}
                                            />
                                        </div>
                                        {alarm.checked ? <div className='text-checked'>읽음</div>
                                            : <div className='text-unchecked'>읽지 않음</div>
                                        }
                                        <div className='content'>
                                            {alarm.alarmContent}
                                        </div>
                                        <div className='date'>
                                            {moment(alarm.alarmDate).format('YYYY-MM-DD HH:mm:ss')}
                                        </div>
                                    </div>
                                    <hr />
                                </li>
                            )
                        }) )
                        : (
                            <p>알람이 없습니다.</p>
                        )
                    }
                </ul>
            </div>
        </Container>
        </>
    )
}

export default AlarmAll


const Container = styled.div`
    color: white;
    margin: 20px;

    .header {
        display: flex;
        justify-content: space-between;
    }

    .right {
        display: flex;
        flex-direction: column;
    }

    .read {
        color: #254EF8;
        cursor: pointer;
    }

    .btnWrapper {
        margin-left: 3rem;
    }

    .content {
        font-size: 18px;
        margin-bottom: 10px;
        margin-left: 3rem;
    }

    .content-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .text-checked {
        color:#6C7383;
        font-size: large;
    }
    
    .text-unchecked {
        color:#254EF8;
        font-size: large;
    }

    .line {
        border: 1px solid #254EF8;
        margin-bottom: 1rem;
    }
`