import { useEffect, useState } from "react";
import { shortsList } from "../API/ShortsAPI";
import { getVideo } from "../API/FileAPI";
import { getShorts } from "../API/ShortsAPI";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Matching() {
    const [video, setVideo] = useState()
    const [scroll, setScroll] = useState(false);
    // const [fileIdx, setFileIdx] = useState('');
    const { fileIdx } = useParams()
    // console.log(fileIdx)
    const Navi = useNavigate()

    useEffect(() => {
        const getList = async() => {
            try {
                const getVideoURL = await getVideo(fileIdx)
                setVideo(getVideoURL.message)
            } catch (err) {
                console.log(err)
            }
        }
        
        getList()
        // console.log('efe')

        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll); //clean up
        };

    }, [fileIdx]);

    const handleScroll = async() => {
        // 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
        if(window.scrollY >= 10){
          setScroll(true);
        //   console.log(scroll)
        const response = await getShorts()
        Navi(`/matching/${response.shortsPathFileIdx.fileIdx}`)
        }else{
        // 스크롤이 50px 미만일경우 false를 넣어줌
          setScroll(false);
        }
    
      };
    // console.log(video)
    // console.log(shortURL)
    return ( 
        <>
      <Video src={video} alt="비디오" muted autoPlay></Video>
      </>
     );
  }
  
  export default Matching

  const Video = styled.video`
    width: 100px;
    height: 100px;
  `