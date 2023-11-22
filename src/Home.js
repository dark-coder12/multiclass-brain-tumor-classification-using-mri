// MainPage.jsx
import './App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = ({ logout }) => {

  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8 underline">MRI Tumor Prediction App</h1>

      <div className="flex mb-8">
        {/* Logout Tile */}
      

          <div className="bg-green-500 hover:bg-green-700 transition-transform transform hover:scale-105 rounded-lg p-6 mr-4 cursor-pointer"
          onClick={() => navigate('/model')}>
            <h2 className="text-2xl mb-4">Learn About the Model</h2>
            <p className="text-lg">Explore details about the MRI tumor prediction model.</p>
          </div>
   
    
          <div className="bg-yellow-500 hover:bg-yellow-700 transition-transform transform hover:scale-105 rounded-lg mr-4 p-6 cursor-pointer"
           onClick={() => navigate('/tumor-classify')}>
            <h2 className="text-2xl mb-4">Predict MRI Images</h2>
            <p className="text-lg"
           >Upload an MRI image to get tumor predictions.</p>
          </div>
      
          <div className="bg-blue-500 hover:bg-blue-700 transition-transform transform hover:scale-105 rounded-lg p-6 cursor-pointer"
          onClick = {logout}>
            <h2 className="text-2xl mb-4">Logout</h2>
            <p className="text-lg">Click to log out of the application.</p>
          </div>
      </div>
    </div>
  );
};

export default MainPage;
