import { useNavigate, useParams } from "react-router-dom";
import { BoardDetail, GetComment, CreateComment, BoardDelete, CommentDelete, BoardLike } from "../../API/BoardAPI";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useStore from "../../status/store";
import { checkBoardLike } from './../../API/BoardAPI';
import { GoHeart, GoHeartFill, GoBell } from "react-icons/go";
import { FaRegClock } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import profile from '../../assets/images/test.jpg';


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

  const goHome = async () => {
    Navigate('/community')
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
      likeNum,
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
      <div className="header">
        {data && (
          <>
          <div className="title">
            <h1>{title}</h1>
            <IoMdArrowRoundBack size='30' className="back-btn" onClick={goHome}/>
          </div>
          <div>
            <div className="profile">
              <img src={profile} alt="" className="image"/>
              <h3>{nickname}</h3>
              <div className="info">
                <div className="registdate">
                  <FaRegClock className="icon"/>
                  {registDate}
                </div>
                <div className="viewCount">
                  <LuEye className="icon" size='20' />
                  {viewNum}
                </div>
                <p>
                  최근 수정 {updateDate}
                </p>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
      <hr />
      {data && (
      <>
        <div className="content-box">
          <div className="content">
            <p>{content}</p>
          </div>
          <br />
          <br />
          <div className="edit-del">
            {userIdx === currentUserIdx  && (<span><FaTrashAlt onClick={postDeleteHanlder} className="icon"/>삭제</span>)}
            {userIdx === currentUserIdx  && (<span><MdEdit onClick={postEditHanlder} className="icon"/>수정</span>)}
          </div>
        </div>
        <span>
          {likeNum}
          {isLiked ? <span><GoHeartFill onClick={BoardLikeHandler} className="icon"/>좋아요 취소</span> :     
            <span><GoHeart onClick={BoardLikeHandler} className="icon"/>좋아요</span>}
        </span>
        <div className="comment-title">
          <GoBell className="icon"/>
          댓글
        </div>
        <hr key='' />
      </>
      )}
      <div className="comment-list">
        <ul>
          {comments && comments.length > 0? (
            comments.reverse().map((comment)=> {
              return (
                <>
                <br />
                  <li key={comment.commentIdx}>
                    <div>
                      {comment.nickname}
                    </div>
                    <div className="comment-date">
                      {comment.registDate}
                    </div>
                    <div>
                      {comment.content}
                      {comment.userIdx === currentUserIdx &&
                        <FaTrashAlt 
                          onClick={() => CommentDeleteHandler(comment.commentIdx)}
                        >
                          삭제
                        </FaTrashAlt>
                      }
                    </div>
                    <br />
                    <hr />
                  </li>
                </>
              )
            })
          ) : ( <p>댓글없음</p> )}
        </ul>
      </div>

      <form action="" onSubmit={handleSubmit} className="comment">
        <input type="text" name="" id=""
          onChange={hanleUserInput}
          value={userInput}
          className="input"
          placeholder="댓글을 입력해주세요"
        />
        <input type="submit" value="등 록" className="button"/>
      </form>
    </MainDiv>
  );
}

export default CommunityDetail;

const MainDiv = styled.div`
  margin-top: 5%;
  padding: 1rem;

  .content-box {
    position: relative;
  }

  .back-btn {
    background-color: #6C7383;
    border-radius: 10px;
    width: 3rem;
  }

  .title {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
  }

  .profile {
    display: flex;
  }

  .image {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 1rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    
  }

  .info > p {
    color: gray;
  }

  .header {
    margin: 5px;
    display: flex;
    flex-direction: column;
  }

  .content {
    font-size: large;
    padding: 2rem 0;
  }

  .icon {
    margin-right: 0.5rem;
  }

  .registdate {
    display: flex;
  }

  .viewCount {
    display: flex;
  }

  .comment-title {
    margin-top: 2rem;
    margin-bottom: 10px;
  }

  .comment {
    background-color: #202C44;
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin-top: 1rem;
  }

  .comment-date {
    color: gray;
  }

  .input {
    background-color: #202C44;
    border: none;
    height: 2.5rem;
    color: white;
    flex-grow: 1;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .button {
    background-color: #254EF8;
    border: none;
    margin-right: 1rem;
    width: 3.5rem;
    height: 2rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  .edit-del {
    display: flex;
    flex-direction: column;
    color: gray;
  }
`;
