import { useParams } from "react-router-dom";
import { BoardDetail, GetComment, CreateComment } from "../../API/BoardAPI";
import styled from "styled-components";
import { useEffect, useState } from "react";

function CommunityDetail() {
  const [data, setData] = useState(null);
  const { boardIdx } = useParams();
  const [comments, setComments] = useState(null);
  const [userInput, setUserInput] = useState("");

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
  // 댓글삭제
  // 게시글 삭제
  // 게시글 수정
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
  }
  if (comments) {
    console.log(comments,'ㅁㄴㅇ')
  }
  return (
    <MainDiv>
      <hr />
      <p>해당 글의 인덱스</p>
      {data && (
        <>
          <p>idx : {idx}</p>
          <p>content : {content}</p>
          <p>nickname : {nickname}</p>
          <p>registDate : {registDate}</p>
          <p>title : {title}</p>
          <p>updateDate : {updateDate}</p>
          <p>userIdx : {userIdx}</p>
          <p>조회수 : {viewNum}</p>
        </>
      )}
      <hr />
      댓글
      <ul>
        {comments && comments.length > 0? (
          comments.reverse().map((comment)=> {
            return (
              <li key={comment.commentidx}>
                작성자 :{comment.nickname} ||
                내용 : {comment.content}
                작성일 : {comment.registDate}
                <button>삭제</button> /////////// 작업
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
