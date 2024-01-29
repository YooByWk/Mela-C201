import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from "../pages/Portfolio"
import Recruit from "../pages/Recruit"
import Community from "../pages/Community"
import SigninModal from '../components/SigninModal';
import SignupModal from '../components/SignupModal';
import { Homepage } from '../pages/Homepage';

function AppRouter() {
  return (  
      <Routes>
        <Route
          path='/'  element= {<Homepage/>}
        />
        <Route
          path='/portfolio' element= {<Portfolio/>}
        />
        <Route
          path='/recruit' element= {<Recruit/>}
        />
        <Route
          path='/community' element= {<Community />}
        />
        <Route 
          path='/login' element={<SigninModal />}
        />
        <Route
          path='/user' element={<SignupModal/>}
          />
        <Route
          path='*' element = {<Homepage />}
        />

      </Routes>
  );
}

export default AppRouter

