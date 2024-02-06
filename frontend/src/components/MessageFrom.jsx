import React from "react";
import styled from "styled-components";
import InputMessage from './InputMessage';

const Container = styled.div`
    display: flex;
    padding: 2rem;
`

const Header = styled.div`
    display: flex;
`

const Title = styled.span`
    font-weight: bold;
    margin-right: 20px;
`

const Username = styled.p`
    color: #757575;
`

const Footer = styled.div`
    display: flex;
    background-color: #151C2C;
`

function MessageFrom() {
    return (
        <>
        <Container>
            <Header>
                <Title>Message from</Title>
                <Username>보낸 사람 이름</Username>
            </Header>
        </Container>
        <Footer>
            <InputMessage />
        </Footer>
        </>
    )
}

export default MessageFrom