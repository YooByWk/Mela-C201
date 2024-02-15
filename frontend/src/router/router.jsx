import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import AlarmMain from '../pages/AlarmMain';
import SequenceMain from './../sequence/SequenceMain';
import Video from '../Video/Video';
import Matching from '../pages/Matching'
import { useNavigate } from 'react-router-dom';

function AppRouter({ className }) {
  const Navigate = useNavigate()

  const goBack = () => {
    console.log('뒤로가기')
    Navigate(-1)
}
  return (  
    <div className={className}>
  
        <Routes>

          <Route
            path='/portfolio/:emailId' element={<Portfolio/>}
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
          path='/teamspace/video/:teamspaceIdx' element={<Video goBack={goBack}/>} 
          />
          {/* <Route
          path='/teamspace/video/:teamspaceIdx' element={<Video/>} 
          /> */}

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
            path='/:emailId/musics' element={<PortfolioAll />}
            />

          <Route
            path='/message/:roomid' element={<Message />}
            />

          <Route
            path='/message' element={<Message />}
            />

          <Route
            path='/forgotPassword' element={<ForgotPassword />}
            />

          <Route
            path='/alarm' element={<AlarmMain />}
            />
          <Route
          path='/seq' element={<SequenceMain />} /> 

          <Route
            path='/matching' element={<Matching />}
          />
        </Routes>
    </div>
  );
}

export default AppRouter 


