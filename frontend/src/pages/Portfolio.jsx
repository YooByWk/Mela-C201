//포트폴리오 페이지
import React from 'react';
import UserEdit from '../components/UserEdit';
import Selfshorts from '../components/Selfshorts';
import PortfolioPin from '../components/PortfolioPin';

function Portfolio() {
    return (
        <>
            <UserEdit />
            <Selfshorts />
            <PortfolioPin />
        </>
    );
}

export default Portfolio;
