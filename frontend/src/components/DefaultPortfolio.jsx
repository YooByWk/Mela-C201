import { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultimage from '../assets/images/default-image.png'
import { getImg } from "../API/FileAPI";

function DefaultPortfolio(props) {
    const [albumImageURL, setAlbumImageURL] = useState()
    const [lyrics, setLyrics] = useState('')
    const [visible, setVisible] = useState(false)

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
            if(props.content) {
               setLyrics(props.content)
            } else {
              setLyrics('등록된 가사가 없습니다.')
            }
            } catch (err) {
              console.error(err)  
            }
          }
          
          albumImageInfo()

      },[])

      const handleVisible = () => {
        setVisible(!visible)
      }

      const fileAsText = () => {
        if (typeof(lyrics) === Object) {
          let lyricFile = lyrics
          let fileReader = new FileReader()
          fileReader.onload = () => {
            console.log(fileReader.result);
            setLyrics(fileReader.result)
          };
          fileReader.readAsText(lyricFile)
          }
        }
      fileAsText()
    return(
      <Container>
        <PortfolioContainer>
            <Album
              src={albumImageURL} 
              alt="앨범 이미지"
              />
            <Open onClick={handleVisible}>Lyrics</Open>
        </PortfolioContainer>
            {visible ? (
              <>
              <Lyrics>
              {lyrics}
              </Lyrics>
              </>
            ) : (
            <>
            </>)}
      </Container>
    )
}

export default DefaultPortfolio

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const PortfolioContainer = styled.div`
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
`
const Album = styled.img`
    width: 90%;
    height: 60%;
    border-radius: 10%;
`

const Lyrics = styled.div`
  position: relative;
  z-index: 1000;
  color: white;
  width: 400px;
  height: 400px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  `

const Open = styled.div`
  width: fit-content;
  cursor: pointer;
`