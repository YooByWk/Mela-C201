import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from "../pages/Portfolio"
import SigninModal from '../components/Modals/SigninModal';
import SignupModal from '../components/Modals/SignupModal';
import Gather from '../pages/Gather';
import UserUpdate from '../pages/UserUpdate';
import PortfolioAll from '../pages/PortfolioAll';
import Message from '../pages/Message';
import TeamspaceTeam from '../components/teamspace/TeamspaceTeam';
import TeamspaceAudio from '../components/teamspace/TeamspaceAudio';
import TeamspaceFile from '../components/teamspace/TeamspaceFile';
import TeamspaceManage from '../components/teamspace/TeamspaceManage';
import TeamspaceDetail from '../pages/TeamspaceDetail';
import ForgotPassword from '../pages/ForgotPassword';

function AppRouter({ className }) {
  return (  
    <div className={className}>
  
        <Routes>

          <Route
            path='/portfolio/:nickname' element={<Portfolio/>}
          />

          <Route
            path='/gather' exact element={<Gather/>}
          /> 

          <Route 
            path='/teamspace/:teamspaceIdx' element={<TeamspaceDetail/>}
          />

          <Route 
            path='/teamspace/:teamspaceIdx/team' element={<TeamspaceTeam/>}
          />
          
          <Route 
          path='/teamspace/:teamspaceIdx/audio' element={<TeamspaceAudio/>} 
          />

          <Route 
          path='/teamspace/:teamspaceIdx/file' element={<TeamspaceFile/>} 
          />

          <Route 
          path='/teamspace/:teamspaceIdx/management' element={<TeamspaceManage/>} 
          />

          <Route
            path='/signup' element={<SignupModal />}
            />

          <Route
            path='/login' element={<SigninModal />}
          />

          <Route
            path='/users' element={<UserUpdate />}
          />

          <Route
            path='/musics' element={<PortfolioAll />}
            />

          <Route
            path='/message' element={<Message />}
            />

          <Route
            path='/forgotPassword' element={<ForgotPassword />}
            />
        </Routes>
    </div>
  );
}

export default AppRouter 


