import React, { useState, useEffect, createContext } from 'react'
import styled from 'styled-components'
import { notification, checkNotification } from '../../API/UserAPI'
import moment from 'moment'

function AlarmAll () {
    const CheckContext = createContext()
    const [data, setData] = useState(null)
    const [checked, setChecked] = useState([])

    const changeHandler = (check, id) => {
        if (check) {
            setChecked([...check, id])
            console.log('체크')
        } else {
            setChecked(checked.filter(button => button != id))
        }
    }

    const isAllChecked = checked.length == 
   
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

    return (
        <>
        <Container>
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
                                                id='check'
                                                checked={checked}
                                                onChange={e => {
                                                    changeHandler(e.currentTarget.checked, 'check')
                                                }}
                                                
                                            />
                                        </div>
                                        {alarm.checked ? <div className='dot-checked'></div>
                                            : <div className='dot-unchecked'></div>
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

    .content {
        font-size: 20px;
        margin-bottom: 20px;
        margin-left: 3rem;
    }

    .content-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .dot-checked {
        border-radius: 100%;
        border: 10px solid #254EF8;
    }
    
    .dot-unchecked {
        border-radius: 100%;
        border: 10px solid #6C7383;
    }
`