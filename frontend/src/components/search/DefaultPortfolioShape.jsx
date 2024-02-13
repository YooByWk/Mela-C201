import { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultimage from '../../assets/images/default-image.png'
import defaultprofile from '../../assets/images/default-profile.png'

import { getImg } from "../../API/FileAPI";

function DefaultPortfolioShape(props) {
    const [profileImageURL, setProfileImageURL] = useState('')
    const [albumImageURL, setAlbumImageURL] = useState('')

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
        
        const albumImageInfo = async() => {     
          try {
            if (props.albumImage) {
              const response = await getImg(props.albumImage.fileIdx)
              setAlbumImageURL(response.message)
            }
             else {
              setAlbumImageURL(defaultimage)
            }
            } catch (err) {
              console.error(err)  
            }
          }
          
          albumImageInfo()

      },[])

    return(
        <Container
        >
            <Album
              src={albumImageURL} 
              alt="앨범 이미지"
              />
            <UserInfo>
            <Profile 
              src={profileImageURL} 
              alt="프로필 이미지"
              />
            <Content>
                {props.nickname}
            </Content>
            </UserInfo>

        </Container>
    )
}

export default DefaultPortfolioShape

const Container = styled.div`
    width: 250px;
    height: 200px;
    display: flex;
    flex-direction: column;
    padding-bottom: 3%;
`
const Album = styled.img`
    width: 90%;
    height: 75%;
    border-radius: 10%;
`
const UserInfo = styled.div`
  padding-top: 5%;
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 20%;
  align-items: center;
`
const Profile = styled.img`
    width: 20%;
    height: 100%;
    border-radius: 50%;
`

const Content = styled.p`
  color: white;
  padding-left: 10%;
  font-weight: bold;
`