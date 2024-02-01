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

  const [currentUser, setCurrentUser] = useState(null)
  const { fetchUser, user, logout} = useStore()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])
  // const handleLogout = () => {
  //   logout()
  //   .then((res) => {
  //     localStorage.removeItem('accessToken')
  //     console.log(res)
  //     window.location.href = '/'
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  return (
    <div className={className}>
      <SideContainer className="contents" $paddingtop={paddingtop}>
        {user && <h3> {user.nickname} </h3>}

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
              <span className="wd" onClick={logout}>Logout</span>
            </ListItem>
          </List>
        </Card>
      </SideContainer>
    </div>
  );
}

export default Sidebar
