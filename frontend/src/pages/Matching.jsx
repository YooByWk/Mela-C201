import { useEffect, useState } from "react";
import { shortsList } from "../API/ShortsAPI";
import { getVideo } from "../API/FileAPI";
import { getShorts } from "../API/ShortsAPI";
import { useParams } from "react-router";

function Matching() {
    const [video, setVideo] = useState()
    const [scroll, setScroll] = useState(false);

    const shortURL = useParams().shortsURL
    useEffect(() => {
        const getList = async() => {
            try {
                console.log(shortURL)
                setVideo(shortURL)
            } catch (err) {
                console.log(err)
            }
        }
        
        getList()
        console.log('efe')

        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll); //clean up
        };

    }, []);

    const handleScroll = () => {
        // 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
        if(window.scrollY >= 50){
          setScroll(true);
          console.log(scroll)
        }else{
        // 스크롤이 50px 미만일경우 false를 넣어줌
          setScroll(false);
        }
    
      };
    console.log(video)
    console.log(shortURL)
    return ( 
        <>
        <h1>매칭 ㅠㅠ</h1>
      <video src={video} alt="비디오" muted autoPlay></video>
      </>
     );
  }
  
  export default Matching