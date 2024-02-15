// Chatting.jsx
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { fetchUser } from "../API/UserAPI";
import moment from "moment";
import { EnterChat } from "../API/ChatAPI";

let sock;
let ws;

export const Chatting = (props) => {
  const [messages, setMessages] = useState([]);
  const [userIdx, setUserIdx] = useState("");
  const [message, setMessage] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [roomIdx, setRoomIdx] = useState("");
  const [otheruserid, setOtheruserid] = useState();
  const [room, setRoom] = useState({});
  const [nickname, setNickname] = useState("");
  let reconnect = 0;

  useEffect(() => {
    setRoomIdx(props.roomIdx);
    setUserIdx(localStorage.getItem("userIdx"));
    loadMessages();

    if (ws && ws.connect) {
      // console.log("disconnect!!!!!");
      ws.disconnect();
      connect();
    }
  }, [props.roomIdx]);

  useEffect(() => {
    // console.log("chatting useeffect");
    setRoomIdx(props.roomIdx);
    setUserIdx(localStorage.getItem("userIdx"));
    loadMessages();

    connect();

    const userInfo = async () => {
      try {
        const res = await fetchUser();
        setNickname(res[0].nickname);
      } catch (err) {
        // console.log(err);
      }
    };
    userInfo();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await EnterChat({ roomid: props.roomIdx });
      // console.log("loadMessages : ", response);

      setMessages(response);

      // console.log("response chatRooms: ", messages);
    } catch (err) {
      // console.log(err);
    }
  };

  const connect = () => {
    // sock = new SockJS(process.env.REACT_APP_API_URL2 + "/ws-stomp");
    sock = new SockJS("/ws-stomp");
    ws = Stomp.over(sock);

    // console.log("ws:: ", ws);

    ws.connect(
      {},
      (frame) => {
        // console.log("ws.connect!!");
        setTimeout(() => {
          ws.subscribe(`/sub/chat/room/${props.roomIdx}`, (message) => {
            // console.log("subscribe!!!!");
            const recv = JSON.parse(message.body);
            recvMessage(recv);
          });
        }, 100);
      },
      (error) => {
        console.error();
        if (reconnect++ < 5) {
          setTimeout(connect, 1000);
        }
      }
    );
  };

  const sendMessage = () => {
    // console.log("ws.connected: ", ws.connected);
    // console.log("roomIDx : ", props.roomIdx);

    if (ws && ws.connected && message.trim() !== "") {
      ws.send(
        "/pub/chat/message",
        {},
        JSON.stringify({ type: "TALK", roomIdx, userIdx, message, nickname })
      );
      setMessage("");
    } else {
      // WebSocket 연결이 설정되지 않은 경우, 메시지를 보낼 수 없음을 사용자에게 알림
      console.error("WebSocket 연결이 설정되지 않았습니다.");
      connect();
    }
  };

  const recvMessage = (recv) => {
    // console.log("recvMesage!!!!!", recv);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: recv.type,
        userIdx: recv.userIdx,
        message: recv.message,
        nickname: recv.nickname,
      },
    ]);
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지가 추가될 때마다 스크롤을 아래로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Container>
        <div className="chat-title">
          <span>Message from </span>
          <span className="recvUser">{props.recvUser}</span>
        </div>
        <div className="message-list">
          <ul className="list-group">
            {messages.map((msg, index) => (
              <li key={index} className="list-item">
                {msg.nickname === nickname ? (
                  <>
                    <span className="list-item-message-time">
                      {moment(msg.sendTime).format("MM/DD HH:mm")}
                    </span>
                    <div className="list-item-message-my">{msg.message}</div>{" "}
                  </>
                ) : (
                  <>
                    <div className="list-item-message">
                      {/* <div className="userName">{msg.nickname}</div> */}
                      {msg.message}
                    </div>{" "}
                    <span>{moment(msg.sendTime).format("MM/DD HH:mm")}</span>
                  </>
                )}
              </li>
            ))}
            <div ref={messagesEndRef}></div>
          </ul>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="메시지를 입력해주세요."
            className="input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn" type="button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .message-list {
    max-height: 70vh;
    overflow-y: auto;
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar {
    // display: none;
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }

  .chat-title {
    margin-bottom: 1rem;
    font-size: x-large;
  }

  .list-item {
    display: flex;
    flex-direction: col;
    align-items: flex-end;
    margin: 1rem;
  }

  .list-item-message {
    background: linear-gradient(90deg, #873ffa 28.25%, #254ef8 94.99%);
    padding: 20px;
    width: 50%;
    border-radius: 20px;
    margin-right: 1rem;
  }

  .list-item-message-my {
    background-color: #202c44;
    padding: 20px;
    width: 50%;
    border-radius: 20px;
    margin-left: 1rem;
  }

  .list-item-message-time {
    margin-left: auto;
  }

  .userName {
    font-weight: bold;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  .recvUser {
    color: #757575;
  }

  .input-wrapper {
    display: flex;
    margin-top: 1rem;
    color: white;
    background-color: #202c44;
    border-radius: 10px;
    align-items: center;
  }

  .input {
    flex: 1;
    padding: 10px;
    border: none;
    height: 2rem;
    border-radius: 10px;
    margin-right: 10px;
    width: 90%;
    background-color: transparent;
    color: white;
  }

  button {
    background-color: #254ef8;
    border: none;
    border-radius: 5px;
    height: 2rem;
    color: white;
    width: 4rem;
    margin-right: 10px;

    &:hover {
      background-color: #1a349a;
      cursor: pointer;
    }
  }
`;
