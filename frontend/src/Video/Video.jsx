import { Component } from "react";
import { OpenVidu } from "openvidu-browser";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import icon from "../assets/icons/logo.png";
import UserVideoComponent from "./UserVideoComponent";
import { createViduSession } from "../API/TeamspaceAPI";
import { fetchUser } from "../API/UserAPI";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";

const OPENVIDU_SERVER_URL = "https://localhost:4443";
const OPENVIDU_SERVER_SECRET = "mela";

class Video extends Component {
  // These properties are in the state's component in order to re-render the HTML whenever their values change
  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined, // 로컬 웹캠 스트림
      subscribers: [], // 다른 사용자의 활성 스트림
      isCamera: true,
      isMic: true,
      isSpeaker: true,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.handleToggle = this.handleToggle.bind(this); // 마이크 카메라 토글
    this.getUserName = this.getUserName.bind(this);
  }
  async getUserName () {
     const tempName = await fetchUser();
      console.log(tempName);
      this.setState({
        myUserName: tempName[0].nickname,
      });
  }
  handleToggle(target) {
    // 마이크 카메라 토글 입력 함수
    switch (target) {
      case "camera":
        this.setState({ isCamera: !this.state.isCamera }, () => {
          console.log(this.state.isCamera);
          this.state.publisher.publishVideo(this.state.isCamera);
        });

        break;
      case "mic":
        this.setState({ isMic: !this.state.isMic }, () => {
          console.log(this.state.isMic);
          this.state.publisher.publishAudio(this.state.isMic);
        });
        break;
      case "speaker":
        this.setState({ isSpeaker: !this.state.isSpeaker });
        break;

      default:
        break;
    }
  }
  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
  }

  createHandler = () => {
    console.log(this.state);
    createViduSession()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }
  //
  // 1 - Get an OpenVidu object
  joinSession() {
    // --- 1) Get an OpenVidu object ---s

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }
  leaveSession() {
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }

    // 제거
    this.OV = null;
    this.setState({
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined, //
      publisher: undefined,
      subscribers: [],
    });
  }
  async switchCamera(e) {
    console.log(e);
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
  render() {
    const Check = () => console.log(this.state);
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    console.log("mySessionId: ", mySessionId);
    console.log("myUserName: ", myUserName);
    console.log(this.state);
    return (
      <div>
        <button onClick={createViduSession}>제발</button>
        <button onClick={this.getUserName}>유저이리온</button>
        <button onClick={()=> console.log(this.state.myUserName)}>제발 유저이름 </button>


        <button onClick={Check}>체크</button>
        {this.state.session === undefined ? (
          <div>
            <p>Mela Team Video Conference</p>
            <img src={icon} alt="으악" />
            <div>
              <h1>아무튼 들어가보기 </h1>
              <form action="" onSubmit={this.joinSession}>
                <label>Nombre : </label>
                <input
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={this.handleChangeUserName}
                  required
                />
                <label>Session : </label>
                <input
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={this.handleChangeSessionId}
                />
                <input
                  type="submit"
                  value="DIDNT I DO IT FOR U"
                  name="commit"
                />
              </form>
            </div>
          </div>
        ) : null}
        {this.state.session !== undefined ? (
          <div>
            <div className="sessionHeader">
              <h1>{mySessionId}</h1>
              <input type="button" value="Leave" onClick={this.leaveSession} />
              <input type="button" value="Switch" onClick={this.switchCamera} />
              <input
                type="button"
                value="camera"
                onClick={() => this.handleToggle("camera")}
              />
              <input
                type="button"
                value="mic"
                onClick={() => this.handleToggle("mic")}
              />
            </div>
            {/* 205~211 */}
            {this.state.mainStreamManager !== undefined ? (
              <div className="VideoComponent">
                <UserVideoComponent
                  streamManager={this.state.mainStreamManager}
                />
              </div>
            ) : null}

            <div>
              {/* 212 */}
              {this.state.publisher !== undefined ? (
                <div
                  className=""
                  onClick={() =>
                    this.handleMainVideoStream(this.state.publisher)
                  }
                >
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null}
            </div>
            <div>
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={sub.id}
                  className=""
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  <span>{sub.id}</span>
                  <span>
                    {this.state.isCamera ? (
                      <div>'카메라가 켜져있습니다'</div>
                    ) : (
                      <div>'카메라가 꺼져있습니다'</div>
                    )}
                  </span>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
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
