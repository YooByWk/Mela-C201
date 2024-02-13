//포트폴리오 페이지
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../status/store";
import UserEdit from '../components/UserEdit';
import Selfshorts from '../components/Selfshorts';
import PortfolioPin from '../components/PortfolioPin';
import { othersInfo } from "../API/UserAPI";
import Alarmbar from '../components/alarm/Alarmbar'
import styled from 'styled-components';
import Feed from '../components/Feed';
// import { isFollow } from "../API/UserAPI";


function Portfolio() {

    // 내가 들어간 포트폴리오
    const { emailId } = useParams()
    const [ currentUser, setCurrentUser ] = useState('')
    const [ currentUserPortfolio, setCurrentUserPortfolio ] = useState('')
    // 현재 로그인 한 사람
    const { fetchUser, user, userPortfolio } = useStore()
    
    useEffect(() => {
        const info = async() => {
            try {
                const userInfo = await fetchUser()
                const otherInfo = await othersInfo(emailId)
                setCurrentUser(otherInfo[0])
                setCurrentUserPortfolio(otherInfo[1])
            } catch (err) {
                console.log(err)
            }
        }
        info()
        }, [emailId])

    const userProps = {
        currentUser: currentUser,
        currentUserPortfolio: currentUserPortfolio,
        loginUser: user,
        loginPortfolio: userPortfolio
    }

    return (
        <>
            {user ?
            (<>
            <Container>
                <div className="main">
                    <UserEdit {...userProps}/>
                    <Selfshorts />
                    <PortfolioPin />
                </div>
                <div className="side">
                    <div className="alarm">
                        <Alarmbar />
                    </div>
                    <div className="feed">
                        <Feed />
                    </div>
                </div>
            </Container>
            </>) : null
            }
        </>

    );
}

export default Portfolio;

const Container = styled.div`
    display: flex;
    color: white;

    .main {
        flex: 2;
    }

    .side {
        flex: 0.8;
        margin: 20px;
        align-items: center;
    }

    .alarm {
        margin-bottom: 3rem;
    }
`