import { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultimage from '../assets/images/default-image.png'
import { getImg, getMusic } from "../API/FileAPI";
import { FaPlay, FaPause } from "react-icons/fa6";

function DefaultPortfolio(props) {
    const [albumImageURL, setAlbumImageURL] = useState('')
    const [musicURL, setMusicURL] = useState('')
    const [lyrics, setLyrics] = useState('')
    const [visible, setVisible] = useState(false)
    const [playing, setPlaying] = useState(false)

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
            const musicRes = await getMusic(props.file.fileIdx)
            setMusicURL(musicRes.message)
            } catch (err) {
              console.error(err)  
            }
          }
          
          albumImageInfo()

      },[])

      let audio = new Audio(musicURL)
      const handleMusic = () => {
        setPlaying(!playing)
        if (playing) {
          audio.pause()
        } else {
          audio.play()
        }
      }

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
              {playing ? (
                <>
                <FaPause onClick={handleMusic}/>
                </>
              ) : (
                <>
                <FaPlay onClick={handleMusic}/>
                </>
              )}
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

