import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../components/DefaultButton';
import styled from 'styled-components';
import { fetchUser, followUser } from '../API/UserAPI';

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
    const [values, setValues] = useState([])
    const [isFollowed, setIsFollowed] = useState(false)
    const [currentUser, setCurrentUser] = useState({}) 

    const navigate = useNavigate()

    const goUpdate = () => {
        navigate('/users')
    }

    useEffect(()=> {

        const getUserInfo = async() => {
            try {
                const res = await fetchUser()
                setValues(res)
            } catch (err) {
                console.error(err)
            }
        }; getUserInfo()

        const loadCurrentUser = async() => {     
            try {
                const loginUser = await fetchUser()
                setCurrentUser(loginUser)
            } catch (err) {
                console.error(err)
            }
        }; loadCurrentUser()
    }, [])

    const handleFollow = async() => {
        if (values && currentUser && values.emailId !== currentUser.emailId) {
            try {
                await followUser(values.emailId)
                setIsFollowed(!isFollowed)
            } catch(err) {
                console.error(err)
            }
        }
    }

    return (
        <Container>
            <Title>{values.nickname}</Title>
            {values && currentUser && (
                <div>
                    {currentUser.emailId === values.emailId ? (
                        <>
                            <p>{ values.name }</p>
                            <p>Gender : { values.gender }</p>
                            <p>Birth : { values.birth }</p>
                            <p>Like genre : </p>
                            <p>Position : </p>
                            <p>SNS</p>
                            <p>{values.searchAllow}</p>

                            <DefaultButton 
                                text={'Edit'}
                                backgroundcolor={'#6C7383'}
                                fontcolor={'white'}
                                width={'6rem'}
                                onClick={goUpdate}
                            />
                        </>
                    ) : (
                        <DefaultButton 
                            text={isFollowed ? 'Unfollow' : 'Follow'}
                            backgroundcolor={isFollowed ? '#6C7383' : '#254ef8'}
                            fontcolor={'white'}
                            width={'6rem'}
                            onClick={handleFollow}
                        />
                    )}
                </div>   
            )}   
        </Container>
    )
}

export default UserEdit;
