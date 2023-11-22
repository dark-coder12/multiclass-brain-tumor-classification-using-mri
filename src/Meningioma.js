
import './App.css';
import React from 'react';
import meningioma1 from './images/meningioma/m (125).jpg';
import meningioma2 from './images/meningioma/m (171).jpg';
import meningioma3 from './images/meningioma/m (20).jpg';
import meningioma4 from './images/meningioma/m (3).jpg';
import meningioma5 from './images/meningioma/m (45).jpg';
import meningioma6 from './images/meningioma/m (76).jpg';
import meningioma7 from './images/meningioma/m1(107).jpg';
import meningioma8 from './images/meningioma/m1(166).jpg';
import meningioma9 from './images/meningioma/m1(25).jpg';
import meningioma10 from './images/meningioma/m1(94).jpg';

const MeningiomaPage = () => {
  const meningiomaImages = [
    meningioma1,
    meningioma2,
    meningioma3,
    meningioma4,
    meningioma5,
    meningioma6,
    meningioma7,
    meningioma8,
    meningioma9,
    meningioma10,
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl mb-8 text-center">Meningioma Tumor</h1>

     
      <div className="grid grid-cols-5 gap-4 mb-8">
        {meningiomaImages.map((image, index) => (
          <div key={index} className="w-48 h-48 mx-auto">
            <img
              src={image}
              alt={`Meningioma Thumbnail ${index}`}
              className="w-full h-full rounded-md object-cover"
            />
          </div>
        ))}
      </div>

    
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl mb-4 underline">Characteristics of Meningioma Tumors</h2>
        <p className="mb-4">
          Meningiomas arise from the meninges, the layers of tissue covering the brain and spinal cord.
          These tumors are typically slow-growing and are often found attached to the dura mater.
        </p>

        <h2 className="text-2xl mb-4 underline">Identification and Diagnosis</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Identifying meningioma tumors involves imaging studies such as magnetic resonance imaging (MRI) and computed tomography (CT) scans.
          </li>
          <li>
            Radiological features may include a well-defined mass with a broad base of attachment and calcifications.
          </li>
          <li>
            Biopsy is not always necessary for diagnosis, and the decision is often based on the clinical scenario.
          </li>
        </ul>

        <h2 className="text-2xl mb-4 underline">Treatment Options</h2>
        <p className="mb-4">
          Treatment for meningiomas may include surgery, radiation therapy, and, in some cases, observation.
          The choice of treatment depends on factors such as tumor size, location, and the patient's overall health.
        </p>
      </div>
    </div>
  );
};

export default MeningiomaPage;
