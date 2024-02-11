import React, { useRef ,useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../components/DefaultButton';
import styled from 'styled-components';
import { fetchUser, followUser } from '../API/UserAPI';
import defaultimage from '../assets/images/default-image.png'

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

const Img = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 10;
`

function UserEdit(props) {
    const [imgFile, setImgFile] = useState('')  
    const imgRef = useRef()
    const [values, setValues] = useState([])
    const [isFollowed, setIsFollowed] = useState(false)
    const [currentUser, setCurrentUser] = useState(props.currentUser);
    const [loginUser, setLoginUser] = useState(props.loginUser);
    // const currentUser = props.currentUser
    // const loginUser = props.loginUser

    const navigate = useNavigate()

    const goUpdate = () => {
        navigate('/users')
    }

    useEffect(() => {
        setCurrentUser(props.currentUser);
        setLoginUser(props.loginUser);
    }, [props.currentUser, props.loginUser]);


    const profileImg = () => {
        const file = imgRef.current.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImgFile(reader.result)
        }
    }

    const handleFollow = async() => {
        if (loginUser && currentUser && currentUser.userIdx && loginUser[0].emailId !== currentUser.userIdx.emailId) {
            try {
                await followUser(currentUser.userIdx.emailId)
                setIsFollowed(!isFollowed)
            } catch(err) {
                console.error(err)
            }
        }
    }

    if (!loginUser || !currentUser || !currentUser[0].userIdx) {
        return <div>
        
            <p>로딩 중...</p>
            <button onClick={ ()=> console.log(currentUser[0].userIdx.emailId === loginUser.emailId )}>51243</button>
            <button onClick={ ()=> console.log(currentUser)}>1243</button>
            <button onClick={ ()=> console.log(loginUser)}>lgue</button>
            <button onClick={ ()=> console.log(loginUser.emailId)}>lgue</button>
            <button onClick={ ()=> console.log(currentUser[0].userIdx.emailId)}>123</button>
        </div>
    }

    return (
        <Container>
            <Title>{loginUser.nickname}</Title>
            <div>
                {currentUser[0].userIdx.emailId === loginUser.emailId ? (
                    <>
                        <p>{ loginUser.nickname }</p>
                        <Img 
                            src={imgFile ? imgFile : defaultimage} 
                            alt="프로필 이미지"
                        />
                        <input type="file" onChange={profileImg} ref={imgRef}/>
                        <p>Gender : { loginUser.gender }</p>
                        <p>Birth : { loginUser.birth }</p>
                        <p>Like genre : </p>
                        <p>Position : </p>                        {/* 주석처리 부분 정보 누락으로, 수정 요망 */}
                        {/* <p>instagram : { loginUser[1].instagram }</p> */}
                        {/* <p>youtube : {loginUser[1].youtube }</p> */}
                        <p>SNS</p>

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
                        <p>{ currentUser[0].userIdx.nickname }</p>
                        <Img 
                            src={imgFile ? imgFile : defaultimage} 
                            alt="프로필 이미지"
                        />
                        <p>Gender : { currentUser[0].userIdx.gender }</p>
                        <p>Birth : { currentUser[0].userIdx.birth }</p>
                        <p>Like genre : </p>
                        <p>Position : </p>
                        <p>SNS</p>
                        <p>instagram : {currentUser[0].instagram }</p>
                        <p>youtube : {currentUser[0].youtube }</p>
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
        </Container>
    )
}

export default UserEdit;
