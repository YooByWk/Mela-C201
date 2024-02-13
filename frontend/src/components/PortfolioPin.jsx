import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";
import { useParams } from "react-router-dom";

function PortfolioPin() {
    const navigate = useNavigate()
    const emailIdInfo = useParams()
    // console.log(emailIdInfo.emailId)
    const goPortfolioAdd = () => {
        navigate(`/${emailIdInfo.emailId}/musics`)
    }

    return (
        <>
        <Container>
            <div className="header">
                <Title>Portfolio</Title>
                <DefaultButton 
                    text={'More'}
                    backgroundcolor={'#254ef8'}
                    fontcolor={'white'}
                    width={'4rem'}
                    height={'2rem'}
                    onClick={goPortfolioAdd}
                />
            </div>
        </Container>
        </>
    )
}

export default PortfolioPin

const Container = styled.div`
    padding: 1rem;
    margin: 20px;
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

const Title = styled.h3`
    color: white;
    margin-bottom: 10px;
`