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
                // console.log(res)
            } catch (err) {
                // console.log(err)
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
                // console.log(notificationIdx)
                refreshNotification()
            })
            .catch(err => {
                // console.log(err)
            })
        })
    }

    // 삭제
    const handleDelete = async () => {
        checkAlarm.forEach(notificationIdx => {
            window.confirm('삭제하시겠습니까?')
            delNotification({ notificationid: notificationIdx })
            .then(() => {
                // console.log(notificationIdx)
                refreshNotification()
            })
            .catch(err => {
                // console.log(err)
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
            // console.log(err)
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
                <div className="actions">
                    <div className='read'>
                        <p onClick={handleRead}>
                            Mark all as read
                        </p>
                    </div>
                </div>
            </div>
            <div className="category">
                <span>체크</span>
                <span>상태</span>
                <span>내용</span>
                <span>날짜</span>
            </div>
        <hr className='line'/>
            <div className='listWrapper'>
                <ul className='content'>
                    {data && data.length > 0? (
                        data.map((alarm) =>{
                            return (
                                <li key={alarm.notificationIdx} className='list'>
                                    <div className='alarm-check'>
                                        <input 
                                            type="checkbox"
                                            checked={checkAlarm.includes(alarm.notificationIdx) ? true : false }
                                            onChange={(e) => handleSingleCheck(e.target.checked, alarm.notificationIdx)}
                                        />
                                    </div>
                                    {alarm.checked ? <div className='text-checked'>읽음</div>
                                        : <div className='text-unchecked'>읽지 않음</div>
                                    }
                                    <div className='alarm-content'>
                                        {alarm.alarmContent}
                                    </div>
                                    <div className='alarm-date'>
                                        {moment(alarm.alarmDate).format('YY-MM-DD HH:mm:ss')}
                                    </div>
                                </li>
                            )
                        }) )
                        : (
                            <p>알람이 없습니다.</p>
                        )
                    }
                </ul>
            </div>
        <br />
        </Container>
        <div className="footer">
            <div className='btnWrapper'>
                <DefaultButton
                    text='Delete'
                    backgroundcolor='#C02525'
                    width='4rem'
                    height='2rem'
                    onClick={() => handleDelete()}
                />
            </div>
        </div>
        </>
    )
}

export default AlarmAll


const Container = styled.div`
    color: white;
    margin: 20px;
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .category {
        display: flex;
        background-color: #1e40c6;
        height: 2rem;
        border-radius: 10px;
        align-items: center;
        margin-bottom: 10px;
        padding: 5px;
        margin-top: 10px;
        flex: 1;
        text-align: center;
    }

    .actions {
        display: flex;
        gap: 20px;
    }

    .list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #254EF8;
        text-align: center;
        margin-bottom: 10px;
    }

    .list:last-child {
        border-bottom: none;
    }

    .category span:nth-child(1), .list div:nth-child(1) { flex: 0.5; }
    .category span:nth-child(2), .list div:nth-child(2) { flex: 1; }
    .category span:nth-child(3), .list div:nth-child(3) { flex: 3; }
    .category span:nth-child(4), .list div:nth-child(4) { flex: 1; }

    .read {
        color: #254EF8;
        cursor: pointer;
    }

    .btnWrapper {
        margin-left: 3rem;
    }

    .listWrapper {

    }

    .content {
        flex: 1;
        overflow-y: auto;
    }

    .alarm-content {
        font-size: 18px;
        margin-bottom: 10px;
        margin-left: 3rem;
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

    .footer {
        display: flex;
    }
`