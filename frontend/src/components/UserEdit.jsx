import React from "react";
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../components/DefaultButton';
import styled from 'styled-components';

const Container = styled.div`
    padding: 1rem;
    margin: 20px;
    display: flex;
    flex-direction: column;
    background-color: #202c44;
`

const Title = styled.h3`
    color: white;
    margin-bottom: 10px;
`

function UserEdit(props) {
    const navigate = useNavigate()

    const goUpdate = () => {
        navigate('/users')
    }

    return (
        <Container>
            <Title>유저정보</Title>

            <DefaultButton 
                text={'Edit'}
                backgroundcolor={'#6C7383'}
                fontcolor={'white'}
                width={'6rem'}
                onClick={goUpdate}
            />

        </Container>
    );
}
    
export default UserEdit;
