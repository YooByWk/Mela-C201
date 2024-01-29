import React from "react";
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

function Selfshorts() {
    return (
        <>
        <Container>
            <Title>Self-shorts</Title>
            <DefaultButton 
                text={'Add'}
                backgroundcolor={'#254ef8'}
                fontcolor={'white'}
                width={'8rem'}
            />
        </Container>
        </>
    )
}

export default Selfshorts