import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height : 50px;
    width: ${(props) => props.width};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.fontColor};
    background: ${(props) => props.backgroundColor};
    border-radius: 30px;

    &:hover{
        filter: brightness(90%);
    }
`

const Text = styled.span`
    
`

const defaultButton = (props) => {
    return (
        <Container
            backgroundColor={props.backgroundColor}
            fontColor={props.fontColor}
            width={props.width}
        >
            <Text>
                {props.text}
            </Text>
        </Container>
    )
}

defaultButton.props={
    text: 'default',
    backgroundColor: '#254ef8',
    fontColor: 'white',
    width: '1rem',
}

export default defaultButton
