import "./App.scss";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route, Link, HashRouter, useNavigate, Navigate  } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import AppRouter from "./router/router";
import Sidebar from "./components/Sidebar";
import Boards from "./pages/Boards";
import CommunityCreate from "./components/community/CommunityCreate";
import CommunityDetail from "./components/community/CommunityDetail";
import CommunityHome from "./components/community/CommunityHome";
import CommunityEdit from "./components/community/CommunityEdit";
import TeamspaceMain from "./pages/TeamspaceMain";
import EmailVerify from "./pages/EmailVerify";
import GatherHome from "./components/gather/GatherHome";
import GatherCreate from "./components/gather/GatherCreate";
import GatherDetail from "./components/gather/GatherDetail";
import GatherEdit from "./components/gather/GatherEdit";
import ChangePassword from "./pages/ChangePassword";
import Video from "./Video/Video";
import TotalSearch from './pages/TotalSearch'
import Gather from "./pages/Gather";

function App() {

  const lgd = localStorage.getItem('accessToken')? true : false;

  return (
    <>

      <GlobalStyle />
      <ThemeProvider theme={theme}>
      <Scroll>
        
          <BrowserRouter>
            <Routes>
            <Route path='/Home' element={<Landing />} />
              <Route path="/" element={<Landing />} />
              <Route path="/teamspace" element={<TeamspaceMain />} />
              <Route path="/search/:word" element={<TotalSearch />} />
              <Route path="/signup/:emailId" element={<EmailVerify />} />
              <Route path="/maingather" element={<Gather/>} />
              <Route path="/gather" element={<Boards />}>
                <Route index element={<GatherHome />} />
                {lgd?<Route path="edit/:gatherIdx" element={<GatherEdit />} /> : null}
                {lgd?<Route path=":pageNumber" element={<GatherHome />} />: null}
                {lgd?<Route path="create" element={<GatherCreate />} />: null}
                {lgd?<Route path="detail/:gatherIdx" element={<GatherDetail />} />: null}
              </Route>
              <Route path="/community" element={<Boards />}>
                <Route path="/community" exact element={<CommunityHome />} />
                {lgd?<Route path="/community/create" element={<CommunityCreate />} />: null}
                <Route
                  path="/community/:boardIdx"
                  element={<CommunityDetail />}
                />
                <Route
                  path="/community/:boardIdx/edit"
                  element={<CommunityEdit />}
                />
              </Route>
              {lgd?<Route path='/changepassword' element={<ChangePassword />}/>:null}
              <Route
                path="*"
                element={
                  <>
                    <header>
                      <Navbar />
                    </header>
                    <Body>
                      <Sidebar className="Side" />
                      <StyledAppRouter className="BodyRouter" />
                    </Body>
                  </>
                }
              />
            </Routes>

          </BrowserRouter>
      </Scroll>
      </ThemeProvider>
    </>
  );
}

export default App;


const StyledAppRouter = styled(AppRouter)`
  /* background-color: blue; */
  /* color: blue; */
  min-height: 100%;
  width: 100%;
`;

const Scroll = styled.div`
  
`
const Body = styled.div`
  padding-top: 2.5%;
  display: flex;
  flex-direction: row;

  background-color: #10141d;
  height: 100%;
  /* height: 90rem; */
  /* min-height: 80vh; */



  .BodyRouter {
    // 컴포 이하
    /* width: 90%; */
    background-color: #10141d;
    padding-left: 10px;
    /* padding-top: 2%; */
    height: 100%;
    min-height: 90vh;
  }
  .Side {
    // 사이드 L 바
    width: 12.5vw;
    /* min-width: 80px; */
    padding-top: 1.5%;
    /* max-width: 300px; */
    text-align: center;
    padding-left:0.5%;
    margin-left: 1rem;
    height: 60%;
    /* background-color: #202c44; */
    border-radius: 10px;
  }
`;