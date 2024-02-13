import { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultimage from '../assets/images/default-image.png'
import { getImg } from "../API/FileAPI";

function DefaultPortfolio(props) {
    const [albumImageURL, setAlbumImageURL] = useState()

    useEffect(() => {

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
            {/* <Content>
                {props.content}
            </Content> */}

        </Container>
    )
}

export default DefaultPortfolio

const Container = styled.div`
    width: 400px;
    height: 400px;
`
const Album = styled.img`
    width: 90%;
    height: 60%;
    border-radius: 10%;
`

const Content = styled.p`
  color: white;
`