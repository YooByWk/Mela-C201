import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { fetchUser } from '../API/UserAPI';
import moment from "moment";
import { EnterChat } from "../API/ChatAPI";

let sock
let ws

export const Chatting = props => {
    const [messages, setMessages] = useState([])
    const [userIdx, setUserIdx] = useState("");
    const [message, setMessage] = useState("")
    const [chatRooms, setChatRooms] = useState([]);
    const [roomIdx, setRoomIdx] = useState("");
    const [otheruserid, setOtheruserid] = useState();
    const [room, setRoom] = useState({});
    const [nickname, setNickname] = useState("");
    // const ws = useRef(null)
    let reconnect = 0
    
    useEffect(() => {
        console.log("chatting useeffect")
        connect()
        loadMessages()
        setRoomIdx(props.roomIdx)
        setUserIdx(localStorage.getItem("userIdx"));

        const userInfo = async () => {
            try {
                const res = await fetchUser()
                setNickname(res[0].nickname)
            } catch (err) {
                console.log(err)
            }
        }; userInfo()
    }, [])

    const loadMessages = async () => {
        try {
          const response = await EnterChat({ roomid: props.roomIdx });
          console.log("loadMessages : ", response);

          setMessages(response);

          console.log("response chatRooms: ", messages);

        } catch (err) {
          console.log(err);
        }
      };

    const connect = () => {
        // if (!roomIdx) return
        const a = process.env.REACT_APP_API_URL
        sock = new SockJS(process.env.REACT_APP_API_URL2 + "/ws-stomp")
        ws = Stomp.over(sock)

        ws.connect(
            {},
            (frame) => {
              ws.subscribe(`/sub/chat/room/${roomIdx}`, (message) => {
                const recv = JSON.parse(message.body)
                recvMessage(recv)
              })
            },
            (error) => {
              console.error()
              if (reconnect++ < 5) {
                setTimeout(connect, 5000)
              }
            }
        )
    }

    const sendMessage = () => {
        // sock = new SockJS("//localhost:8080/ws-stomp")
        // ws = Stomp.over(sock)

        console.log("ws.connected: " + ws.connected)
        console.log("roomIDx : ", props.roomIdx)
    
        if (ws&& ws.connected && message.trim() !== "") {
          ws.send("/pub/chat/message", {}, JSON.stringify({ type: "TALK", roomIdx, userIdx, message, nickname }))
          setMessage("")
        } else {
          // WebSocket 연결이 설정되지 않은 경우, 메시지를 보낼 수 없음을 사용자에게 알림
          console.error("WebSocket 연결이 설정되지 않았습니다.")
          connect()
        }
    }

    const recvMessage = (recv) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: recv.type,
            userIdx: recv.userIdx,
            message: recv.message,
            nickname: recv.nickname,
          },
        ])
    }


    return (
        <>
        <Container>
            <div className="chat-title">
                <h2>{props.recvUser}</h2>
            </div>
            <div className="message-list">
                <ul className="list-group">
                    {messages.map((msg, index) => (
                        <li key={index} className="list-item">
                          <div className="userName">
                            {msg.nickname}
                          </div>
                          {msg.message}
                          {moment(room.sendTime).format("MM/DD HH:mm")}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="input-wrppaer">
                <input
                    type="text"
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
    )

}


const Container = styled.div`
    display: flex;
    flex-direction: column;

    .chat-title {
      margin-bottom: 1rem;
      font-size: x-large;
    }

    .list-item {
      margin: 1rem;
      background-color: #873FFA;
      padding: 20px;
    }

    .userName {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .input-wrapper {
    display: flex;
    margin-top: 1rem;
    }

  .input {
    flex: 1;
    background-color: #151c2c;
    border: none;
    height: 2.5rem;
    border-radius: 10px;
    color: white;
    margin-right: 10px;
    width: 90%;
  }

  button {
    background-color: #254ef8;
    border: none;
    border-radius: 5px;
    height: 2rem;
    color: white;

    &:hover {
      background-color: #1a349a;
      cursor: pointer;
    }
  }
`