import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from "styled-components"
import SearchPortfolio from '../components/search/SearchPortfolio'
import SearchUser from '../components/search/SearchUser'
import SearchGather from '../components/search/SearchGather'
import SearchCommunity from '../components/search/SearchCommunity'
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Alarmbar from "../components/alarm/Alarmbar";

function TeamspaceDetail () {
    // 현재 어느 메뉴가 선택 되었는가?
    const [currentTab, clickTab] = useState(0)

    const menuArr = [
        { name: 'Portfolio', content: <SearchPortfolio/>},
        { name: 'User', content: <SearchUser/>},
        { name: 'Gather', content: <SearchGather/>},
        { name: 'Community', content: <SearchCommunity/>},
    ]

    // 현재 선택한 인덱스 값을 받아서 clickTab에 저장하여 currentTab 갱신
    const clickMenuHandler = (index) => {
        clickTab(index)
    }

    return(
      <SearchContainer>
        <SideDiv>
          <Sidebar paddingtop="6vh"/>
        </SideDiv>
        <MainContainer>
        <Navbar />
        <P>Search</P>
          <Header>
            <TabMenu>
                {menuArr.map((el, index) => (
                    <li className={index === currentTab ? "submenu focused" : "submenu" } key={index}>
                    <span onClick={() => clickMenuHandler(index)}>
                        {el.name}
                    </span>
                    </li>
                ))}
            </TabMenu>
          </Header>
        <MainDiv>
              <div className='nowContent'>
                  {menuArr[currentTab].content}
              </div>
        </MainDiv>
        </MainContainer>
        <RSideDiv>
            <Alarmbar />
        </RSideDiv>
      </SearchContainer>
    )
}

export default TeamspaceDetail

const Header = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 1%;
`

const P = styled.p`
  font-size: x-large;
  padding-top: 3%;
  padding-left: 7%;
  font-weight: bold;
`
const TabMenu = styled.ul`
    color: white;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    margin-bottom: px;

    // 메뉴 css
    .submenu {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 30px;
        padding: 10px;
        font-size: 20px;
        cursor: pointer;
    }

    // 선택한 메뉴 css
    .focused {
        text-decoration: underline;
        text-decoration-color: #254EF8;
    }
`
const SearchContainer = styled.div`
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

const MainContainer = styled.div`
  width: 67.5vw;
  height: 700px;
`
const MainDiv = styled.div`
  width: 100%;
  height: 600px;
  background-color: ${(props) => props.theme.colours.point};
  border-radius: 50px;
  overflow: hidden;
  padding-top: 3%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;
  height: 70%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  .Container {
    margin-top: 5%;
    h1 {
      margin-bottom: 3vh;
    }
  }
`;

const RSideDiv = styled.div`
  width: 15vw;
`;