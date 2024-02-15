import { useEffect, useState } from "react";
import { getShorts, likeShorts, hateShorts } from "../API/ShortsAPI";
import styled from "styled-components";
import { BiDislike, BiLike } from "react-icons/bi";

function setWindowHeight(){
  var windowHeight = window.innerHeight;
  windowHeight += 100;
  document.body.style.height = windowHeight + "px";
}
window.addEventListener("resize",setWindowHeight,false);

function MatchingContent() {
  const [scroll, setScroll] = useState(false);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [values, setValues] = useState({});

  const [likeActive, setLikeActive] = useState(false)
  const [hateActive, setHateActive] = useState(false)

  useEffect(() => {
    setWindowHeight()
    const getShort = async () => {
      try {
        const response = await getShorts();
        // console.log(response)
        setValues(response);
        setNickname(response.userIdx.nickname);
        setDescription(response.description);
      } catch (err) {
        // console.log(err);
      }
    };

    getShort();

    setLikeActive(false)
    setHateActive(false)
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); //clean up
    };
  }, [scroll]);
  const handleScroll = () => {
    // 스크롤이 Top에서 100px 이상 내려오면 true값을 useState에 넣어줌
    if (window.scrollY >= 100) {
      setScroll(true);
    } else {
      // 스크롤이 50px 미만일경우 false를 넣어줌
      setScroll(false);
    }
  };

  const handleLike = async () => {
    try {
      await likeShorts(values.shortsIdx);
      setLikeActive(!likeActive)
      if (hateActive) {setHateActive(false)}
    } catch (err) {
      // console.log(err);
    }
  };

  const handleHate = async () => {
    try {
      await hateShorts(values.shortsIdx);
      setHateActive(!hateActive)
      if (likeActive) {setLikeActive(false)}
    } catch (err) {
      // console.log(err)
    }
  };

  return (
    <ShortsContainer>
      <VideoInfo>
        <Video
          src={values.fileURL}
          alt="비디오"
          muted
          autoPlay
          loop
          controls
        ></Video>
        <Name>
          <p className="name">{nickname}</p>
        </Name>
        <Desc>
          <p className="desc">{description}</p>
        </Desc>
      </VideoInfo>
      <div className="likeInfo-container">
        <LikeInfo>
          {likeActive ? (
            <>
          <div className="button2" onClick={handleLike}>
            <div className="icon">
              <BiLike size={40} />
            </div>
          </div>
          <div className="letter">
          <p>좋아요 취소</p>
        </div>
        </>
          ) : (
            <>
            <div className="button" onClick={handleLike}>
            <div className="icon">
              <BiLike size={40} />
            </div>
          </div>
                    <div className="letter">
                    <p>좋아요 </p>
                  </div>
                  </>
          )}
        </LikeInfo>
        <LikeInfo>
          {hateActive ? (
            <>
          <div className="button2" onClick={handleHate}>
            <div className="icon">
              <BiDislike size={40} />
            </div>
          </div>
          <div className="letter">
          <p>싫어요 취소</p>
        </div>
        </>
          ) : (
            <>
            <div className="button" onClick={handleHate}>
            <div className="icon">
              <BiDislike size={40} />
            </div>
          </div>
                    <div className="letter">
                    <p>싫어요 </p>
                  </div>
                  </>
          )}
        </LikeInfo>
      </div>
    </ShortsContainer>
  );
}

export default MatchingContent;

const ShortsContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: center;

  .likeInfo-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LikeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  margin-left: 1rem;

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #873ffa;
    border-radius: 50%;
    height: 5rem;
    width: 5rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .button2 {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #873ffa;
      border-radius: 50%;
      height: 5rem;
      width: 5rem;
      margin-bottom: 1rem;  
      cursor: pointer;
    }

  .letter {
    display: flex;
    justify-content: center;
  }

  .letter > p {
    font-size: large;
  }
`;

const Video = styled.video`
  width: 500px;
  height: 600px;
  background-color: #151c2c;
  align-items: center;
  border-radius: 20px;
`;

const Name = styled.div`
  color: white;
  position: absolute;
  bottom: 9rem;
  left: 3rem;

  .name {
    font-size: x-large;
    font-weight: bold;
  }
`;

const Desc = styled.div`
  color: white;
  position: absolute;
  bottom: 7rem;
  left: 3rem;

  .desc {
    font-size: large;
  }
`;

const Source = styled.source`
  width: 100%;
  height: 100%;
`;
