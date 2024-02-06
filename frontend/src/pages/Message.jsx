import React, { useState, useEffect } from "react";
import InboxList from '../components/InboxList'
import MessageFrom from '../components/MessageFrom'
import styled from "styled-components";
import axios from 'axios';
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";

let ACCESS_TOKEN = localStorage.getItem('accessToken')
const WEBSOCKET_URL = '/ws-stomp';

export const ChatAPI = axios.create({
  baseURL: 'http://localhost:8080/api/v1/chat',
  headers: {
      'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${ACCESS_TOKEN}`,
  },
})

function Message() {
  const [roomName, setRoomName] = useState('');
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    findAllRoom();
  }, []);

  const findAllRoom = () => {
    ChatAPI.get('/rooms').then((response) => {
      setChatrooms(response.data);
    });
  };


  const enterRoom = (roomIdx) => {
    const sender = prompt('대화명을 입력해 주세요.');
    localStorage.setItem('wschat.sender', sender);
    localStorage.setItem('wschat.roomIdx', roomIdx);
    // window.location.href = `/chat/room/enter/${roomIdx}`;
  };

  // ------------------------------------------------
  
  const [roomIdx, setRoomIdx] = useState(localStorage.getItem('wschat.roomIdx') || '');
  const [room, setRoom] = useState({});
  const [sender, setSender] = useState(localStorage.getItem('wschat.sender') || '');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  let sock = new SockJS("/ws-stomp");
//   let sock = new SockJS("/ws/chat");
//   let sock = new SockJS("http://localhost:8080/ws-stomp");
//   let sock = new SockJS("http://localhost:8080/api/v1/chat");

  let ws = new Client({
    webSocketFactory : ()=> sock
  })
  let reconnect = 0;

  useEffect(() => {
    findRoom();
    connect();

    return () => {
      ws.deactivate();
    };
  }, []);

  const findRoom = () => {
    axios.get(`http://localhost:8080/chat/room/${roomIdx}`).then(response => {
      setRoom(response.data);
    });
  };

  const sendMessage = () => {
    ws.publish({destination: "/pub/chat/message", body: JSON.stringify({ type: 'TALK', roomIdx, sender, message })});
    setMessage('');
  };

  const recvMessage = (recv) => {
    setMessages([{ type: recv.type, sender: recv.type === 'ENTER' ? '[알림]' : recv.sender, message: recv.message }, ...messages]);
  };

  const connect = () => {
    ws.onConnect = (frame) => {
      ws.subscribe(`/sub/chat/room/${roomIdx}`, (message) => {
        const recv = JSON.parse(message.body);
        recvMessage(recv);
      });
      ws.publish({destination: "/pub/chat/message", body: JSON.stringify({ type: 'ENTER', roomIdx, sender })});
    }

    ws.onStompError = (error) => {
      if (reconnect++ <= 5) {
        setTimeout(() => {
          console.log("connection reconnect");
          sock = new SockJS("/ws-stomp");
          ws = new Client({
            webSocketFactory : ()=> sock
          });
          connect();
        }, 10 * 1000);
      }
    };

    ws.activate();
  };

  return(
    <Container>

      <ul className="list-group">
        {chatrooms.map((item) => (
          <li
            key={item.roomIdx}
            className="list-group-item list-group-item-action"
            onClick={() => enterRoom(item.roomIdx)}
          >
            {item.name}
          </li>
        ))}
      </ul>

      <div className="container">
      <div>
        <h2>{room.name}</h2>
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text">내용</label>
        </div>
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={sendMessage}>
            보내기
          </button>
        </div>
      </div>
      <ul className="list-group">
        {messages.map((msg, index) => (
          <li key={index} className="list-group-item">
            {msg.sender} - {msg.message}
          </li>
        ))}
      </ul>
      <div></div>
    </div>

      <MessageFromWrapper>
        <MessageFrom />
      </MessageFromWrapper>
      <InboxWrapper>
        <InboxList />
      </InboxWrapper>
    </Container>      
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
`

const MessageFromWrapper = styled.div`
  color: white;
  flex: 3;
`

const InboxWrapper = styled.div`
  background-color: #151C2C;
  color: white;
  flex: 1;
`
export default Message
