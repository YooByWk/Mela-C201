import "./App.css";
import { Fragment } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import Navbar from "./components/Navbar";
import SignupModal from "./components/SignupModal";
import SigninModal from './components/SigninModal'

import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "@material-tailwind/react";
import theme from './styles/GlobalStyle'

import AppRouter from "./router/Router";


function App() {
  return (
    <Fragment>
        <GlobalStyle />
        <ThemeProvider theme={theme}>

                <BrowserRouter>
               {/*  <Routes>
          <Route exact  path='/Home' element={<Homepage />}> </Route>
          <Route path='/nav' element={<Navbar />}> </Route>
          <Route path='/user' element={<SignupModal />}></Route>
          <Route path='/login' element={<SigninModal />}></Route>
          <Route path='*' Component={Homepage} />
          <Route path='/nav2' Component={Navbar} />
          </Routes> */}

          <AppRouter />
          <Link to='/home'>Homepage(실험중인곳)</Link>
          <Link to='/'>기본 경로</Link>
          <Link to='/nav'>Navbar</Link>
          <Link to='/user'>Signup</Link>
          <Link to='/login'>SignIn</Link>

                </BrowserRouter>
          <div className="App">
          </div>
        </ThemeProvider>
    </Fragment>
  );
}

export default App;
