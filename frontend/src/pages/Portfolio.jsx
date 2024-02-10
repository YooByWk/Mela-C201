//포트폴리오 페이지
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../status/store";
import UserEdit from '../components/UserEdit';
import Selfshorts from '../components/Selfshorts';
import PortfolioPin from '../components/PortfolioPin';
import { othersInfo } from "../API/UserAPI";


function Portfolio() {

    // 내가 들어간 포트폴리오
    const { emailId } = useParams()
    const [ current, setCurrent ] = useState('')
    // 현재 로그인 한 사람
    const { fetchUser, user } = useStore()
    
    useEffect(() => {
        const info = async() => {
            try {
                const userInfo = await fetchUser()
                const otherInfo = await othersInfo(emailId)
                setCurrent(otherInfo)
            } catch (err) {
                console.log(err)
            }
        }
        info()
        }, [emailId])

    // console.log(emailId)
    // console.log(current)

    const userProps = {
        currentUser: current,
        loginUser: user
    }
    return (
        <>
            {user ?
            (<>
            <UserEdit {...userProps}/>
            <Selfshorts />
            <PortfolioPin />
            </>) : null
            }
        </>

    );
}

export default Portfolio;
