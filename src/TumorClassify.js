import './App.css';
import React, { useState } from 'react';
import gliomaTumor from './images/gg (2).jpg';
import pituitaryTumor from './images/p (600).jpg';
import normalBrain from './images/image (10).jpg';
import menengiomaTumor from './images/m (77).jpg';
import Modal from 'react-modal';

import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); 

const TumorClassify = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const classMapping = {
    0: 'Glioma',
    1: 'Meningioma',
    2: 'No Tumor',
    3: 'Pituitary Tumor',
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    const apiUrl = 'http://localhost:5000/predict';

    const formData = new FormData();
    formData.append('image', file);

    try {
     
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          image: await fileToBase64(file),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction from server');
      }

      const data = await response.json();
      setPrediction(classMapping[data.prediction]);
      setProbability(data.probability);
      setModalIsOpen(true); // Open the modal

     
      console.log('Prediction:', data.prediction);
      console.log('Probability:', data.probability);

    } catch (error) {
      console.error('Error:', error);
    
    }
  };

  const navigationFun = (index) => {

    if (index == 0){
     navigate('/glioma');
    }
    if (index == 1){
      navigate('/pituitary');
     }
     if (index == 2){
      navigate('/meningioma');
     }
     if (index == 3){
      navigate('/no-tumor');
     }
  }
 
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4 underline">MRI Tumor Prediction</h1>
      <p className="text-lg mb-8 underline">
        Please upload a clear MRI image for prediction:
      </p>

      <div className="flex mb-8">
        {[
          { src: gliomaTumor, alt: 'Glioma Sample', description: 'Malignant brain tumor from glial cells.' },
          { src: pituitaryTumor, alt: 'Pituitary Sample', description: 'Affects pituitary gland, impacting hormones.' },
          { src: menengiomaTumor, alt: 'Menengioma Sample', description: 'Benign tumor in protective membranes.' },
          { src: normalBrain, alt: 'Normal Sample', description: 'Absence of detectable brain tumor.' },
        ].map((image, index) => (
          <div
            key={index}
            className="bg-gray-700 h-32 w-32 mr-4 transition-transform transform hover:scale-110 relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
            />

            {(
              <div className="absolute bottom-0 left-0 right-0 bg-black opacity-70 p-2">
                <p className="text-white text-xs">{image.alt}</p>
                <p className="text-white text-xs">{image.description}</p>
              </div>
            )}
            {hoveredIndex === index && (
              <div className="absolute bottom-0 left-0 right-0 bg-black opacity-70 p-2">
                <button className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                onClick={() => navigationFun(index)}>
                  Click to know more
                </button>
              </div>
            )}
          </div>
        ))}
      </div>


      <label
        htmlFor="inputTag"
        className='mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'
      >
        Select Image
        <input id="inputTag"
          type="file" 
          accept=".jpg, .jpeg, .png"
          className="mb-4"
          onChange={handleImageSelect}/>
      </label>
      <div className="mb-8 bg-gray-800 p-6 rounded">
        <p className="text-lg mb-2 underline">Tumor Classification:</p>
        <table className="text-white border-collapse border border-white w-full">
          <tr>
            <td className="border border-white p-2">0</td>
            <td className="border border-white p-2">Glioma</td>
            <td className="border border-white p-2">Malignant brain tumor from glial cells.</td>
          </tr>
          <tr>
            <td className="border border-white p-2">1</td>
            <td className="border border-white p-2">Meningioma</td>
            <td className="border border-white p-2">Benign tumor in protective membranes.</td>
          </tr>
          <tr>
            <td className="border border-white p-2">2</td>
            <td className="border border-white p-2">No Tumor</td>
            <td className="border border-white p-2">Absence of detectable brain tumor.</td>
          </tr>
          <tr>
            <td className="border border-white p-2">3</td>
            <td className="border border-white p-2">Pituitary Tumor</td>
            <td className="border border-white p-2">Affects pituitary gland, impacting hormones.</td>
          </tr>
        </table>
      </div>
      {prediction !== null && probability !== null && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            content: {
              color: 'black',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '300px', 
            },
          }}
        >
          <div className="flex justify-end">
            <button
              onClick={() => setModalIsOpen(false)}
              className="text-white hover:text-gray-300 focus:outline-none"
              style={{ fontSize: '1.5rem' }}
            >
              &times;
            </button>
          </div>
          
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Image"
              className="w-full h-auto mb-4"
            />
          )}

          <p className="text-lg mb-2 underline text-black">Prediction:</p>
          <p className="font-bold text-xl">{prediction}</p>
          <p className="">Probability: {probability.toFixed(4)}</p>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default TumorClassify;