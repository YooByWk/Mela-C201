import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";

import { FaRegUser, FaRegHeart } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineLocalFireDepartment, MdOutlineLogout } from "react-icons/md";
import styled from "styled-components";
import { fetchUser, follower, followee } from "../API/UserAPI";
import useStore from "../status/store";

const SideContainer = styled.div`
  /* width: 10%;
  max-width: 110px;
  text-align: center;
  height: 100%; */
  /* background-color: #202C44; */
  /* padding:10 px; */
  /* height: auto;
  padding: 0.5rem;
  border-radius: 20px; */
  color: white;
  padding-top: ${props => props.$paddingtop || '0'};
  .items {
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
  }
  .contents {
  }
  .wd {
    margin-left: 10%;
    font-size: large;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`

function Sidebar({ className, paddingtop }) {
  const [currentUser, setCurrentUser] = useState([])

  const logout = useStore(state => state.logout)

  // useEffect(() => {
  //   const loadCurrentUser = async() => {     
  //     try {
  //         const loginUser = await fetchUser()
  //         setCurrentUser(loginUser)
  //         console.log(currentUser.nickname)
  //     } catch (err) {
  //         console.error(err)
  //     }
  //   }; loadCurrentUser()

  //   const getFollowList = async() => {
  //     try {
  //       const followerList = await follower()
  //       setFollowerList(followerList)
  //       console.log(followeeList)

  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }; getFollowList()
  // }, [])


  return (
    <div className={className}>
      <SideContainer className="contents" $paddingtop={paddingtop}>
        <h3>{currentUser && currentUser.nickname}</h3>

        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4">
          <List>
            <ListItem className="items">
              <ListItemPrefix>
                <FaRegUser />
              </ListItemPrefix>
            <CustomLink to='/portfolio'>
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
              <span className="wd">Matching</span>
            </ListItem>
            <ListItem className="items">
              <ListItemPrefix>
                <FaRegHeart />
              </ListItemPrefix>
              <span className="wd">Favorite</span>
            </ListItem>
            <ListItem className="items">
              <ListItemPrefix>
                <MdOutlineLogout />
              </ListItemPrefix>
              <span className="wd" onClick={logout()}>Logout</span>
            </ListItem>
          </List>
        </Card>
      </SideContainer>
    </div>
  );
}

export default Sidebar
