import DefaultFileShape from "../components/DefaultFolderShape";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Alarmbar from "../components/alarm/Alarmbar";
import { shortsList } from "../API/ShortsAPI";
import { recommendList } from "../API/GatherAPI";
import { myGatherList } from "../API/UserAPI";
import DefaultButton from "../components/DefaultButton";

function Gather() {
  const [recommend, setRecommend] = useState([])
  const [myGather, setMyGather] = useState([])
  const [shorts, setShorts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const gatherInfo = async() => {     
        try {
          const recommendInfo = await recommendList({
            page: 1,
            size: 10,
            word: "",
            sortKey: "viewNum"
          });
          setRecommend(recommendInfo.boardRecruitRes)
          const myGatherInfo = await myGatherList({
            page: 1,
            size: 10,
          });
          // console.log(myGatherInfo)
          setMyGather(myGatherInfo.boardRecruitRes)
          const shortsInfo = await shortsList()
          setShorts(shortsInfo)
        } catch (err) {
          console.error(err)
        }
      }; 
      
      gatherInfo()
  
    },[])

    // console.log(myGather)
    // console.log(recommend)

    const recommendLimitList = () => {
      const result = []
      if (recommend.length > 3) {
        for (let i = 0; i < 3; i++) {
          result.push(recommend[i])
        }
      } else {
        for (let i = 0; i < recommend.length; i++) {
          result.push(recommend[i])
        }
      }
      return result
    }

    const myGatherLimitList = () => {
      const result = []
      if (myGather.length > 3) {
        for (let i = 0; i < 3; i++) {
          result.push(myGather[i])
        }
      } else {
        for (let i = 0; i < myGather.length; i++) {
          result.push(myGather[i])
        }
      }
      return result
    }

    const shortsLimitList = () => {
      const result = []
      if (shorts.length > 3) {
        for (let i = 0; i < 3; i++) {
          result.push(shorts[i])
        }
      } else {
        for (let i = 0; i < shorts.length; i++) {
          result.push(shorts[i])
        }
      }
      
      return result
    }

    const handleCreate = () => {
      navigate('/gather/create')
    }

    // console.log(myGatherLimitList())
  return ( 
    <GatherContainer>
      <SideDiv>
        <Sidebar paddingtop="6vh"/>
      </SideDiv>
      <MainDiv>
        <Navbar backcolour="10" />
        <div className="main-box">
          <div className="header">
            <h3>내가 작성한 공고</h3>
            <DefaultButton
              text='글쓰기'
              width='4rem'
              height='2rem'
              onClick={handleCreate}
            />
          </div>
          <ListContainer>
            {myGather.length === 0 ? (
              <>
              작성한 공고 없음
              </>
            ) : (
              <>
            {/* {Object.entries(myGatherLimitList()).map(([key, value]) => ( */}
              {/* <ListDiv key={value.boardRecruitIdx}> */}
                {/* <Title> */}
                {/* {value.title} */}
                {/* </Title> */}
                {/* <Content> */}
                {/* {value.content} */}
                {/* </Content> */}
              {/* </ListDiv> */}
            {/* ))} */}
            </>
            )}
          </ListContainer>
            내가 선호할 만한 사람
          {/* <ListContainer>
          {shorts.length === 0 ? (
              <>
              추천 없음
              </>
            ) : (
              <>
            {Object.entries(shortsLimitList()).map(([key, value]) => (
              <ShortsDiv key={value.boardRecruitIdx}>
                <Title>
                {value.title}
                </Title>
                <Content>
                {value.content}
                </Content>
              </ShortsDiv>
            ))}
            </>
            )}
          </ListContainer> */}
          나를 찾는 공고
          <ListContainer>
            {recommend.length === 0 ? (
              <>
              적합한 공고 없음
              </>
            ) : (
              <>
                  {Object.entries(recommendLimitList()).map(([key, value]) => (
                  <ListDiv key={value.boardRecruitIdx}>
                    <Title>
                    {/* {value.title} */}
                    </Title>
                    <Content>
                    {/* {value.content} */}
                    </Content>
                  </ListDiv>
                ))}
                </>
            )}
          </ListContainer>

        </div>
      </MainDiv>
      <RSideDiv>
          <Alarmbar />
      </RSideDiv>
    </GatherContainer>
   );
}

export default Gather

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2px 5%;
  padding-top: 3%;
  padding-left: 3%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`
const GatherContainer = styled.div`
  background-color: ${(props) => props.theme.colours.primary};
  display: flex;
  /* height: 60rem; */
  color: white;
  padding-top: 3%;
  height: 70rem;
  justify-content: space-evenly;
`;

const SideDiv = styled.div`
  width: 12.5vw;
  padding-left: 1%;
`;

const MainDiv = styled.div`
  width: 64%;
  height: 600px;
  background-color: ${(props) => props.theme.colours.point};
  border-radius: 50px;
  overflow: hidden;
  padding-top: 1%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;

  .main-box {
    padding: 30px;
    margin-top: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const RSideDiv = styled.div`
  width: 15%;
`;

const ListDiv = styled.div`
  width: 250px;
  height: 200px;
  background-color: #202C44;
  border-radius: 15%;
  margin-bottom: 5%;
`

const Title = styled.div`
  color: white;
  padding-top: 20%;
  padding-left: 10%;
  padding-right: 10%;
  font-weight: bold;
  font-size: x-large;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`

const Content = styled.div`
  color: white;
  padding-top: 15%;
  padding-left: 10%;
  padding-right: 10%;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`