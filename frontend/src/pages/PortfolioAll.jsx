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
`

const PinList = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    color: white;
`

const AllList = styled.div`
    display: flex;
    padding: 20px;
    color: white;
`

function PortfolioAll() {

    return (
        <>
            <Hedaer>
                <h1>user 님의 Portfolio</h1>
                <PortfolioAdd />
            </Hedaer>
            
            <PinList>
                <div>
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
                <RiHeadphoneFill />
                <h3>All</h3>
            </AllList>
        </>
    )
}

export default PortfolioAll