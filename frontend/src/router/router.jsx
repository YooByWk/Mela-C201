import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from "../pages/Portfolio"
import Community from "../pages/Community"
import SigninModal from '../components/SigninModal';
import SignupModal from '../components/SignupModal';
import { Homepage } from '../pages/Homepage';
import Navbar from '../components/Navbar';
import Teamspace from '../pages/Teamspace';
import Gather from '../pages/Gather';
import UserUpdate from '../pages/UserUpdate';
import PortfolioAll from '../pages/PortfolioAll';
import Landing from '../pages/Landing';
function AppRouter({ className }) {
  return (  
    <div className={className}>

        <Routes>

          <Route
            path='/portfolio' element={<Portfolio/>}
          />

          <Route
            path='/gather' exact element={<Gather/>}
          /> 

          <Route
            path='/community' element={<Community />}
          />

          <Route 
            path='/teamspace' element={<Teamspace/>}
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
        </Routes>
    </div>
  );
}

export default AppRouter

