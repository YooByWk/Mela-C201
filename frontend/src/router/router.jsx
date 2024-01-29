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

function AppRouter({ className }) {
  return (  
    <div className={className}>
        <Routes>
          <Route
            path='/'  element= {<Homepage/>}
          />

          <Route
            path='/nav' element= {<Navbar/>}
          /> 

          <Route
            path='/portfolio' element= {<Portfolio/>}
          />

          <Route
            path='/gather' element= {<Gather/>}
          /> 

          <Route
            path='/community' element= {<Community />}
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
            path='*' element = {<Homepage />}
          /> // 예외처리 경로

        </Routes>
    </div>
  );
}

export default AppRouter

