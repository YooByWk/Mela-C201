import React, { useState, Fragment } from 'react';
import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react';

import { FaRegUser, FaRegHeart } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineLocalFireDepartment, MdOutlineLogout } from "react-icons/md";

function Sidebar() {

    return (
        <Card className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4'>
            <List>
                <ListItem>
                    <ListItemPrefix>
                        <FaRegUser />
                    </ListItemPrefix>
                    Profile
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <AiOutlineMessage />
                    </ListItemPrefix>
                    Message
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <MdOutlineLocalFireDepartment />
                    </ListItemPrefix>
                    Matching
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <FaRegHeart />
                    </ListItemPrefix>
                    Favorite
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <MdOutlineLogout />
                    </ListItemPrefix>
                    Logout
                </ListItem>
            </List>
        </Card>
    )
}

export default Sidebar