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

    const currentUser = props.currentUser
    const loginUser = props.loginUser

    console.log(loginUser)
    console.log(currentUser)

    const navigate = useNavigate()

    const goUpdate = () => {
        navigate('/users')
    }

    const handleFollow = async() => {
        // 만약 현재 로그인 한 사용자의 이메일 아이디와 주소창의 닉네임이 다르다면
        if (loginUser && currentUser && loginUser[0].emailId !== currentUser.userIdx.emailId) {
            try {
                await followUser(loginUser[0].emailId)
                setIsFollowed(!isFollowed)
            } catch(err) {
                console.error(err)
            }
        }
    }

    return (
        <Container>
            <Title>{loginUser.nickname}</Title>
            {loginUser && currentUser && (
                <div>
                    {currentUser.userIdx.emailId === loginUser[0].emailId ? (
                        <>
                            <p>{ loginUser[0].nickname }</p>
                            <p>Gender : { loginUser[0].gender }</p>
                            <p>Birth : { loginUser[0].birth }</p>
                            <p>Like genre : </p>
                            <p>Position : </p>
                            <p>SNS</p>
                            <p>instagram : { loginUser[1].instagram }</p>
                            <p>youtube : {loginUser[1].youtube }</p>
                            {/* <p>{loginUser.searchAllow}</p> */}

                            <DefaultButton 
                                text={'Edit'}
                                backgroundcolor={'#6C7383'}
                                fontcolor={'white'}
                                width={'6rem'}
                                onClick={goUpdate}
                            />
                        </>
                    ) : (
                            <>
                                <p>{ currentUser.userIdx.nickname }</p>
                                <p>Gender : { currentUser.userIdx.gender }</p>
                                <p>Birth : { currentUser.userIdx.birth }</p>
                                <p>Like genre : </p>
                                <p>Position : </p>
                                <p>SNS</p>
                                <p>instagram : {currentUser.instagram }</p>
                                <p>youtube : {currentUser.youtube }</p>
                                {/* <p>{currentUser.searchAllow}</p> */}

                                <DefaultButton 
                                text={isFollowed ? 'Unfollow' : 'Follow'}
                                backgroundcolor={isFollowed ? '#6C7383' : '#254ef8'}
                                fontcolor={'white'}
                                width={'6rem'}
                                onClick={handleFollow}
                                />
                    </>
                    )}
                </div>   
            )}   
        </Container>
    )
}

export default UserEdit;
