import React, { useState, Fragment } from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";

import { FaRegUser, FaRegHeart } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineLocalFireDepartment, MdOutlineLogout } from "react-icons/md";
import styled from "styled-components";

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

function Sidebar({ className, paddingtop }) {
  return (
    <div className={className}>
      <SideContainer className="contents" $paddingtop={paddingtop}>
        <p>
            프로필 사진 들어갈 자리
        </p>
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4">
          <List>
            <ListItem className="items">
              <ListItemPrefix>
                <FaRegUser />
              </ListItemPrefix>
              <span className="wd">Profile</span>
            </ListItem>
            <ListItem className="items">
              <ListItemPrefix>
                <AiOutlineMessage />
              </ListItemPrefix>
              <span className="wd">Message</span>
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
              <span className="wd">Logout</span>
            </ListItem>
          </List>
        </Card>
      </SideContainer>
    </div>
  );
}

export default Sidebar;
