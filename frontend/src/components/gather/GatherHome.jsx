import React, { useEffect, useState } from 'react';
import { GatherList } from './../../API/GatherAPI';
import { useNavigate } from 'react-router-dom';



const GatherHome = () => {
  const [gathers, setGathers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const Navigate = useNavigate()

  const Createbutton = () => {
    Navigate('/gather/create')
  }

  useEffect(() => {
    const fetchGathers = async () => {
      const res = await GatherList({page: currentPage, size: 10})
      console.log(res.data.boardRecruitRes)
      setGathers(res.data.boardRecruitRes)
    }
    fetchGathers()
  }, [currentPage])

  return (
    <div>
      <p>GatherHome</p>
      <button onClick={Createbutton}>작성</button>
      <ul>
        {gathers.map((gather) => (
          <li key={gather.gatherIdx}>
            <p>{gather.title}</p>
            <p>{gather.content}</p>
            <p>{gather.createdAt}</p>
            <p>{gather.updatedAt}</p>
            <p>{gather.nickname} </p>
            <p>{gather.boardIdx}</p>
          </li>
        ))}
        </ul>
        <p>내가 작성한 공고 : 어떻게 하지 ?</p>
        <p>내가 선호할 만한 사람 : 나랑 동일한 장르 사람 보여주기 ? </p>
        <p>나를 찾는 공고 : 게시글 - 내 포지션과 내 선호장르가  들어있는 글</p>
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