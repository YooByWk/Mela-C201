import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { BoardList } from "../../API/BoardAPI";
import { useNavigate, Link } from "react-router-dom";
import CoSigninModal from "./CoSigninModal";
import useStore from "../../status/store";

function CommunityHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [boardInput, setBoardInput] = useState('');
  const movePage = useNavigate()
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      const response = await BoardList({ page: currentPage, size: 20 });
      // console.log(response, 'fetch log')
      setData(response.data.boardResList);
      setTotalPageCount(response.data.totalPageCount);
      console.log(totalPageCount)
      // 패칭한 데이터를 상태에 저장
    };
    fetchData();
    // console.log(data, "리스트 조회 완료");
  }, [currentPage]);

  const NextPage = () => {
    setCurrentPage(prevPage => prevPage +1 )
  }
  const PrevPage = () => {
    setCurrentPage(prevPage => prevPage > 1 ? prevPage -1 : prevPage)
  }

  const ViewSorted = async () => {
    const response = await BoardList({ page: 1, size: 20, sortKey: "viewNum", word :boardInput? boardInput : '' });
    setData(response.data.boardResList);
  };

  const LikeSorted = async () => {
    const response = await BoardList({ page: 1, size: 20, word : boardInput? boardInput : '', });
    const sortedData = response.data.boardResList.sort((a, b) => b.likeNum - a.likeNum); 
    setData(sortedData);
    console.log('sortedData: ', sortedData);
  };

  const LastedSorted = async () => {
    const response = await BoardList({ page: 1, size: 20, word :boardInput? boardInput : '' });
    console.log(response.data.boardResList,'boardresData')
    if (response.data.boardResList.length>1) {
      console.log(response.data.length)
      setData(response.data.boardResList);
    } 
  };
  const islogined = useStore((state) => state.islogined);
  console.log(islogined,'로그인여부')

  const Create = (e) => {
    e.preventDefault()
    console.log(islogined,'로그인여부')
    if (islogined){
    movePage('/community/create')
    }
    else {
      setShowLoginModal(true)
      setOpen(true)
    }
  };

  const SearchKeyword = async (event) => {
    setBoardInput(event.target.value)
    console.log(event.target.value)
  }

  const SortByKey =  async(event)=> {
    event.preventDefault()
    const response =  await BoardList({page:1, size:20, word:boardInput})
    if (response.data.length > 1) {
    setData(response.data)
    console.log(response.data.length) }
    else {
      window.alert('검색 결과가 없습니다!')
    }

  }

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPageCount/20); i++) {
    pages.push(
      <button
        onClick={() => setCurrentPage(i)}
        className={currentPage === i ? 'active' : ''}
      >
        {i}
      </button>
    );
  }


  return (
    <>
    <MainDiv>
    <div className="pagination">
      {pages}
    </div>
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
                  || 제목 : <Link to={`/community/${article.boardIdx}`}>{article.title} </Link>
                  || 작성자 : {article.nickname}
                  || 조회수 : {article.viewNum}
                  || 좋아요 : {article.likeNum}
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
      <button onClick={PrevPage} disabled={currentPage === 1}>이전 페이지</button>
        <button onClick={NextPage}>다음 페이지</button>
    </MainDiv>
    {showLoginModal && <CoSigninModal open={open} setOpen={setOpen} />}
    </>
  );
}

export default CommunityHome;


const MainDiv = styled.div`
  a {
    text-decoration: none;
    color : rgb(19, 160, 0)
  }
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