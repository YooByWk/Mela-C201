// Message.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RiMessage2Line } from "react-icons/ri";
import { ChatList, EnterChat } from "../API/ChatAPI";
import moment from "moment";
import useStore from "../status/store";
import { useParams } from "react-router-dom";
import { Chatting } from "../components/Chatting";
import { getImg } from "../API/FileAPI";
import defaultProfile from "../assets/images/default-profile.png"

function Message() {
  const { roomid } = useParams();
  const [chatRooms, setChatRooms] = useState([]);
  const [roomIdx, setRoomIdx] = useState("");
  const [userIdx, setUserIdx] = useState("");
  const [otheruserid, setOtheruserid] = useState();
  const [room, setRoom] = useState({});
  const [otherNickname, setOtherNickname] = useState("");

  // const [userValue, setUserValue] = useState('')
  // const [myProfile, setMyProfile] = useState('')
  // const [otherValue, setOtherValue] = useState('')
  // const [otherProfile, setOtherProfile] = useState('')
  const [imgUrl, setImgUrl] = useState([])
  const user = useStore((state) => state.user);

  useEffect(() => {
    useStore.getState().fetchUser();
    findAllRooms();

    // const fetch = async() => {
    //   try {
    //     const myinfo = await fetchUser()
    //     setUserValue(myinfo)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  }, []);

  const findAllRooms = async () => {
    try {
      const response = await ChatList();
      // console.log("findAllRooms : ", response);
      setChatRooms(response);

      // const otherInfos = response.map(async (room) => {
      //   const res = await othersInfo(room.user.emailId)
      //   setOtherValue(res)
      //   setOtherProfile(res[1])
      // })
    } catch (err) {
    }
  };

  useEffect(() => {
    const imgInfo = async () => {
      const result = []
      try {
        for (let index = 0; index < chatRooms.length; index++) {
          if (chatRooms[index].portfolioAbstract.portfolio_picture_file_idx) {
            const response = await getImg(chatRooms[index].portfolioAbstract.portfolio_picture_file_idx)
            result.push(response.message)
          } else {
            result.push(defaultProfile)
          }
        }
        // console.log(result)
        setImgUrl(result)
      } catch (err) {
      }
    }
    imgInfo()
  },[userIdx])

  // if (res[1].portfolio_picture_file_idx) {
  //   const imginfo = await getImg(res[1].portfolio_picture_file_idx.fileIdx)
  //   setOtherProfile(imginfo)
  // } else {
  //   setImgUrl(defaultprofile)
  // }

  // const imgURL = async (fileIdx) => {
  //   try {
  //     const response = await getImg(fileIdx)
  //     setImgUrl(response.message)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const enterRoom = (roomIdx, nickname) => {
    if (user) {
      setUserIdx(localStorage.getItem("userIdx"));
      setRoomIdx(roomIdx);
      // console.log("학인 ", nickname);
      setOtherNickname(nickname);
    }
  };

  useEffect(() => {
    setUserIdx(localStorage.getItem("wschat.userIdx"));
    // console.log("roomidx : ", roomIdx);
  }, []);

  // console.log(room.user)
  return (
    <Container>
      {roomIdx ? (
        <div className="chatting-wrapper">
          <Chatting roomIdx={roomIdx} recvUser={otherNickname} />
        </div>
      ) : (
        <div className="chatting-wrapper"></div>
      )}
      <div className="room-list">
        <div className="header">
          <div className="icon">
            <RiMessage2Line />
          </div>
          <h3>Inbox</h3>
        </div>
        {chatRooms.length >= 1 ? (
          <Chat>
            <ul className="list-group">
              {chatRooms.map((room) => (
                <li
                  key={room.roomIdx}
                  className="list-item"
                  onClick={() => enterRoom(room.roomIdx, room.user.nickname)}
                >
                  {room.lastSendMessage ? (
                    <>
                      <div>
                        {imgUrl.map((img) => (
                          <Img key={img} src={img} alt="프로필 이미지"/>
                        ))}
                        <div className="user">{room.user.nickname}</div>
                        <div className="message">
                          <p>{room.lastSendMessage}</p>
                          <p style={{ color: "gray" }}>
                            {moment(room.lastSendTime).format(
                              "YY-MM-DD HH:mm:ss"
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="user">{room.user.nickname}</div>
                        <div className="message-not">
                          <p>아직 대화를 시작하지 않았습니다.</p>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </Chat>
        ) : (
          <p>현재 채팅 중인 방이 없습니다.</p>
        )}
      </div>
    </Container>
  );
}
export default Message;

const Container = styled.div`
  display: flex;
  width: 100%;
  color: white;

  .chatting-wrapper {
    flex: 3;
    padding: 20px;
  }

  .room-list {
    flex: 1;
    background-color: #202c44;
    padding: 20px;
    border-radius: 20px;
    margin-right: 1rem;
  }

  .header {
    display: flex;
    margin-bottom: 2rem;
    align-items: center;
    font-weight: bold;
  }

  .icon {
    margin-right: 1rem;
  }
`;

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  // height: 5rem;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  // &:hover {
  //   background-color: #151c2c;
  //   color: white;
  //   border-radius: 10px;
  //   cursor: pointer;
  // }

  .user {
    font-weight: bold;
    font-size: large;
  }

  .message-not {
    margin-top: 0.5rem;
    color: gray;
  }

  .message {
    margin-top: 0.5rem;
  }
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`
