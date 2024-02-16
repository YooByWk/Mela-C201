import { Component } from "react";
import { OpenVidu } from "openvidu-browser";
import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom"; 
import styled from "styled-components";
import axios from "axios";
import icon from "../assets/icons/logo.png";
import UserVideoComponent from "./UserVideoComponent";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MicRoundedIcon  from '@mui/icons-material/MicRounded' ;
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';
import VideocamOffRoundedIcon from '@mui/icons-material/VideocamOffRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


import {
  createViduSession,
  GetSessionId,
  DeleteViduSession,
} from "../API/TeamspaceAPI";
import { fetchUser } from "../API/UserAPI";
import ScheduleAllModal from "./../components/Modals/ScheduleAll";

// const APPLICATION_SERVER_URL =
//   process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";
  const APPLICATION_SERVER_URL = "https://demos.openvidu.io/";

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
      teamspaceIdx: null,
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
    this.getSessionId = this.getSessionId.bind(this);
  }
  async getUserName() {
    const tempName = await fetchUser();
    this.setState({
      myUserName: tempName[0].nickname,
    });
  }

  handleToggle(target) {
    // 마이크 카메라 토글 입력 함수
    switch (target) {
      case "camera":
        this.setState({ isCamera: !this.state.isCamera }, () => {
          // console.log(this.state.isCamera);
          this.state.publisher.publishVideo(this.state.isCamera);
        });

        break;
      case "mic":
        this.setState({ isMic: !this.state.isMic }, () => {
          // console.log(this.state.isMic);
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
  async componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    // console.log("유저이름 불러오기");
    await this.getUserName();
    /// 프론트 단독
    this.setState({
      teamspaceIdx: window.location.pathname.split("/").pop(),
    });
    let temp = "MelaTeamSpace" + window.location.pathname.split("/").pop();
    this.setState(
      {
        mySessionId: temp,
      },
      () => {
        // console.log(temp, "callback");
        if (!this.state.session) {
          this.joinSession();
        }
      }
    );

    /// 백엔드랑 같이 쓸 때
    // this.setState({
    //  teamspaceIdx: window.location.pathname.split("/").pop(),
    // })
    // ;
    // let tempSession = await GetSessionId(
    //   window.location.pathname.split("/").pop()
    // )
    // console.log(tempSession, "tempSession")
    // if (tempSession === 500) {
    //   console.log(500)
    //   tempSession  = await createViduSession(
    //     window.location.pathname.split("/").pop()
    //   );
    //     console.log(tempSession, "tempSession at if")
    // }
    //  this.setState({
    //   mySessionId: tempSession,
    // });
    // console.log("tempSession: ", tempSession);
    // console.log(tempSession, "temp");
    // if (!this.state.session) {
    //   await this.joinSession();
    // }
    // if (!tempSession === 500) {
    //   this.setState({
    //     mySessionId: tempSession,
    //   });
    // }
    //프로미스로 setState 실행해서 tempSession올려놓기.
  }

  createHandler = (e) => {
    e.preventDefault();
    // console.log(this.state);
    createViduSession(this.state.teamspaceIdx)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
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
        let mySession = this.state.session;
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
          //////////////////////////////////////////////////////////////////////////
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
                resolution: "440x330", // The resolution of your video
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
    // console.log(e);
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

  async getSessionId() {
    const res = await GetSessionId(this.state.teamspaceIdx);
    // console.log(res);
    this.setState({
      mySessionId: res,
    });
  }
  
  render() {
    // const Check = () => console.log(this.props);
  // console.log(this.state.subscribers.length)

    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    const teamspaceIdx = sessionStorage.getItem("teamspaceIdx");
    const Location = window.location.pathname.split("/").pop();
    const goBack = this.props.goBack;
    const leaveButtonHandler = async () => {
      await this.leaveSession();
      goBack();
    }
    return (
      <TOP>
        <div>
          <MainContainer>
          {/* <button onClick={()=>console.log(this.state)}> State </button> */}
            {this.state.session === undefined ? (
              <div>
                <div>
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
                      value="Enter"
                      name="commit"
                    />
                  </form>
                </div>
              </div>
            ) : null}
            <div className="buttonHolder">
              {/* <h1>{mySessionId}</h1> */}
              <div onClick={leaveButtonHandler}> 
                <ExitToAppIcon/>
              </div>
              <div onClick={() => this.handleToggle('mic')}>
                {this.state.isMic ? <MicRoundedIcon/> : <MicOffRoundedIcon/>}
              </div>
              <div onClick={() => this.handleToggle('camera')}>
                {this.state.isCamera ? <VideocamRoundedIcon/> : <VideocamOffRoundedIcon/>}
              </div>
              {/* 212 */}
            </div>
            {this.state.session !== undefined ? (
              <div>
                <VideoContainer className="VideoContainer">
                  <StreamWrapper>
                    {this.state.publisher !== undefined ? (
                      <UserVideoContainer
                        onClick={() =>
                          this.handleMainVideoStream(this.state.publisher)
                        }
                      >
                        <UserVideoComponent
                          streamManager={this.state.publisher}
                          isMain={true}
                        />
                      </UserVideoContainer>
                    ) : null}

                    {this.state.subscribers.map((sub, i) => (
                      <UserVideoContainer key={sub.id}>
                        <UserVideoComponent streamManager={sub} />
                      </UserVideoContainer>
                    ))}
                  </StreamWrapper>
                </VideoContainer>
              </div>
            ) : null}
          </MainContainer>
        </div>
      </TOP>
    );
  }
}

export default Video;

const TOP = styled.div`
  color: white;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: hidden;
`;

const StreamWrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  height: 50rem;
  padding:1px;
  width: 100%;
  div {
    width: 100%;
    height: 100%;
  }
`;

const UserVideoContainer = styled.div`
  width: 100%;
  min-height: 8vh;
  height: 350px;
  position: relative;
  /* min-height: 15vh; */
  box-sizing: border-box;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  .buttonHolder {
    position: fixed;
    display: flex;
    flex-direction: row;
    background-color: #202c44;
    font-weight: bold;
    font-size: large;
    bottom: 5%;
    left: 50%;
    z-index: 9999;
  }
`;
