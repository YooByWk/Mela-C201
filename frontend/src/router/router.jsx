import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from "../pages/Portfolio"
import Recruit from "../pages/Recruit"
import Community from "../pages/Community"
import SigninModal from '../components/Modals/SigninModal';
import SignupModal from '../components/Modals/SignupModal';
import { Homepage } from '../pages/Homepage';
import Navbar from '../components/Navbar';

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
    </div>
  );
}

export default AppRouter

