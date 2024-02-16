import { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultprofile from '../../assets/images/default-profile.png'
import { getImg } from "../../API/FileAPI";

function DefaultUserShape(props) {
    const [profileImageURL, setProfileImageURL] = useState('')

    useEffect(() => {
      const profileImageInfo = async() => {     
        try {
          if (props.profileImage) {
            const response = await getImg(props.profileImage.fileIdx)
            setProfileImageURL(response.message)
          }
           else {
            setProfileImageURL(defaultprofile)
          }
          } catch (err) {
            console.error(err)  
          }
        }
        
        profileImageInfo()

      },[])

    return(
        <Container>
            <Profile 
              src={profileImageURL} 
              alt="프로필 이미지"
              />
            <Content>
                {props.nickname}
            </Content>
        </Container>
    )
}

export default DefaultUserShape

const Container = styled.div`
    width: 180px;
    height: 200px;
    padding-bottom: 5%;
`

const Profile = styled.img`
    width: 100%;
    height: 90%;
    border-radius: 50%;
`

const Content = styled.p`
  padding-top: 5%; 
  color: white;
  text-align: center;
  font-weight: bold;
`