import React, { useEffect, useState } from "react";
import { GatherList } from "./../../API/GatherAPI";
import { useNavigate, useParams, Link } from "react-router-dom";

const GatherHome = () => {
  const [gathers, setGathers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const Navigate = useNavigate();
  const NowPage = useParams();
  console.log(NowPage);
  // gather main은 따로 만들자.

  const Createbutton = () => {
    Navigate("/gather/create");
  };

  useEffect(() => {
    const fetchGathers = async () => {
      const res = await GatherList({ page: currentPage, size: 10 });
      console.log(res.data.boardRecruitRes);
      setGathers(res.data.boardRecruitRes);
      const totalPage = Math.ceil(res.data.totalPageCount / 10);
      setTotalPage(totalPage);
    };
    fetchGathers();
    console.log(totalPage, "총페이지");
  }, [currentPage]);

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 5);
    let end = Math.min(totalPage, currentPage + 5);
    return Array.from({ length: totalPage }, (_, i) => i + 1).slice(start - 1, end);
  };

  const onPageChange = async (newPage) => {
    if (newPage < 1 || newPage > totalPage) {
      // 페이지 범위를 벗어난 경우
      return;
    }
  
    // 해당 페이지의 글을 불러옵니다.
    const res = await GatherList({page: newPage, size: 10});
  
    // 글이 없는 경우
    if (res.data.boardRecruitRes.length === 0) {
      alert('글이 없는 페이지입니다.');
      return;
    }
  
    setCurrentPage(newPage);
  };

  return (
    <div>
      <button onClick={async () => await onPageChange(currentPage - 1)}>이전</button>
      {
        getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            style={currentPage === pageNumber ? { color: 'red' } : {}}
          >
            {pageNumber}
          </button>
        ))
      }
      <button onClick={async () => await onPageChange(currentPage + 1)}>다음</button>

      <p>GatherHome</p>
      <button onClick={Createbutton}>작성</button>
      <ul>
        {gathers.map((gather) => (
          <li key={gather.gatherIdx}>
            <p><Link to={`/gather/detail/${gather.boardIdx}`}>{gather.title}</Link></p>
            <p>{gather.content}</p>
            <p>{gather.createdAt}</p>
            <p>{gather.updatedAt}</p>
            <p>{gather.nickname} </p>
            <p>{gather.boardIdx}</p>
            <hr />
          </li>
        ))}
      </ul>
      <p>내가 작성한 공고 : 어떻게 하지 ?</p>
      <p>내가 선호할 만한 사람 : 나랑 동일한 장르 사람 보여주기 ? </p>
      <p>나를 찾는 공고 : 게시글 - 내 포지션과 내 선호장르가 들어있는 글</p>
      {/* 페이지네이션 */}

      {/* 검색창 */}

      {/* 검색버튼 */}

      {/* 글쓰기 버튼 */}

      {/* 로그인 여부에 따라 글쓰기 버튼 보이기/안보이기 */}

      {/* 검색창에 입력한 값으로 검색하기 */}
    </div>
  );
};

export default GatherHome;
