import { useNavigate, useParams } from "react-router-dom";
import { BoardDetail, GetComment, CreateComment, BoardDelete, CommentDelete, BoardLike } from "../../API/BoardAPI";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useStore from "../../status/store";
import { checkBoardLike } from './../../API/BoardAPI';

function CommunityDetail() {
  const [data, setData] = useState(null);
  const { boardIdx } = useParams();
  const [comments, setComments] = useState(null);
  const [isLiked, setIsLiked] = useState(null)
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
      // console.log(Comments);
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
    if (Check) { await BoardDelete({boardIdx})
    Navigate('../')
    } 
  }
  const postEditHanlder= (e) => {
    e.preventDefault()
    // console.log()
    Navigate('./edit')
  }

  let idx, content, nickname, registDate, title, updateDate, userIdx, viewNum, likeNum;
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
      likeNum
    } = data);
  } 
  useEffect (()=> {
    if (currentUserIdx === null) {return}
      const check = async () => {
        const response = await checkBoardLike({boardIdx,currentUserIdx})
        console.log('response: ', response);
      }
      check()
    }, [boardIdx, currentUserIdx])

    useEffect(() => {
      // 유저 누구인지 알 때
      if (currentUserIdx === null) {return}
      // 유저가 좋아요를 했는가 확인하고
      const check = async ()=> {
        console.log(isLiked)
        const res = await checkBoardLike({boardIdx,currentUserIdx})
        // console.log(response.data.message==='true')
        if (res.data.message === 'true') {
          setIsLiked(false) // 상태 업데이트를 true로 직접 설정
        } else {
          setIsLiked(true) // 상태 업데이트를 false로 직접 설정
        }
      }    
      check()
      // 좋아요 했다면 true
      // 아니라면 false
    }, [boardIdx, currentUserIdx])
  const [likeCount, setLikeCount] = useState(0);
  const BoardLikeHandler = async ()=> {
    const res = await BoardLike({boardIdx})
    setLikeCount(res.data.likeNum)
    setIsLiked(!isLiked)
  }
  return (
    <MainDiv>
      <hr />
      {isLiked ? <button onClick={BoardLikeHandler}>좋아요</button> :     
        <button onClick={BoardLikeHandler}> 좋아요 취소</button>
      }      

      
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
          <p>좋아요 : {likeNum}</p>
          {userIdx === currentUserIdx  && (<button onClick={postDeleteHanlder}>삭제</button>)}
          {userIdx === currentUserIdx  && (<button onClick={postEditHanlder}>수정</button>)}
        </>
      )}
      <hr key='' />
      댓글
      <ul>
        {comments && comments.length > 0? (
comments.reverse().map((comment)=> {
  return (
    <li key={comment.commentIdx}>
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
