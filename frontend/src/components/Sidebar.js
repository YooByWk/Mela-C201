import React, { useState, Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";

import { FaRegUser, FaRegHeart } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineLocalFireDepartment, MdOutlineLogout } from "react-icons/md";
import styled from "styled-components";
import useStore from "../status/store";
import {isLogined} from "../status/store";
import { follower, followerList } from "../API/UserAPI";
import { followee, followingList } from "../API/UserAPI";
import { fetchUser } from "../API/UserAPI";
import { getImg } from "../API/FileAPI";
import defaultprofile from '../assets/images/default-profile.png'
import { getShorts } from "../API/ShortsAPI";

const SideContainer = styled.div`
  color: white;
  padding-top: ${props => props.$paddingtop || '0'};
  margin-left:30px;
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 12vw;
  .items {
    margin-top: 30px;
    margin-left: 1rem;
    margin-bottom: 30px;
    display: flex;
  }
  .contents {
  }
  .wd {
    margin-left: 10%;
    font-size: large;
  }
  .img-wrapper{
    display: flex;
    flex-direction: row;
  }
  .name-follow{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 7px;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 7.5%;
`;

const Img = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    /* margin-left: 3rem; */
`;

const H3 = styled.h3`
font-weight:bold;
margin-bottom:5px;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`

const P = styled.p`
color: grey;
padding-top: 5%;
`


function Sidebar({ className, paddingtop }) {
  const { logout } = useStore()
  const [userValues, setUserValues] = useState({})
  const [portfolioValues, setPortfolioValues] = useState({})
  // const isLogined = useStore(state => state.isLogined)
  // const [userData, setUserData] = useState({})
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const [imageURL, setImageURL] = useState()
  const [shortsIdx, setShortsIdx] = useState('')

  useEffect(() => {
    if (!localStorage.accessToken) {
      return
    }
    const userInfo = async () => {
      try {
        const res = await fetchUser()
        setUserValues(res[0])
        setPortfolioValues(res[1])
        const shorts = await getShorts()
        setShortsIdx(shorts.shortsIdx)
      } catch (err) {
        console.log(err)
      } 
    }; userInfo()
  }, [])
  
  useEffect(() => {
      const imageInfo = async() => {     
          try {
            if (portfolioValues.portfolio_picture_file_idx) {
              const response = await getImg(portfolioValues.portfolio_picture_file_idx.fileIdx)
              setImageURL(response.message)
            } else{
                setImageURL(defaultprofile)
              }
          } catch (err) {
              console.error(err)
          }
      }
      imageInfo()
  
    const follow = async () => {
      if (userValues.emailId) {
      try {
      const getFollower = await follower(userValues.emailId)
      setFollowers(getFollower)
      const getFollowing = await followee(userValues.emailId)
      setFollowings(getFollowing)
      } catch (err) {
        console.log(err)
      }
    }
    }
    follow()
  },[userValues, portfolioValues])

  // const followList = async () => {
  //   try {
  //     await followerList(userValues.emailId)
  //   }
  // }
  // console.log(followers)
  // console.log(followings)

  return (
    // <DIV>
      <SideContainer className="contents" $paddingtop={paddingtop}>
        {userValues ? (
          <>
          <div className="img-wrapper">
            <Img 
            src={imageURL} 
            alt="프로필 이미지"
            />
            <div className="name-follow">
              <H3> {userValues.nickname} </H3>
              <P>팔로워 {followers.length} </P> 
              <P>팔로잉 {followings.length}</P>
            </div>
          </div>
          <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4">
            <List>
              <ListItem className="items">
                <ListItemPrefix>
                  <FaRegUser />
                </ListItemPrefix>
              <CustomLink to={`/portfolio/${userValues.emailId}`}>
                <span className="wd">Profile</span>
              </CustomLink>
              </ListItem>
              <ListItem className="items">
                <ListItemPrefix>
                  <AiOutlineMessage />
                </ListItemPrefix>
                <CustomLink to='/message'>
                  <span className="wd">Message</span>
                </CustomLink>
              </ListItem>
              <ListItem className="items">
                <ListItemPrefix>
                  <MdOutlineLocalFireDepartment />
                </ListItemPrefix>
                <CustomLink to={`/matching`}>
                <span className="wd">Matching</span>
                </CustomLink>
              </ListItem>
              <ListItem className="items">
                <ListItemPrefix>
                  <MdOutlineLogout />
                </ListItemPrefix>
                <span className="wd" onClick={logout}>Logout</span>
              </ListItem>
            </List>
          </Card>
          </>
        ) : <p>유저정보가 없습니다.</p>}
      </SideContainer>
    //  </DIV>
  );
}

export default Sidebar
