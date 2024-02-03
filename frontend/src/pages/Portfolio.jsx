//포트폴리오 페이지
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../status/store";
import UserEdit from '../components/UserEdit';
import Selfshorts from '../components/Selfshorts';
import PortfolioPin from '../components/PortfolioPin';

function Portfolio() {

    // 내가 들어간 포트폴리오
    const { nickname } = useParams()
    // 현재 로그인 한 사람
    const { fetchUser, user } = useStore()
    
    useEffect(() => {
        fetchUser()
    }, [fetchUser])
    
    const userProps = {
        currentUser: nickname,
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
