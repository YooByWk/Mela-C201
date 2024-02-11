import React, { useState } from "react";
import styled from "styled-components";
import DefaultButton from "../components/DefaultButton";
import PortfolioAdd from "../components/PortfolioAdd";
import { TiPin } from "react-icons/ti";
import { RiHeadphoneFill } from "react-icons/ri";

const Hedaer = styled.div`
    display: flex;
    justify-content: center;
    color: white;

    .btn-wrapper {
        margin-left: 1rem;
    }
`

const PinList = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    color: white;

    .title {
        display: flex;
    }
`

const AllList = styled.div`
    display: flex;
    padding: 20px;
    color: white;

    .title {
        display: flex;
    }
`

function PortfolioAll() {

    return (
        <>
            <Hedaer>
                <h1>user 님의 Portfolio</h1>
                <div className="btn-wrapper">
                    <PortfolioAdd />
                </div>
            </Hedaer>
            
            <PinList>
                <div className="title">
                    <TiPin />
                    <h3>Pin</h3>
                </div>
                <DefaultButton 
                    text={'Edit'}
                    backgroundcolor={'#6C7383'}
                    fontcolor={'white'}
                    width={'100px'}
                />
            </PinList>
            <hr />
            <AllList>
                <div className="title">
                    <RiHeadphoneFill />
                    <h3>All</h3>
                </div>
            </AllList>
        </>
    )
}

export default PortfolioAll