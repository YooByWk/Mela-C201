import { useNavigate, useParams } from "react-router-dom";
import { BoardDetail, GetComment, CreateComment, BoardDelete, CommentDelete } from "../../API/BoardAPI";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useStore from "../../status/store";

function CommunityDetail() {
  const [data, setData] = useState(null);
  const { boardIdx } = useParams();
  const [comments, setComments] = useState(null);
  // const CommentDelete = useStore(s => s.CommentDelete)
  const [userInput, setUserInput] = useState("");
  const Navigate = useNavigate()
  const currentUserIdx = useStore(s => s.user ? s.user.userIdx : null)
  
  const CommentDeleteHandler = async (commentIdx) => {
    try {
      console.log(commentIdx)
      await CommentDelete({ boardIdx, commentIdx });
      console.log('삭제중')
      const response = await GetComment({ boardIdx });
      setComments(response.data);
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    }
  }

  useEffect(() => {
    const detailData = async () => {
      const response = await BoardDetail({ boardIdx });
      setData(response.data);
      const Comments = await GetComment({ boardIdx });
      setComments(Comments.data);
      console.log(Comments);
    };
    detailData();
  }, []);

  const hanleUserInput = async (event) => {
    setUserInput(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    await CreateComment({ boardIdx, content: userInput });
    setUserInput("");
    const Comments = await GetComment({ boardIdx }); 
    setComments(Comments.data);
    setUserInput('')
  };
  
  const postDeleteHanlder = async (e) => {
    e.preventDefault()
    const Check = window.confirm('삭제하시겠습니까?')
    if (Check) { const response = await BoardDelete({boardIdx})
    Navigate('../')
  } 
  }
  const postEditHanlder= (e) => {
    e.preventDefault()
    // console.log()
    Navigate('./edit')
  }
  // 댓글삭제
  // 게시글 삭제


  let idx, content, nickname, registDate, title, updateDate, userIdx, viewNum;

  if (data) {
    ({
      idx,
      content,
      nickname,
      registDate,
      title,
      updateDate,
      userIdx,
      viewNum,
    } = data);
    // console.log(data)
  }
  if (comments) {
    // console.log(comments,'ㅁㄴㅇ')
  }
  return (
    <MainDiv>
      <hr />
      <button> 좋아요</button>
      <button> 좋아요 취소</button>
      
      <p>해당 글의 인덱스</p>
      {data && (
        <>
          <p>idx : {boardIdx}</p>
          <p>content : {content}</p>
          <p>nickname : {nickname}</p>
          <p>registDate : {registDate}</p>
          <p>title : {title}</p>
          <p>updateDate : {updateDate}</p>
          <p>userIdx : {userIdx}</p>
          <p>조회수 : {viewNum}</p>
          {userIdx === currentUserIdx  && (<button onClick={postDeleteHanlder}>삭제</button>)}
          {userIdx === currentUserIdx  && (<button onClick={postEditHanlder}>수정</button>)}
        </>
      )}
      <hr />
      댓글
      <ul>
        {comments && comments.length > 0? (
comments.reverse().map((comment)=> {
  {/* console.log(comment.commentIdx,'코멘트') */}
  return (
    <li >
      작성자 :{comment.nickname} ||
      내용 : {comment.content}
      작성일 : {comment.registDate}
      {comment.userIdx === currentUserIdx &&
        <button onClick={() => CommentDeleteHandler(comment.commentIdx)}>삭제</button> }
    </li>
  )
})
        )
        : (
          <p>댓글없음</p>
        )
        }
      </ul>

      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="" id="" onChange={hanleUserInput} value={userInput} />
        <input type="submit" value="댓글달기" />
      </form>
    </MainDiv>
  );
}

export default CommunityDetail;

const MainDiv = styled.div`
  margin-top: 5%;

`;
