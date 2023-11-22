
import React from 'react';
import './App.css';
import healthy1 from './images/no tumor/image (18).jpg';
import healthy2 from './images/no tumor/image(159).jpg';
import healthy3 from './images/no tumor/image(57).jpg';

const NoTumorPage = () => {
  const healthyImages = [healthy1, healthy2, healthy3];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl mb-8 text-center">No Tumor Detected</h1>

      
      <div className="grid grid-cols-3 gap-4 mb-8">
        {healthyImages.map((image, index) => (
          <div key={index} className="w-48 h-48 mx-auto">
            <img
              src={image}
              alt={`Healthy Thumbnail ${index}`}
              className="w-full h-full rounded-md object-cover"
            />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <p className="mb-4">
          In this case, no tumor has been detected. A state of no tumor means that, based on the available medical information, there are currently no abnormal growths or masses present.
        </p>

        <p className="mb-4">
          Regular health check-ups are still recommended to monitor overall well-being and detect any potential health issues early on.
        </p>
      </div>
    </div>
  );
};

export default NoTumorPage;
