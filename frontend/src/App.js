import "./App.scss";
import { Fragment } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import AppRouter from "./router/router";
import Sidebar from "./components/Sidebar";

import Community from "./pages/Community";
import CommunityCreate from "./components/community/CommunityCreate";
import CommunityDetail from "./components/community/CommunityDetail";
import CommunityHome from "./components/community/CommunityHome";


const StyledAppRouter = styled(AppRouter)`
  /* background-color: blue; */
  /* color: blue; */
  height: 21987347px;
  width: 100%;
`;

const Body = styled.div`
  padding-top: 2%;
  display: flex;
  flex-direction: row;

  background-color: #10141d;
  height: 60rem;

  .BodyRouter {
    // 컴포 이하
    width: 90%;
    background-color: #10141d;
    padding-left: 2%;
    /* padding-top: 2%; */
    height: 100%;
  }
  .Side {
    // 사이드 L 바
    margin-left: 15px;
    width: 10%;
    min-width: 80px;
    padding-top: 2%;
    max-width: 120px;
    text-align: center;
    height: 80%;
    background-color: #202c44;
    border-radius: 10px;
  }
`;

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/community' element={<Community />}>
          <Route path='/community' exact element={<CommunityHome/>} />
        <Route path='/community/create' element={<CommunityCreate/>} />
        <Route path='/community/1' element={<CommunityDetail/>} />
          </Route>
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
          <p>아래 링크는 지울 수 있습니다. - 개발용 -</p>
          <Link to="/home">Homepage(실험중인곳)</Link>||
          <Link to="/">기본 경로</Link>||
          <Link to="/nav">Navbar</Link>||
          <Link to="/user">Signup</Link>||
          <Link to="/login">SignIn</Link>||
          <Link to="/community"> community </Link>
        </BrowserRouter>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
