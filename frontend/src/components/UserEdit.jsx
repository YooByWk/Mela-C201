import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../components/DefaultButton';
import styled from 'styled-components';
import { fetchUser } from '../API/UserAPI';

const Container = styled.div`
    padding: 1rem;
    margin: 20px;
    display: flex;
    flex-direction: column;
    background-color: #202c44;
    color: white;
`

const Title = styled.h3`
    margin-bottom: 10px;
`

function UserEdit(props) {
    const [user, setUser] = useState([])

    const navigate = useNavigate()

    const goUpdate = () => {
        navigate('/users')
    }

    useEffect(()=> {
        const getUserInfo = async() => {
            try {
                const res = await fetchUser()
                setUser(res)
            } catch (err) {
                console.error(err)
            }
        }; getUserInfo()
       
    }, [])

    return (
        <Container>
            <Title>{user.nickname}</Title>
            {user && (
                <div>
                    <p>{ user.name }</p>
                    <p>Gender : { user.gender }</p>
                    <p>Birth : { user.birth }</p>
                    <p>Like genre : </p>
                    <p>Position : </p>
                    <p>SNS</p>
                    <p>{user.searchAllow}</p>
                </div>
            )}

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
