import React, { useRef ,useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../components/DefaultButton';
import styled from 'styled-components';
import { fetchUser, followUser } from '../API/UserAPI';
import defaultprofile from '../assets/images/default-profile.png'



function UserEdit(props) {
    const [imgFile, setImgFile] = useState('')  
    const imgRef = useRef()
    const [values, setValues] = useState([])
    const [isFollowed, setIsFollowed] = useState(false)
    const [currentUser, setCurrentUser] = useState(props.currentUser);
    const [loginUser, setLoginUser] = useState(props.loginUser);
    const [loginUserPortfolio, setLoginUserPortfolio] = useState(props.loginPortfolio);
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

    const instagramURL = loginUserPortfolio.instagram
    const youtubeURL = loginUserPortfolio.youtube

    return (
        <>      
        <Container>
            {currentUser[0].userIdx.emailId === loginUser.emailId ? (
                <>
                <div className="main">

                
                <div className="header">
                    <div className="userInfo">
                        <div className="image">
                            <Img 
                                src={imgFile ? imgFile : defaultprofile} 
                                alt="프로필 이미지"
                            />
                        </div>
                        <div className="name">
                            <Title>{loginUser.nickname}</Title>
                            <p>{ loginUser.name }</p>
                        </div>
                    </div>
                    <DefaultButton 
                        text={'Edit'}
                        backgroundcolor={'#6C7383'}
                        fontcolor={'white'}
                        width={'4rem'}
                        height={'2rem'}
                        onClick={goUpdate}
                    />
                </div>
                    <p></p>
                    <input type="file" onChange={profileImg} ref={imgRef}/>
                    <p>Like genre : </p>
                    <p>Position : </p>                       
                    <p>SNS</p>
                    <URL onClick={() => {window.open(instagramURL)}}>인스타그램</URL>
                    <URL onClick={() => {window.open(youtubeURL)}}>유튜브</URL>
                </div>
                </>
            ) : (
                <>
                    <p>{ currentUser[0].userIdx.nickname }</p>
                    <Img 
                        src={imgFile ? imgFile : defaultprofile} 
                        alt="프로필 이미지"
                    />
                    <p>Like genre : </p>
                    <p>Position : </p>
                    <p>SNS</p>
                    <p>instagram : {currentUser[0].instagram }</p>
                    <p>youtube : {currentUser[0].youtube }</p>
                    <DefaultButton 
                        text={isFollowed ? 'Unfollow' : 'Follow'}
                        backgroundcolor={isFollowed ? '#6C7383' : '#254ef8'}
                        fontcolor={'white'}
                        width={'4rem'}
                        height={'2rem'}
                        onClick={handleFollow}
                    />
                </>
            )}
        </Container>
        </>
    )
}

export default UserEdit;

const Container = styled.div`
    flex: 2;
    padding: 1rem;
    margin: 20px;
    display: flex;
    flex-direction: column;
    background-color: #202c44;
    border-radius: 20px;
    color: white;

    .header {
        display: flex;
        justify-content: space-between;
    }

    .image {
        display: flex;
    }

    .userInfo {
        display: flex;
    }

    .name {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`

const Title = styled.h3`
    margin-bottom: 10px;
`

const Img = styled.img`
    height: 5rem;
    width: 5rem;
    border-radius: 10;
`

const URL = styled.div`
    width: fit-content;
`