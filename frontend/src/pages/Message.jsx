import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { RiMessage2Line } from "react-icons/ri";
import { ChatList, CreateChat, EnterChat } from "../API/ChatAPI";


function Message () {
  const [roomName, setRoomName] = useState("")
  const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
    findAllRooms()
  }, [])

  const findAllRooms = async () => {
    try {
      const response = await ChatList()
      setChatRooms(response)
    } catch (err) {
      console.log(err)
    }
  }

  const createRoom = async (otherUserIdx) => {
    if (roomName === "") {
      alert("방 제목을 입력해 주세요.")
      return
    } else {
      try {
        await CreateChat({ otherUserIdx })
        setRoomName('')
        findAllRooms()
      } catch (err) {
        console.log(err)
        alert("채팅방 개설에 실패하였습니다.")
      }
    }
  }

  const enterRoom = (roomIdx) => {
    const userIdx = prompt("대화명을 입력해 주세요.");
    if (userIdx !== "") {
      localStorage.setItem("wschat.userIdx", userIdx)
      localStorage.setItem("wschat.roomIdx", roomIdx)
    }
  }

  // -----------------------
  const [roomIdx, setRoomIdx] = useState("");
  const [room, setRoom] = useState({});
  const [userIdx, setUserIdx] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  let sock = new SockJS("//localhost:8080/ws-stomp");
  let ws = Stomp.over(sock);
  let reconnect = 0;

  useEffect(() => {
    setRoomIdx(localStorage.getItem("wschat.roomIdx"))
    setUserIdx(localStorage.getItem("wschat.userIdx"))
    findRoom()
    connect()
  }, [])

  const findRoom = async (roomIdx) => {
    try {
      const response = await EnterChat(roomIdx)
      setRoom(response)
    } catch (err) {
      console.log(err)
    }
  }

  const sendMessage = () => {
    console.log("ws.connected: " + ws.connected);
    console.log("ws.connected: " + ws.connected);

    if (ws && ws.connected) {
      ws.send("/pub/chat/message", {}, JSON.stringify({ type: "TALK", roomIdx, userIdx, message }));
      setMessage("")
    } else {
      // WebSocket 연결이 설정되지 않은 경우, 메시지를 보낼 수 없음을 사용자에게 알림
      console.error("WebSocket 연결이 설정되지 않았습니다.")
      connect()
    }
  }

  const recvMessage = (recv) => {
    setMessages([
      {
        type: recv.type,
        userIdx: recv.type === "ENTER" ? "[알림]" : recv.userIdx,
        message: recv.message,
      },
      ...messages,
    ])
  }

  const connect = () => {
    sock = new SockJS("//localhost:8080/ws-stomp")
    ws = Stomp.over(sock)

    ws.connect({}, (frame) => {
        ws.subscribe(`/sub/chat/room/${roomIdx}`, (message) => {
          const recv = JSON.parse(message.body);
          recvMessage(recv);
        })
        ws.send(
          "/pub/chat/message",
          {},
          JSON.stringify({ type: "TALK", roomIdx, userIdx, message })
        )
        setMessage("")
      },
      (error) => {
        if (reconnect++ <= 5) {
          setTimeout(() => {
            console.log("connection reconnect");
            connect()
          }, 10 * 1000)
        }
      }
    )

    console.log("connect()!!!" + ws.connected)
  }

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
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
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
            <li
              key={room.roomIdx}
              className="list-item"
              onClick={() => enterRoom(room.roomIdx)}
            >
              {room.name}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export default Message


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
    background-color: #202C44;
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
    background-color: #151C2C;
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
`