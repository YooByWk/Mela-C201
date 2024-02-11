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
  const [logined, setLogined] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [gatherList, setGatherList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // 글 인기순으로 가져오기
      const response = await BoardList({ page: 1, size: 10 });
      const sortedData = response.data.boardResList.sort(
        (a, b) => b.likeNum - a.likeNum
      );
      setBoardList(sortedData);
      // 모집글 가져오기
      const response2 = await GatherList({ page: 1, size: 10 });
      setGatherList(response2.data.boardRecruitRes);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.accessToken) {
      setLogined(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      <LandingPageContainer>
        <button
          onClick={() => {
            console.log(boardList, gatherList);
          }}
        >
          체크
        </button>
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

        <div className="contents">
          <ContentsContainer>
            <InnerContainer>
              <img src={RightDouble} alt="" />
              <h1> Matching</h1>
              <Titles>
                <img src={LeftDouble} alt="" />
              </Titles>
            </InnerContainer>
          </ContentsContainer>
          <ContentsContainer>
            <InnerContainer>
              <img src={RightDouble} alt="" />
              <h1> Popular Musicians</h1>
              <Titles>
                <img src={LeftDouble} alt="" />
              </Titles>
            </InnerContainer>
          </ContentsContainer>
          <ContentsContainer>
            <InnerContainer>
              <img src={RightDouble} alt="" />
              <h1> Gathering List</h1>
              <Titles>
                <img src={LeftDouble} alt="" />
              </Titles>
            </InnerContainer>
            <FolderContainer>
              <FolderNoImage
                title={gatherList[0]?.title}
                content={gatherList[0]?.content}
                day={gatherList[0]?.endDate}
                width="20vw"
                height="100%"
              />
            </FolderContainer>
          </ContentsContainer>
          <ContentsContainer>
            <InnerContainer>
              <img src={RightDouble} alt="" />
              <h1> Community</h1>
              <Titles>
                <img src={LeftDouble} alt="" />
              </Titles>
            </InnerContainer>
          </ContentsContainer>
        </div>
      </LandingPageContainer>
    </>
  );
}

export default Landing;
const FolderContainer = styled.div`
height: 20vh;`
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
