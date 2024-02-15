import { useNavigate, useParams } from "react-router-dom";
import {
  BoardDetail,
  GetComment,
  CreateComment,
  BoardDelete,
  CommentDelete,
  BoardLike,
} from "../../API/BoardAPI";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useStore from "../../status/store";
import { checkBoardLike } from "./../../API/BoardAPI";
import { GoHeart, GoHeartFill, GoBell } from "react-icons/go";
import { FaRegClock } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";

function CommunityDetail() {
  const [data, setData] = useState(null);
  const { boardIdx } = useParams();
  const [comments, setComments] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const Navigate = useNavigate();
  const currentUserIdx = Number(localStorage.getItem("userIdx"));

  useEffect(() => {
    const fetchData = async () => {
      if (currentUserIdx !== null) {
        const response = await BoardDetail({ boardIdx });
        setData(response.data);
        const Comments = await GetComment({ boardIdx });
        setComments(Comments.data);
        setLikeCount(response.data.likeNum);
        setCommentCount(Comments.data.length);
      }
    };
    fetchData();
  }, [currentUserIdx, boardIdx]);

  const CommentDeleteHandler = async (commentIdx) => {
    try {
      await CommentDelete({ boardIdx, commentIdx });
      const response = await GetComment({ boardIdx });
      setComments(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    const detailData = async () => {
      const response = await BoardDetail({ boardIdx });
      setData(response.data);
      const Comments = await GetComment({ boardIdx });
      setComments(Comments.data);
      setLikeCount(response.data.likeNum);
      setCommentCount(Comments.data.length);
      // console.log(Comments);
    };
    detailData();
  }, [likeCount, boardIdx]);

  const hanleUserInput = async (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await CreateComment({ boardIdx, content: userInput });
    setUserInput("");
    const Comments = await GetComment({ boardIdx });
    setComments(Comments.data);
    setCommentCount(Comments.data.length);
    setUserInput("");
  };

  const postDeleteHanlder = async (e) => {
    e.preventDefault();
    const Check = window.confirm("삭제하시겠습니까?");
    if (Check) {
      await BoardDelete({ boardIdx });
      Navigate("../");
    }
  };

  const postEditHanlder = (e) => {
    e.preventDefault();
    // console.log()
    Navigate("./edit");
  };

  const goHome = async () => {
    Navigate("/community");
  };

  let idx,
    content,
    nickname,
    registDate,
    title,
    updateDate,
    userIdx,
    viewNum,
    likeNum;
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
  useEffect(() => {
    if (currentUserIdx === null) {
      return;
    }
    const check = async () => {
      const response = await checkBoardLike({ boardIdx, currentUserIdx });
      // console.log("response: ", response);
    };
    check();
  }, [boardIdx, currentUserIdx]);

  useEffect(() => {
    // 유저 누구인지 알 때
    if (currentUserIdx === null) {
      return;
    }
    // console.log("asd", currentUserIdx);
    // 유저가 좋아요를 했는가 확인하고
    const check = async () => {
      // console.log(isLiked);
      const res = await checkBoardLike({ boardIdx, currentUserIdx });
      // console.log(response.data.message==='true')
      if (res.data.message === "true") {
        setIsLiked(true); // 상태 업데이트를 true로 직접 설정
      } else {
        setIsLiked(false); // 상태 업데이트를 false로 직접 설정
      }
    };
    check();
    // 좋아요 했다면 true
    // 아니라면 false
  }, [boardIdx, currentUserIdx]);

  const BoardLikeHandler = async () => {
    const res = await BoardLike({ boardIdx });
    setLikeCount(res.data.likeNum);
    setIsLiked(!isLiked);
  };

  return (
    <MainDiv>
      <div className="header">
        {data && (
          <>
            <div className="title">
              <h1>{title}</h1>
              <IoMdArrowRoundBack
                size="30"
                className="back-btn"
                onClick={goHome}
              />
            </div>
            <div>
              <div className="profile">
                <h3> {nickname}</h3>
                <div className="info">
                  <div className="infoContainer">
                    <div className="infoDate">
                      <div className="registdate">
                        <FaRegClock className="icon" />
                        {registDate}
                      </div>
                      <div className="viewCount">
                        <LuEye className="icon" size="20" />
                        {viewNum}
                      </div>
                    </div>
                    {updateDate ? (
                      <p>최근 수정 {updateDate}</p>
                    ) : (
                      <p> 최근 수정 {registDate} </p>
                    )}
                  </div>
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
              {userIdx === currentUserIdx && (
                <span>
                  <FaTrashAlt onClick={postDeleteHanlder} className="icon" />
                  삭제
                </span>
              )}
              {userIdx === currentUserIdx && (
                <span>
                  <MdEdit onClick={postEditHanlder} className="icon" />
                  수정
                </span>
              )}
            </div>
          </div>
          <LikeContainer>
            {isLiked ? (
              <span>
                <GoHeartFill onClick={BoardLikeHandler} className="icon" />
              </span>
            ) : (
              <span>
                <GoHeart onClick={BoardLikeHandler} className="icon" />
              </span>
            )}
            {likeCount}
          </LikeContainer>
          <div className="comment-title">
            <GoBell className="icon" />
            <span>댓글</span>
            <div className="comment-count">{comments && comments.length}</div>
          </div>
          <hr key="" />
        </>
      )}
      <form action="" onSubmit={handleSubmit} className="comment">
        <input
          type="text"
          name=""
          id=""
          onChange={hanleUserInput}
          value={userInput}
          className="input"
          placeholder="댓글을 입력해주세요"
        />
        <input type="submit" value="등 록" className="button" />
      </form>
      <div className="comment-list">
        <ul>
          {comments && comments.length > 0 ? (
            comments.reverse().map((comment) => {
              return (
                <>
                  <br />
                  <li key={comment.commentIdx}>
                    <div>{comment.nickname}</div>
                    <div className="comment-date">{comment.registDate}</div>
                    <CommentContainer>
                      <div>{comment.content}</div>
                      {comment.userIdx === currentUserIdx && (
                        <div>
                          <FaTrashAlt
                            onClick={() =>
                              CommentDeleteHandler(comment.commentIdx)
                            }
                          />
                        </div>
                      )}
                    </CommentContainer>
                    <br />
                    <hr />
                  </li>
                </>
              );
            })
          ) : (
            <p>댓글없음</p>
          )}
        </ul>
      </div>


    </MainDiv>
  );
}

export default CommunityDetail;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainDiv = styled.div`
  margin-top: 5%;
  padding: 1rem;

  .content-box {
    position: relative;
  }

  .back-btn {
    background-color: #6c7383;
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
    flex-direction: row;
    justify-content: space-between;
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
    display: flex;
    margin-top: 2rem;
    margin-bottom: 10px;
    align-items: center;
  }

  .infoContainer {
    display: flex;
    flex-direction: column;
    & > p {
      color: grey;
    }
  }
  .infoDate {
    display: flex;
    & > div {
      margin-right: 1rem;
    }
  }

  .comment {
    background-color: #202c44;
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin-top: 1rem;
  }

  .comment-count {
    margin-left: 0.5rem;
    border: 3px solid #254ef8;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .comment-date {
    color: gray;
  }

  .input {
    background-color: #202c44;
    border: none;
    height: 2.5rem;
    color: white;
    flex-grow: 1;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .button {
    background-color: #254ef8;
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

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #3c61f6;
  font-size: 1.5rem;
  .icon {
    margin-right: 0.5rem;
  }
`;
