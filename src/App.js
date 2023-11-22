// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import TumorClassify from './TumorClassify';
import GliomaPage from './Glioma';
import MainPage from './Home';
import ModelPage from './Model';
import PituitaryPage from './Pituitary';
import MeningiomaPage from './Meningioma';
import NoTumorPage from './NoTumor';

const App = () => {
 
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  const handleLogin = () => {
    setIsUserLoggedIn(true);
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
  };


  return (
    <Router>
      <Routes>
      
        <Route
          path="/"
          element={
            
              <Login handleLogin={handleLogin} />
            
          }
        />
   
        <Route
          path="/tumor-classify"
          element={
            isUserLoggedIn ? (
              <TumorClassify />
            ) : (
           
              <Navigate to="/" replace={true} />
            )
          }
        />

        <Route
          path="/home"
          element={
            isUserLoggedIn ? (
              <MainPage logout={handleLogout} />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />

          <Route
          path="/glioma"
          element={
            isUserLoggedIn ? (
              <GliomaPage />
            ) : (
             
              <Navigate to="/" replace={true} />
            )
          }
        />

        <Route
          path="/pituitary"
          element={
            isUserLoggedIn ? (
              <PituitaryPage />
            ) : (
              
              <Navigate to="/" replace={true} />
            )
          }
        />

        <Route
          path="/no-tumor"
          element={
            isUserLoggedIn ? (
              <NoTumorPage />
            ) : (
            
              <Navigate to="/" replace={true} />
            )
          }
        />

        <Route
          path="/meningioma"
          element={
            isUserLoggedIn ? (
              <MeningiomaPage />
            ) : (
             
              <Navigate to="/" replace={true} />
            )
          }
        />

      <Route
          path="/model"
          element={
            isUserLoggedIn ? (
              <ModelPage />
            ) : (
            
              <Navigate to="/" replace={true} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
