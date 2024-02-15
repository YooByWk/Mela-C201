import { useEffect, useState } from "react";
import { getShorts, likeShorts, hateShorts } from "../API/ShortsAPI";
import styled from "styled-components";

function MatchingContent() {
    const [scroll, setScroll] = useState(false);
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')
    const [values, setValues] = useState({})

    useEffect(() => {
        const getShort = async() => {
            try {
                const response = await getShorts()
                // console.log(response)
                setValues(response)
                setNickname(response.userIdx.nickname)
                setDescription(response.description)
            } catch (err) {
                console.log(err)
            }
        }

        getShort()
        window.scrollTo(0, 0);
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll); //clean up
        };
    },[scroll])


    const handleScroll = async() => {
        // 스크롤이 Top에서 10px 이상 내려오면 true값을 useState에 넣어줌
        if(window.scrollY >= 10){
          setScroll(true);
        }else{
        // 스크롤이 50px 미만일경우 false를 넣어줌
          setScroll(false);
        }
      };

    const handleLike = async() => {
        try {
            await likeShorts(values.shortsIdx)
            console.log('성공')
        } catch (err) {
            console.log(err)
        }
    }

    const handleHate = async() => {
        await hateShorts(values.shortsIdx)
    }

    return ( 
        <ShortsContainer>
        <VideoInfo>
      <Video 
      src={values.fileURL}
      alt="비디오" 
      muted 
      autoPlay 
      loop 
      controls>
      </Video>
      <Div>{nickname}</Div>
      <Div>{description}</Div>
        </VideoInfo>
        <LikeInfo>
      <Div onClick={handleLike}>좋아요</Div>
      <Div onClick={handleHate}>싫어요</Div>
        </LikeInfo>
      </ShortsContainer>
     );
  }
  
  export default MatchingContent

  const ShortsContainer = styled.div`
    display: flex;
    flex-direction: row;
  `
  const VideoInfo = styled.div`
    color: white;
  `

  const LikeInfo = styled.div`
    color: white;
  `
  const Video = styled.video`
    width: 500px;
    height: 600px;
    background-color: #151C2C;
    align-items: center;
  `

  const Div = styled.div`
    color: white;
    cursor: pointer;
  `

  const Source = styled.source`
    width: 100%;
    height: 100%;
  `