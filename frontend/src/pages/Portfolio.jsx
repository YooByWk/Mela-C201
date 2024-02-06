//포트폴리오 페이지
import React from 'react';
import { useParams } from 'react-router-dom';
import UserEdit from '../components/UserEdit';
import Selfshorts from '../components/Selfshorts';
import PortfolioPin from '../components/PortfolioPin';

function Portfolio() {
    let { nickname } = useParams()

    return (
        <>
            <UserEdit nickname={nickname}/>
            <Selfshorts />
            <PortfolioPin />
        </>
    );
}

export default Portfolio;
