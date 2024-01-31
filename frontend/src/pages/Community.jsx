// 커뮤니티 게시판 메인
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Sidebar from "./../components/Sidebar";
import { FaSearch } from "react-icons/fa";
import { BoardList } from "../components/API/BoardAPI";

const CommunityContainer = styled.div`
  background-color: ${(props) => props.theme.colours.primary};
  display: flex;
  /* flex-direction: column; */
  height: 60rem;
  color: white;
  padding-top: 3%;
  justify-content: space-evenly;
  padding-left: 3%;
`;

const SideDiv = styled.div`
  width: 10%;
  padding-left: 2.5%;
`;

const MainDiv = styled.div`
  width: 70%;
  background-color: ${(props) => props.theme.colours.point};
  border-radius: 50px;
  overflow: hidden;
  padding-top: 1%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;

  .Container {
    margin-top: 5%;
    h1 {
      margin-bottom: 3vh;
    }
    .SearchContainer {
      display: flex;
      align-items: center;
      input {
        height: 100%;
        margin-left: 7.5%;
        width: 15rem;
        background-color: ${(props) => props.theme.colours.point};
        border-top: none;
        border-right: none;
        border-left: none;
        color: white;
        text-align: center;
        outline: none;
        font-size: medium;
        &:active {
          border: none;
        }
      }
    }
    .BoardSearch {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3%;
      button {
        margin-right: 20px;
      }
    }
  }
`;

const RSideDiv = styled.div`
  width: 15%;
`;

console.log();

//


const Community = () => {
  return (
    <CommunityContainer>
      <SideDiv>
        <Sidebar paddingtop="6vh" />
      </SideDiv>
      <MainDiv>
        <Navbar backcolour="10" />
        <div className="Container">
          <h1>자유게시판</h1>
          <div className="BoardSearch">
            <span className="SearchContainer">
              <FaSearch />
              <input type="text" placeholder="검색어를 입력해주세요" />
            </span>
            <div>
              <button>최신순</button>
              <button>조회수순</button>
              <button>좋아요순</button>
            </div>
          </div>
          <p>여기에 이제 글 쓰십시오.</p>
          <button onClick={BoardList} > 
            버튼을 눌러봐요
          </button>
        </div>
      </MainDiv>
      <RSideDiv>3</RSideDiv>
    </CommunityContainer>
  );
};

export default Community;
