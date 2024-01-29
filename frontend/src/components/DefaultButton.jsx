import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height : 50px;
    width: ${(props) => props.width};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.fontcolor};
    background: ${(props) => props.backgroundcolor};
    border-radius: 30px;
    cursor: pointer;

    &:hover{
        filter: brightness(90%);
    }
`

const Text = styled.span`
    
`

const DefaultButton = (props) => {
    return (
        <>
        <Container
            backgroundcolor={props.backgroundcolor}
            fontcolor={props.fontcolor}
            width={props.width}
            onClick={props.onClick}
        >
            <Text>
                {props.text}
            </Text>
        </Container>
        </>
    )
}

DefaultButton.defaultProps={
    text: 'default',
    backgroundcolor: '#254ef8',
    fontcolor: 'white',
    width: '1rem',
    onClick: () => {}
}

export default DefaultButton
