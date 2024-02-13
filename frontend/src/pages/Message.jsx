import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { RiMessage2Line } from "react-icons/ri";
import { ChatList, CreateChat, EnterChat } from "../API/ChatAPI";
import moment from "moment";
import useStore from "../status/store";
import { useParams } from "react-router-dom";

let sock;
let ws;

function Message() {
  const { roomid } = useParams();
  const [chatRooms, setChatRooms] = useState([]);
  const [roomIdx, setRoomIdx] = useState("");
  const [userIdx, setUserIdx] = useState("");
  const [otheruserid, setOtheruserid] = useState();
  const user = useStore((state) => state.user);

  useEffect(() => {
    useStore.getState().fetchUser();
    findAllRooms();
  }, []);

  const findAllRooms = async () => {
    try {
      const response = await ChatList();
      console.log("findAllRooms : ", response);
      setChatRooms(response);
      console.log("response chatRooms: ", chatRooms);
    } catch (err) {
      console.log(err);
    }
  };

  const createRoom = async () => {
    if (otheruserid === "") {
      alert("방 제목을 입력해 주세요.");
      return;
    } else {
      try {
        const response = await CreateChat({ otheruserid: otheruserid });
        console.log(response);
        setOtheruserid("");
        findAllRooms();
      } catch (err) {
        console.log(err);
        alert("채팅방 개설에 실패하였습니다.");
      }
    }
  };

  const enterRoom = (roomIdx) => {
    // const userIdx = prompt("대화명을 입력해 주세요.");
    if (user) {
      setUserIdx(localStorage.getItem("userIdx"));
      localStorage.setItem("wschat.userIdx", userIdx);
      localStorage.setItem("wschat.roomIdx", roomIdx);
      setRoomIdx(roomIdx);
    }
  };

  const [room, setRoom] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  let reconnect = 0;
  const params = useParams();
  useEffect(() => {
    console.log("params: ", params);
    console.log("params.roomid: ", params.roomid);

    setRoomIdx(params.roomid);
    setUserIdx(localStorage.getItem("wschat.userIdx"));

    console.log("roomidx : ", roomIdx);

    findRoom();
    connect();
  }, []);

  const findRoom = async (roomIdx) => {
    try {
      const response = await EnterChat(roomIdx);
      setRoom(response);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = () => {
    console.log("ws.connected: " + ws.connected);
    console.log("roomIDx : ", roomIdx);

    if (ws && ws.connected && message.trim() !== "") {
      ws.send("/pub/chat/message", {}, JSON.stringify({ type: "TALK", roomIdx, userIdx, message }));
      setMessage("");
    } else {
      // WebSocket 연결이 설정되지 않은 경우, 메시지를 보낼 수 없음을 사용자에게 알림
      console.error("WebSocket 연결이 설정되지 않았습니다.");
      connect();
    }
  };

  const recvMessage = (recv) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: recv.type,
        userIdx: recv.userIdx,
        message: recv.message,
      },
    ]);
  };

  const connect = () => {
    if (!roomIdx) {
      console.error();
      return;
    }

    sock = new SockJS("//localhost:8080/ws-stomp");
    ws = Stomp.over(sock);

    ws.connect(
      {},
      (frame) => {
        ws.subscribe(`/sub/chat/room/${roomIdx}`, (message) => {
          const recv = JSON.parse(message.body);
          recvMessage(recv);
        });
      },
      (error) => {
        console.error();
        if (reconnect++ < 5) {
          setTimeout(connect, 5000);
        }
      }
    );
  };

  useEffect(() => {
    if (roomIdx) {
      connect();
    }
  }, [roomIdx]);

  return (
    <Container>
      <div className="select-chat">
        <div className="chat-title">
          <h2>{room.name}</h2>
        </div>
        <div className="input-wrppaer">
          <input
            type="text"
            className="input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <div className="button-wrapper">
            <button className="btn" type="button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
        <ul className="list-group">
          {messages.map((message, index) => (
            <li key={index} className="list-item">
              {message.userIdx} - {message.message}
            </li>
          ))}
        </ul>
      </div>
      <div className="room-list">
        <div className="header">
          <RiMessage2Line />
          <h3>Inbox</h3>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="input"
            value={otheruserid}
            onChange={(e) => setOtheruserid(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && createRoom()}
          />
          <div className="button-wrapper">
            <button className="btn" type="button" onClick={createRoom}>
              Create
            </button>
          </div>
        </div>
        <ul className="list-group">
          {chatRooms.map((room) => (
            <li key={room.roomIdx} className="list-item" onClick={() => enterRoom(room.roomIdx)}>
              {room.user.nickname} - {room.lastSendMessage} :{" "}
              {moment(room.lastSendTime).format("YY-MM-DD HH:mm:ss")}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
export default Message;

const Container = styled.div`
  display: flex;
  width: 100%;
  color: white;

  .select-chat {
    flex: 3;
    margin-left: 1rem;
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
  }

  .input-wrapper {
    display: flex;
    margin-top: 1rem;
  }

  .input {
    background-color: #151c2c;
    border: none;
    height: 2rem;
    border-radius: 10px;
    color: white;
  }

  .button-wrapper {
    display: flex;
  }

  button {
    background-color: #254ef8;
    border: none;
    border-radius: 5px;
    height: 2rem;
    color: white;
  }
`;
