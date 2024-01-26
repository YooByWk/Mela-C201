import React from 'react';
import { FaRegUser, FaRegHeart } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineLocalFireDepartment, MdOutlineLogout } from "react-icons/md";


const menus = [
    {
        title: 'Profile',
        icon: <FaRegUser />
    },
    {
        title: 'Message',
        icon: <AiOutlineMessage />
    },
    {
        title: 'Matching',
        icon: <MdOutlineLocalFireDepartment />
    },
    {
        title: 'Favorite',
        icon: <FaRegHeart />
    },
    {
        title: 'Logout',
        icon: <MdOutlineLogout />
    }
]

function Sidebar() {
    return (
        <ul role='list'>
            {menus.map((menu) => (
                <li key={menu.title} className='flex justify-center'>
                    <div className='flex'>
                        <span>
                            {menu.icon}
                        </span>
                    </div>
                    <div className='flex'>
                        <p>
                            {menu.title}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    )
}

// import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

// function Sidebar() {
//   return (
//         <nav aria-label='main sidebar'>
//             <List >
//                 <ListItem>
//                     <ListItemButton>
//                         <FaRegUser/>
//                         <ListItemText primary='Profile'/>
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem>
//                     <ListItemButton>
//                         <AiOutlineMessage />
//                         <ListItemText primary='Message'/>
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem>
//                     <ListItemButton>
//                         <MdOutlineLocalFireDepartment />
//                         <ListItemText primary='Matching'/>
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem>
//                     <ListItemButton>
//                         <FaRegHeart />
//                         <ListItemText primary='Favorite'/>
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem>
//                     <ListItemButton>
//                         <MdOutlineLogout />
//                         <ListItemText primary='Logout'/>
//                     </ListItemButton>
//                 </ListItem>
//             </List>
//         </nav>
//     );
// };

export default Sidebar