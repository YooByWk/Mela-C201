import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { BoardList } from "../../API/BoardAPI";
import { useNavigate } from "react-router-dom";



function CommunityHome() {

  const [data, setData] = useState(null);
  const [boardInput, setBoardInput] = useState('');
  const movePage = useNavigate()
  

  // page는 현재 페이지
  // column 이름으로 sort
  // size : results at 1 page
  useEffect(() => {
    const fetchData = async () => {
      const response = await BoardList({ page: 0, size: 20 });
      // console.log(response, 'fetch log')
      setData(response.data);
      console.log(data);
      // 패칭한 데이터를 상태에 저장
    };
    fetchData();
    console.log(data, "리스트 조회 완료");
  }, []);

  const ViewSorted = async () => {
    const response = await BoardList({ page: 0, size: 20, sortKey: "viewNum", word :boardInput? boardInput : '' });
    setData(response.data);
  };

  const LikeSorted = async () => {
    window.alert('좋아요 순 대신 최신순으로 정렬되었습니다.')
    const response = await BoardList({ page: 0, size: 20,word :boardInput? boardInput : '' });
    setData(response.data);
  };
  const LastedSorted = async () => {
    const response = await BoardList({ page: 0, size: 20, word :boardInput? boardInput : '' });
    if (response.data.length>1) {
      console.log(response.data.length)
      setData(response.data);
    } 
  };


  const Create = () => {
    movePage('/community/create')
  };

  


  const SearchKeyword = async (event) => {
    setBoardInput(event.target.value)
    console.log(event.target.value)
    
  }

  const SortByKey =  async(event)=> {
    event.preventDefault()
    const response =  await BoardList({page:0, size:20, word:boardInput})
    if (response.data.length > 1) {
    setData(response.data)
    console.log(response.data.length) }
    else {
      window.alert('검색 결과가 없습니다!')
    }

  }

  return (
    <MainDiv>
      <div className="Container">
        <h1>자유게시판</h1>
        <div className="BoardSearch">
          <span className="SearchContainer">
            <FaSearch />
            <form  onSubmit={SortByKey}>
            <input type="text" placeholder="검색어를 입력해주세요" value={boardInput} onChange={SearchKeyword}/>
            </form>
          </span>
          <div>
            <button onClick={LastedSorted}>최신순</button>
            <button onClick={ViewSorted}>조회수순</button>
            <button onClick={LikeSorted}>좋아요순</button>
          </div>
        </div>
        <p>여기에 이제 글 쓰십시오.</p>
        <ul>
          {data && data.length > 0 ?(
            data.map((article) => {
              return (
                <li key={article.boardIdx}>
                  {article.boardIdx}
                  || 제목 : {article.title}
                  || 작성자 : {article.nickname}
                  || 조회수 : {article.viewNum}
                </li>
              );
            }) )
            : (
              <p>게시글이 없습니다.</p>
            ) 
            }
        </ul>
<br />
<br />
<br />
<br />
        <button onClick={Create}>작성</button>
      </div>
    </MainDiv>
  );
}

export default CommunityHome;

const MainDiv = styled.div`


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