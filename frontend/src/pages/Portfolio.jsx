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

    const { currentUser, setCurrentUser } = useState()
    // 현재 로그인 한 사람
    const { fetchUser, user } = useStore()
    
    useEffect(() => {
        const getUserInfo = async() => {
            try {
                fetchUser()
                console.log(emailId)
                const currentInfo = await othersInfo({emailId: emailId})
                setCurrentUser(currentInfo)
            } catch (err) {
                console.error(err)
            }
        }; getUserInfo()

    }, [fetchUser])
    
    console.log(user)
    // console.log(currentUser)

    const userProps = {
        currentUserId: currentUser,
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
