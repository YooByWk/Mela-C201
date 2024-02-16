import React from "react";
import { Link } from 'react-router-dom';
import DefaultButton from '../components/DefaultButton';


function UserEdit(props) {

    return (
        <div className="header">
            <Link to={'/users'} style={{ textDecoration: 'none'}}>
                <DefaultButton 
                    text={'Edit'}
                    backgroundColor={'#6C7383'}
                    fontColor={'white'}
                    width={'8rem'}
                />
            </Link>
        </div>
    );
}
    
export default UserEdit;
