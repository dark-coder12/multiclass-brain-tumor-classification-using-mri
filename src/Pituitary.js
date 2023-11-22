import './App.css';
import React from 'react';

import pituitary1 from './images/pituitary/p (11).jpg';
import pituitary2 from './images/pituitary/p (113).jpg';
import pituitary3 from './images/pituitary/p (162).jpg';
import pituitary4 from './images/pituitary/p (26).jpg';
import pituitary5 from './images/pituitary/p (45).jpg';
import pituitary6 from './images/pituitary/p (5).jpg';
import pituitary7 from './images/pituitary/p (62).jpg';
import pituitary8 from './images/pituitary/p (676).jpg';
import pituitary9 from './images/pituitary/p (83).jpg';
import pituitary10 from './images/pituitary/p (137).jpg';

const PituitaryPage = () => {
  const pituitaryImages = [
    pituitary1,
    pituitary2,
    pituitary3,
    pituitary4,
    pituitary5,
    pituitary6,
    pituitary7,
    pituitary8,
    pituitary9,
    pituitary10,
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl mb-8 text-center">Pituitary Tumor</h1>

     
      <div className="grid grid-cols-5 gap-4 mb-8">
        {pituitaryImages.map((image, index) => (
          <div key={index} className="w-48 h-48 mx-auto">
            <img
              src={image}
              alt={`Pituitary Thumbnail ${index}`}
              className="w-full h-full rounded-md object-cover"
            />
          </div>
        ))}
      </div>

    
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl mb-4 underline">Characteristics of Pituitary Tumors</h2>
        <p className="mb-4">
          Pituitary tumors are growths that develop in the pituitary gland, a small gland at the base of the brain.
          These tumors can be noncancerous (adenomas) or, in rare cases, cancerous (carcinomas).
        </p>

        <h2 className="text-2xl mb-4 underline">Identification and Diagnosis</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Identifying pituitary tumors often involves imaging studies such as magnetic resonance imaging (MRI) and computed tomography (CT) scans.
          </li>
          <li>
            Symptoms may include headaches, vision problems, hormonal imbalances, and others.
          </li>
          <li>
            Hormonal testing and visual field testing may be part of the diagnostic process.
          </li>
          <li>
            Biopsy is not usually required for pituitary tumors.
          </li>
        </ul>

        <h2 className="text-2xl mb-4 underline">Treatment Options</h2>
        <p className="mb-4">
          Treatment for pituitary tumors may include surgery, radiation therapy, and medications.
          The choice of treatment depends on the type of tumor, its size, and its effects on surrounding tissues.
        </p>
      </div>
    </div>
  );
};

export default PituitaryPage;
