import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../components/DefaultButton";
import styled from "styled-components";
import { fetchUser, followUser } from "../API/UserAPI";
import defaultprofile from "../assets/images/default-profile.png";
import { getImg } from "../API/FileAPI";
import { isFollow } from "../API/UserAPI";
import instagram from "../assets/images/instagram.png";
import youtube from "../assets/images/youtube.png";

function UserEdit(props) {
    const [isFollowed, setIsFollowed] = useState('')
    const [currentUser, setCurrentUser] = useState('');
    const [currentUserPortfolio, setCurrentUserPortfolio] = useState('');
    const [currentUserPosition, setCurrentUserPosition] = useState([])
    const [currentUserGenre, setCurrentUserGenre] = useState([])
    const [loginUser, setLoginUser] = useState('');
    const [loginUserPortfolio, setLoginUserPortfolio] = useState('');
    const [imgURL, setImgURL] = useState('')
    // const currentUser = props.currentUser
    // const loginUser = props.loginUser

  const navigate = useNavigate();

    const goUpdate = () => {
        navigate('/users')
    }

        // 장르 // 
        const genres = [
            "Pop",
            "Rock",
            "Hiphop",
            "Classic",
            "Jazz",
            "R&B",
            "Disco",
            "Electrionic",
            "Balad",
            "Country",
            "Reggae",
            "Folk",
            "Etc",
          ];
    
        // 포지션 //
        const positions = ["보컬", "작곡", "작사", "세션", "믹싱", "기타"];

    useEffect(() => {
        setCurrentUser(props.currentUser);
        setCurrentUserPortfolio(props.currentUserPortfolio)
        setCurrentUserPosition(props.CurrentUserPosition)
        setCurrentUserGenre(props.currentUserGenre)
        setLoginUser(props.loginUser);
        setLoginUserPortfolio(props.loginPortfolio)
    }, [props.currentUser, props.loginUser]);

  useEffect(() => {
    const imgInfo = async () => {
      try {
        if (currentUserPortfolio.portfolio_picture_file_idx) {
          const response = await getImg(
            currentUserPortfolio.portfolio_picture_file_idx.fileIdx
          );
          // console.log(response)
          setImgURL(response.message);
        } else {
          setImgURL(defaultprofile);
        }
      } catch (err) {
        console.error(err);
      }
    };

    imgInfo();
    const followInfo = async () => {
      try {
        const response = await isFollow(currentUser.emailId);
        setIsFollowed(response);
      } catch (err) {
        // console.log(currentUser)
        // console.log(err)
      }
    };

        followInfo()
    },[currentUser, currentUserPortfolio])
    // console.log(currentUser)
    // console.log(currentUserPortfolio)
    // console.log(loginUser)
    // console.log(loginUserPortfolio)

  const handleFollow = async () => {
    if (loginUser && currentUser && loginUser.emailId !== currentUser.emailId) {
      try {
        await followUser(currentUser.emailId);
        setIsFollowed(!isFollowed);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!loginUser || !currentUser || !currentUser.userIdx) {
    return (
      <div>
        <p>로딩 중...</p>
        <button
          onClick={() => console.log(currentUser.emailId === loginUser.emailId)}
        >
          51243
        </button>
        <button onClick={() => console.log(currentUser)}>1243</button>
        <button onClick={() => console.log(loginUser)}>lgue</button>
        <button onClick={() => console.log(loginUser.emailId)}>lgue</button>
        <button onClick={() => console.log(currentUser.emailId)}>123</button>
      </div>
    );
  }

  const instagramURL = currentUserPortfolio.instagram;
  const youtubeURL = currentUserPortfolio.youtube;

  const getImgURL = async () => {
    const response = await getImg(
      currentUserPortfolio.portfolio_picture_file_idx
    );
    console.log(response);
    setImgURL(response.data);
  };

  return (
    <>
      <Container>
        {currentUser.emailId === loginUser.emailId ? (
          <>
            <div className="main">
              <div className="header">
                <div className="userInfo">
                  <div className="image">
                    <Img
                      src={imgURL ? imgURL : defaultprofile}
                      alt="프로필 이미지"
                    />
                  </div>
                  <div className="name">
                    <Title>{loginUser.nickname}</Title>
                    <p style={{ marginBottom: "10px" }}>{loginUser.name}</p>
                    <p>{loginUserPortfolio.selfIntro}</p>
                  </div>
                </div>
                <DefaultButton
                  text={"Edit"}
                  backgroundcolor={"#6C7383"}
                  fontcolor={"white"}
                  width={"4rem"}
                  height={"2rem"}
                  onClick={goUpdate}
                />
              </div>
              <div>
                <div className="genre">
                  <p>Like genre : </p>
                </div>
                    <p>Like genre : </p>
                    <p>Position : </p>                       
                    <p>SNS</p>
                    <URL onClick={() => {window.open(instagramURL)}} src={instagram} alt="인스타그램" />
                    <URL onClick={() => {window.open(youtubeURL)}} src={youtube} alt="유튜브" />
                </div>
                </>
            ) : (
                <>
                    <p>{ currentUser.nickname }</p>
                    <Img 
                        src={
                        currentUserPortfolio.portfolio_picture_file_idx ? 
                        currentUserPortfolio.portfolio_picture_file_idx : 
                        defaultprofile} 
                        alt="프로필 이미지"
                    />
                    <p>Like genre : </p>
                    <p>Position : </p>
                    <p>SNS
                    <URL onClick={() => {window.open(instagramURL)}} src={instagram} alt="인스타그램" />
                    <URL onClick={() => {window.open(youtubeURL)}} src={youtube} alt="유튜브" />
                    </p>
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
    justify-content: center;
    margin-left: 10px;
  }

  .genre {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .sns {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
  }
`;

const Title = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Img = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  border: 2px solid white;
`;

const URL = styled.img`
  width: 23px;
  height: 23px;
  padding-right: 2%;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
`;
