import { Component } from "react";
//Openvidu
import { OpenVidu } from "openvidu-browser";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";


class Video extends Component {

  // These properties are in the state's component in order to re-render the HTML whenever their values change
  constructor(props) {
    super(props);
    this.state = {
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
    };

    // 1 - Get an OpenVidu object
    this.OV = new OpenVidu();

    // 2 - Init a session
    this.setState(
      {
        session: this.OV.initSession(),
      },
      ()=>{

      }
    ); //setState Ends Here
    var mySession = this.state.mySessionId;

    // 3. 이벤트 발생시 액션 설정
    // On every new Stream received...
      mySession.on('streamCreated', (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      var subscriber = mySession.subscribe(event.Stream, undefined);

        //We use an auxiliar array to push the new stream
      var subscribers = this.state.subscribers;
      
      subscribers.push(subscriber)

      // Update the state with the new subscribers
      this.setState({
        subscribers: subscribers,
      })
      });

      // 스트리밍 끝나면
      mySession.on('streamDestroyed', (event) => {
        event.preventDefault();

        // subscriber에서 stream 제거
        this.deleteSubscriber(event.stream.mainStreamManager);
      })
    // on every asynchronous exception
    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

  } // Constructor(Props Ends Here)



  render() {
    return (
      <h1>
        작업중
      </h1>
    );
  }
}

export default Video;

const PA = styled.p`
  color: red;
  font-size: 20px;
`;

const MAINCONT = styled.div`
  background-color: blue;
  color: white;
`;
