import React from "react";
import styled from "styled-components";
import ShortsUploadModal from "./Modals/ShortsUpload";

function Selfshorts(props) {
    return (
        <>
        <Container>
            <div className="header">
                <Title>Self-shorts</Title>
                {props.loginUser.emailId === props.currentUser.emailId ? (
                <ShortsUploadModal />
                ) : (
                    <>
                    </>
                )}
            </div>
        </Container>
        </>
    )
}

export default Selfshorts


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