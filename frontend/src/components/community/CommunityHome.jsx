import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { BoardList } from "../../API/BoardAPI";
import { useNavigate, Link } from "react-router-dom";
import CoSigninModal from "./CoSigninModal";
import useStore from "../../status/store";
import DefaultButton from "../DefaultButton";
import { GoDotFill } from "react-icons/go";
import moment from "moment";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";

function CommunityHome() {
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [boardInput, setBoardInput] = useState("");
  const movePage = useNavigate();
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [likeCount, setLikeCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await BoardList({ page: currentPage, size: 10 });
      // console.log(response, 'fetch log')
      setData(response.data.boardResList);
      setTotalPageCount(response.data.totalPageCount);
      setLikeCount(response.data.likeNum);
      // 패칭한 데이터를 상태에 저장
    };
    fetchData();
    // console.log(data, "리스트 조회 완료");
  }, [currentPage]);

  const NextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const PrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const ViewSorted = async () => {
    setSortType("view");
    const response = await BoardList({
      page: 1,
      size: 10,
      sortKey: "viewNum",
      word: boardInput ? boardInput : "",
    });
    setData(response.data.boardResList);
  };

  const LikeSorted = async () => {
    setSortType("like");
    const response = await BoardList({
      page: 1,
      size: 10,
      word: boardInput ? boardInput : "",
    });
    const sortedData = response.data.boardResList.sort(
      (a, b) => b.likeNum - a.likeNum
    );
    setData(sortedData);
  };

  const LastedSorted = async () => {
    setSortType("latest");
    const response = await BoardList({
      page: 1,
      size: 10,
      word: boardInput ? boardInput : "",
    });
    if (response.data.boardResList.length > 1) {
      setData(response.data.boardResList);
    }
  };
  const islogined = useStore((state) => state.islogined);
  // console.log(islogined, "로그인여부");

  const Create = (e) => {
    e.preventDefault();
    // console.log(islogined, "로그인여부");
    if (islogined) {
      movePage("/community/create");
    } else {
      setShowLoginModal(true);
      setOpen(true);
    }
  };

  const SearchKeyword = async (event) => {
    setBoardInput(event.target.value);
  };

  const SortByKey = async (event) => {
    event.preventDefault();
    const response = await BoardList({ page: 1, size: 10, word: boardInput });
    if (response.data.boardResList.length > 1) {
      setData(response.data.boardResList);
    } else {
      window.alert("검색 결과가 없습니다!");
    }
  };

  const BoardClickHandler = async (e) => {
    e.preventDefault();
    setBoardInput("");
    const response = await BoardList({
      page: 1,
      size: 10,
      word: boardInput ? boardInput : "",
    });
    setData(response.data.boardResList);
    setSortType("latest");
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPageCount / 10); i++) {
    pages.push(
      <PaginationButton
        onClick={() => setCurrentPage(i)}
        isActive={currentPage === i ? "active" : ""}
      ></PaginationButton>
    );
  }

  return (
    <>
      <MainDiv>
        <div className="Container">
          <h1 onClick={BoardClickHandler}>자유게시판</h1>
          <div className="BoardSearch">
            <span className="SearchContainer">
              <FaSearch />
              <form onSubmit={SortByKey}>
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요"
                  value={boardInput}
                  onChange={SearchKeyword}
                />
              </form>
            </span>
            <div>
              <button
                onClick={LastedSorted}
                className={`sort-btn ${
                  sortType === "latest" ? "active-sort" : ""
                }`}
              >
                <GoDotFill />
                최신순
              </button>
              <button
                onClick={ViewSorted}
                className={`sort-btn ${
                  sortType === "view" ? "active-sort" : ""
                }`}
              >
                <GoDotFill />
                조회수순
              </button>
              <button
                onClick={LikeSorted}
                className={`sort-btn ${
                  sortType === "like" ? "active-sort" : ""
                }`}
              >
                <GoDotFill />
                인기순
              </button>
            </div>
          </div>
          <div className="header">
            <span>NO</span>
            <span>제목</span>
            <span>작성자</span>
            <span>날짜</span>
            <span>조회수</span>
            <span>추천수</span>
          </div>
          <div className="listWrapper">
            <ul className="content">
              {data && data.length > 0 ? (
                data.map((article) => {
                  return (
                    <li key={article.boardIdx} className="list">
                      <div>{article.boardIdx}</div>
                      <div className="title">
                        <Link to={`/community/${article.boardIdx}`}>
                          {article.title.length < 20
                            ? article.title
                            : article.title.slice(0, 18) + "..."}
                        </Link>
                        <span className="comment-count">
                          [{article.commentNum}]
                        </span>
                      </div>
                      <div>{article.nickname}</div>
                      <div>{moment(article.registDate).format("YY-MM-DD")}</div>
                      <div>{article.viewNum}</div>
                      <div>
                        <span>{article.likeNum}</span>
                      </div>
                    </li>
                  );
                })
              ) : (
                <p>게시글이 없습니다.</p>
              )}
            </ul>
          </div>
          <br />
          <div className="buttonWrapper">
            <DefaultButton
              onClick={Create}
              text="글쓰기"
              width="4rem"
              height="2rem"
            />
          </div>
        </div>
        <div className="footer">
          <div
            className="page-btn"
            onClick={PrevPage}
            disabled={currentPage === 1}
          >
            <IoIosArrowBack />
          </div>
          <div className="pagination">{pages}</div>
          <div className="page-btn" onClick={NextPage}>
            <IoIosArrowForward />
          </div>
        </div>
      </MainDiv>
      {showLoginModal && <CoSigninModal open={open} setOpen={setOpen} />}
    </>
  );
}

