import React, { useState, Fragment } from 'react';
import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react';

import { FaRegUser, FaRegHeart } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineLocalFireDepartment, MdOutlineLogout } from "react-icons/md";
import styled from 'styled-components';

const SideContainer = styled.div`
  /* width: 10%;
  max-width: 110px;
  text-align: center;
  height: 100%; */
  .items {
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

function Sidebar({className}) {

    return (
        <div className={className}>
            <SideContainer>
                <Card className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4'>
                    <List>
                        <ListItem className='items'>
                            <ListItemPrefix>
                                <FaRegUser />
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                        <ListItem className='items'>
                            <ListItemPrefix>
                                <AiOutlineMessage />
                            </ListItemPrefix>
                            Message
                        </ListItem>
                        <ListItem className='items'>
                            <ListItemPrefix>
                                <MdOutlineLocalFireDepartment />
                            </ListItemPrefix>
                            Matching
                        </ListItem>
                        <ListItem className='items'>
                            <ListItemPrefix>
                                <FaRegHeart />
                            </ListItemPrefix>
                            Favorite
                        </ListItem>
                        <ListItem className='items'>
                            <ListItemPrefix>
                                <MdOutlineLogout />
                            </ListItemPrefix>
                            Logout
                        </ListItem>
                    </List>
                </Card>
            </SideContainer>
        </div>

    )
}

export default Sidebar