import React from 'react';

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FaRegUser, FaRegHeart } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineLocalFireDepartment, MdOutlineLogout } from "react-icons/md";


function Sidebar() {
  return (
        <nav aria-label='main sidebar'>
            <List>
                <ListItem>
                    <ListItemButton>
                        <FaRegUser/>
                        <ListItemText primary='Profile'/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <AiOutlineMessage />
                        <ListItemText primary='Message'/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <MdOutlineLocalFireDepartment />
                        <ListItemText primary='Matching'/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <FaRegHeart />
                        <ListItemText primary='Favorite'/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <MdOutlineLogout />
                        <ListItemText primary='Logout'/>
                    </ListItemButton>
                </ListItem>
            </List>
        </nav>
    );
};

export default Sidebar