export default CommunityHome;

const PaginationButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#254EF8" : "#13295b")};
  border: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 3px;
  cursor: pointer;
  align-items: center;
`;

const MainDiv = styled.div`
  a {
    text-decoration: none;
    color: white;
  }

  .header {
    display: flex;
    background-color: #1e40c6;
    justify-content: space-between;
    height: 2rem;
    border-radius: 10px;
    align-items: center;
    margin-bottom: 10px;
  }

  .listWrapper {
    background-color: #202c44;
    border-radius: 10px;
    height: 100%;
    min-height: 2.5rem;
    align-items: center;
    display: flex;
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #254ef8;
    text-align: center;
  }

  .list:last-child {
    border-bottom: none;
  }

  .header span {
    flex: 1;
    text-align: center;
  }

  .header span:nth-child(1),
  .list div:nth-child(1) {
    flex: 0.5;
  } /* NO */
  .header span:nth-child(2),
  .list div:nth-child(2) {
    flex: 3;
  } /* 제목 */
  .header span:nth-child(3),
  .list div:nth-child(3) {
    flex: 1;
  } /* 작성자 */
  .header span:nth-child(4),
  .list div:nth-child(4) {
    flex: 1;
  } /* 날짜 */
  .header span:nth-child(5),
  .list div:nth-child(5) {
    flex: 0.5;
  } /* 조회수 */
  .header span:nth-child(6),
  .list div:nth-child(6) {
    flex: 0.5;
  } /* 추천수 */

  .sort-btn {
    color: #6c7383;
    background-color: #151c2c;
    border: none;
    cursor: pointer;
  }

  .sort-btn.active-sort {
    color: #254ef8;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
  }

  .like {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .comment-count {
    color: gray;
    margin-left: 10px;
  }

  .buttonWrapper {
    position: absolute;
    right: 20px;
  }

  .page-btn {
    background-color: #202c44;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .footer {
    display: flex;
    align-items: center;
    margin: 5px;
  }

  .pagination {
    margin: 5px;
  }

  .Container {
    margin-top: 5%;
    padding: 10px;
    margin-right: 15px;
    position: relative;

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
