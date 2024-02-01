import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from "../pages/Portfolio"
import SigninModal from '../components/Modals/SigninModal';
import SignupModal from '../components/Modals/SignupModal';
import TeamspaceMain from '../pages/TeamspaceMain';
import TeamspaceDetail from '../pages/TeamspaceDetail'
import Gather from '../pages/Gather';
import UserUpdate from '../pages/UserUpdate';
import PortfolioAll from '../pages/PortfolioAll';
import Message from '../pages/Message';


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
            path='/teamspace/detail' element={<TeamspaceDetail/>}
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
        </Routes>
    </div>
  );
}

export default AppRouter 


