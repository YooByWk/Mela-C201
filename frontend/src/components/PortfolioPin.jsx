import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";

const Container = styled.div`
    padding: 1rem;
    margin: 20px;
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    color: white;
    margin-bottom: 10px;
`

function PortfolioPin() {
    const navigate = useNavigate()

    const goPortfolioAdd = () => {
        navigate('/musics')
    }

    return (
        <>
        <Container>
            <Title>Portfolio</Title>
            <DefaultButton 
                text={'More'}
                backgroundcolor={'#254ef8'}
                fontcolor={'white'}
                width={'6rem'}
                onClick={goPortfolioAdd}
            />
        </Container>
        </>
    )
}

export default PortfolioPin