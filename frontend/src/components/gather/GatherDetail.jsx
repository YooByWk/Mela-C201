import React from "react";

import styled from "styled-components";

import { useEffect, useState } from "react";
import { RecruitDetail } from "../../API/GatherAPI";
import useStore from "../../status/store";
import { useNavigate, useParams } from "react-router-dom";
import { GetComment, CreateComment,BoardDelete, CommentDelete, checkBoardLike, BoardLike} from "../../API/BoardAPI";

const GatherDetail = () => {
  const [data, setData] = useState(null);
  const { gatherIdx } = useParams();
  const [comments, setComments] = useState(null);
  const [likeCount, setLikeCount] = useState(0)
  const [userInput, setUserInput] = useState("");
  const Navigate = useNavigate();
  const currentUserIdx = Number(localStorage.getItem("userIdx"));
  const [boardIndex, setBoardIndex] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    const detailData = async () => {
      const response = await RecruitDetail({ gatherIdx });
      setData(response.data);
      setBoardIndex(response.data.boardIdx);
      setLikeCount(response.data.likeNum);
      console.log(response.data, currentUserIdx,'온갖체크')
      setIsAuthor(response.data.userIdx === currentUserIdx)
    };
    detailData();
  }, [gatherIdx,likeCount]);

useEffect(() => {
    const getComments = async () => {
      if (boardIndex) { // boardIndex가 존재할 때만 댓글을 가져옴
        const Comments = await GetComment({boardIdx: boardIndex});
        setComments(Comments.data);

      }
    };
    getComments();
  }, [boardIndex])

  const hanleUserInput = async (event) => {
    setUserInput(event.target.value);
    console.log(userInput);
  }

  const commentDeleteHandler = async (commentIdx) => {
    try {
      console.log(commentIdx);
      await CommentDelete({ boardIdx: boardIndex, commentIdx });
      console.log("삭제중");
      const response = await GetComment({ boardIdx: boardIndex });
      setComments(response.data);
    }
    catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInput.length < 1) {
      window.alert("댓글을 입력해주세요");
      return;
    }
    await CreateComment({ boardIdx: boardIndex, content: userInput });
    setUserInput("");
    const Comments = await GetComment({ boardIdx: boardIndex });
    setComments(Comments.data);
    setUserInput("");
  }

  const deleteHandler = async (e) => {
    e.preventDefault();
    const Check = window.confirm("삭제하시겠습니까?");
    if (Check) {
      const response = await BoardDelete({ boardIdx: boardIndex });
      if (response.status === 200) {
        Navigate("/gather");
        window.alert("삭제되었습니다");
      }
    }
  }


  const [isLiked, setIsLiked] = useState(null)
  useEffect (()=> {
    if (currentUserIdx === null) { return}
    if (boardIndex === null) {return}
    const Likecheck = async() => {
      const res = await checkBoardLike({boardIdx:boardIndex, currentUserIdx})
      if (res.data.message ==='true') {
        setIsLiked(false)
      } else {
        setIsLiked(true)
      }
    }
    Likecheck()
    console.log(isLiked, "좋아요 확인")
  }, [boardIndex, currentUserIdx])


  const BoardLikeHandler = async ()=> {
    const res = await BoardLike({boardIdx:boardIndex, currentUserIdx })
    setLikeCount(res.data.likeNum)
    setIsLiked(!isLiked)
  }

  ////////////
  if (data) {
  return (
    <DetailMain>
    <button onClick={()=>{console.log(currentUserIdx)}}>asdf</button>
      <button onClick={() => console.log(isAuthor,boardIndex,comments, "작성자 확인")}>
        작성자 확인
      </button>
     {isAuthor && <button onClick={() => Navigate(`../edit/${gatherIdx}`)}>수정</button> }
     {isAuthor && <button onClick={deleteHandler}>삭제 </button>}
     {isLiked ? <button onClick={BoardLikeHandler}>좋아요</button> :     
        <button onClick={BoardLikeHandler}> 좋아요 취소</button>
      }      

      <hr />
      <h1>GatherDetail</h1>
      <p>글 번호 : {gatherIdx}</p>
      <h1>제목 : {data.title}</h1>
      <h3>작성자 : {data.nickname}</h3>
      <h3>내용 : {data.content}</h3>
      <h3>게시일 : {data.registDate}</h3>
      <h3>마감일 : {data.endDate}</h3>
      {data.genreName1 && <h3># {data.genreName1}</h3>}
      {data.genreName2 && <h3># {data.genreName2}</h3>}
      {data.genreName3 && <h3># {data.genreName3}</h3>}
      <h3>{data.positions}</h3>
      <hr />
      <h1>포지션 번호</h1>
      {data.positions.length > 1 &&
      data.positions.map((position, i) => {
        i = i + 1;
        return  <span>{i} : {position}</span>;
      })}
      <p>좋아요 : {likeCount}</p>
      <div>
      <hr />
        <p>댓글 : <span>{comments && comments.length}개</span></p>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={hanleUserInput}
            placeholder="댓글을 입력해주세요"
          />
          <button type="submit">등록</button>
        </form>
      </div>
      <div>
        {comments && comments.map((comment) => {
          return (
            <div key={comment.commentIdx}>
              <h3>{comment.nickname}</h3>
              <p>{comment.content}</p>
              <p>{comment.registDate}</p>
              <button onClick={()=>commentDeleteHandler(comment.commentIdx)}>삭제</button>
            </div>
          );
        })}
      </div>
    </DetailMain>
  );}
  else {
    return <div><p>로딩중</p></div>;
  }
};

export default GatherDetail;

const DetailMain = styled.div`
  padding-top: 15px ;
`