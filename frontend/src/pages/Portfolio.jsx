//포트폴리오 페이지
import React from 'react';
import UserEdit from '../components/UserEdit';
import Selfshorts from '../components/Selfshorts';
import PortfolioList from '../components/PortfolioList';

function Portfolio() {
    return (
        <>
            <UserEdit />
            <Selfshorts />
            <PortfolioList />
        </>
    );
}

export default Portfolio;
