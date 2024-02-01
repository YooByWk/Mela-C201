import React from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    color: white;
    border-radius: 10px;
    cursor: pointer;

    &:hover{
        background: #202C44;
    }
`

const Username = styled.span`
    font-weight: bold;
    margin-bottom: 10px;
`

function DefaultInbox(props) {
    const [isHovered, setIsHovered] = React.useState(false)
    
    return (
        <>
            <Container
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
                <Username>
                    <p>username</p>
                </Username>
                <p>타임스탬프</p>
                {isHovered ?
                    <FaTrash /> : ''
                }
            </Container>
        </>
    )
}


DefaultInbox.defaultProps={
    text: 'default',
    onClick: () => {}
}

export default DefaultInbox