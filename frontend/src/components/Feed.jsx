import React from "react";
import styled from "styled-components";


function Feed() {


    return (
        <>
        <Header>
            <h3>Following Activity</h3>
        </Header>
        <Container>
        </Container>
        </>
    )
}

export default Feed

const Header = styled.div`
    margin-bottom: 0.8rem;
    font-size: large;
    margin-left: 0.3rem;
`

const Container = styled.div`
    background-color: #202c44;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    padding: 15px;
`