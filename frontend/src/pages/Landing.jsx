import styled from "styled-components";
import Navbar from "../components/Navbar";
import mainImage from "../assets/images/mainImage.png";
import SignupModal from "../components/Modals/SignupModal";
import SigninModal from "../components/Modals/SigninModal";
import { styled as styled2 } from "@mui/system";
import { useEffect, useState } from "react";
import RightDouble from "../assets/icons/Expand_right_double.svg";
import LeftDouble from "../assets/icons/Expand_left.png";
import FolderNoImage from "../components/FolderNoImage";
import { BoardList } from "../API/BoardAPI";
import { GatherList } from "./../API/GatherAPI";
import { useNavigate } from "react-router-dom";
import DefaultButton from "./../components/DefaultButton";
import { createViduSession, getsessions } from "../API/TeamspaceAPI";
import { shortsList } from "../API/ShortsAPI";
// background-color: ${props => props.theme.colours.primary};

const LandingPageContainer = styled.div`
  min-height: 300vh;
  background-color: ${(props) => props.theme.colours.primary};
  color: white;
  text-align: center;
  .contents {
    padding-top: 5%;
  }
`;

function Landing() {
  const Navi = useNavigate();
  const [logined, setLogined] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [gatherList, setGatherList] = useState([]);
  const [shortList, setShortList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // 글 인기순으로 가져오기
      const response = await BoardList({ page: 1, size: 4 });
      const sortedData = response.data.boardResList.sort(
        (a, b) => b.likeNum - a.likeNum
      );
      setBoardList(sortedData);
      // 모집글 가져오기
      if (logined) {
        const response3 = await shortsList();
        setShortList(response3);
        
      }
      const response2 = await GatherList({ page: 1, size: 4 });
      setGatherList(response2.data.boardRecruitRes);
      // 매칭글 가져오기
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.accessToken) {
      setLogined(true);
    }
  }, []);

  const shortsLimitList = () => {
    const result = [];
    if (shortList.length > 4) {
      for (let i = 0; i < 4; i++) {
        result.push(shortList[i]);
      }
    } else {
      for (let i = 0; i < shortList.length; i++) {
        result.push(shortList[i]);
      }
    }

    return result;
  };

  return (
    <>
      <Navbar />
      <LandingPageContainer>
        {!logined && (
          <LandingImageDiv>
            <div></div>
            <div>
              <h1>M A T C H</h1>
              <h1>C O L L A B O R A T E</h1>
              <h1>P O R T F O L I O</h1>
            </div>
            <div>
              <SignUp />
              <SignIn />
            </div>
          </LandingImageDiv>
        )}
        {logined && (
          <ContentsContainer>
            <InnerContainer>
              <img src={RightDouble} alt="" />
              <h1> Matching</h1>
              <Titles>
                <img src={LeftDouble} alt="" />
              </Titles>
            </InnerContainer>
            <FolderContainer>
              {Object.entries(shortsLimitList()).map(([key, value]) => (
                <ShortsDiv
                  key={value.shortsIdx}
                  src={value.fileURL}
                  alt="영상"
                  muted
                  controls
                ></ShortsDiv>
              ))}
            </FolderContainer>
          </ContentsContainer>
        )}
        <div className="contents">
          <ContentsContainer>
            <InnerContainer>
              <img src={RightDouble} alt="" />
              <h1> Gathering List</h1>
              <Titles>
                <img src={LeftDouble} alt="" />
              </Titles>
            </InnerContainer>
            <FolderContainer>
              {gatherList.map((gather) => {
                return (
                  <FolderNoImage
                    key={gather.boardRecruitIdx}
                    title={gather.title}
                    content={gather.content}
                    day={gather.endDate}
                    width="12vw"
                    maxwidth="400px"
                    onClick={(event) =>
                      Navi(`/gather/detail/${gather.boardRecruitIdx}`)
                    }
                  />
                );
              })}
            </FolderContainer>
            <div className="buttonholder">
              <DefaultButton
                text="More"
                width="7vw"
                height="3vh"
                onClick={(event) => Navi("/gather")}
              />
            </div>
          </ContentsContainer>
          <ContentsContainer>
            <InnerContainer>
              <img src={RightDouble} alt="" />
              <h1> Community</h1>
              <Titles>
                <img src={LeftDouble} alt="" />
              </Titles>
            </InnerContainer>
            <FolderContainer>
              {boardList.map((board) => {
                return (
                  <FolderNoImage
                    key={board.boardIdx}
                    title={board.title}
                    content={board.content}
                    day={board.createAt}
                    width="12vw"
                    maxwidth="400px"
                    onClick={(event) => Navi(`/community/${board.boardIdx}`)}
                  />
                );
              })}
            </FolderContainer>
            <div className="buttonholder">
              <DefaultButton
                text="More"
                width="7vw"
                height="3vh"
                onClick={(event) => Navi("/community")}
              />
            </div>
          </ContentsContainer>
        </div>
      </LandingPageContainer>
    </>
  );
}

export default Landing;
const FolderContainer = styled.div`
  margin-top: 2vh;
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  padding-top: 3%;
  margin-bottom: 0%;
`;
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    padding-bottom: 5%;
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .buttonholder {
    display: flex;
    width: 100%;
    justify-content: end;
    padding-right: 5%;
    align-items: baseline;
  }
`;

const Titles = styled.div`
  position: relative;
  img {
    position: absolute;
    top: 50%;
  }
`;

const LandingImageDiv = styled.div`
  background-image: url(${mainImage});
  background-size: 100% auto;
  background-repeat: no-repeat;
  min-height: calc(100vh + 5rem);
  margin-top: -15vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  h1 {
    color: white;
    font-size: 4.4rem;
    margin-bottom: 1.5vh;
    padding: 1%;
    font-family: InterBold;
  }
  > div:nth-child(1) {
  }
  > div:nth-child(3) {
    flex-grow: 0.3;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-bottom: 5%; */
    gap: 3rem;
  }
`;
const SignUp = styled2(SignupModal)`
  margin: 2rem;
  font-size: 1.5rem;
  padding: 12px 24px;
`;

const SignIn = styled(SigninModal)`
  font-size: 1.5rem;
  padding: 12px 24px;
`;

const ShortsDiv = styled.video`
  width: 250px;
  height: 280px;
  background-color: #202c44;
  border-radius: 15%;
  margin-bottom: 5%;
  /* 전체화면 버튼 */
  &::-webkit-media-controls-fullscreen-button {
    display: none !important;
  }

  /* 일시정지, 재생 버튼 */
  &::-webkit-media-controls-play-button {
    display: none !important;
  }

  /* 재생 슬라이드..? */
  &::-webkit-media-controls-timeline {
    display: none !important;
  }

  /* 현재 진행 시간 */
  &::-webkit-media-controls-current-time-display {
    display: none !important;
  }

  /* 전체 시간 */
  &::-webkit-media-controls-time-remaining-display {
    display: none !important;
  }


  /* 볼륨 조절 슬라이드 */
  &::-webkit-media-controls-volume-slider {
    display: none !important;
  }
`;
