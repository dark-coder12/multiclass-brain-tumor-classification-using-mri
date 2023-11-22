
import './App.css';
import './App.css';
import React from 'react';

import glioma1 from './images/glioma/gg (126).jpg';
import glioma2 from './images/glioma/gg (131).jpg';
import glioma3 from './images/glioma/gg (136).jpg';
import glioma4 from './images/glioma/gg (211).jpg';
import glioma5 from './images/glioma/gg (211).jpg';
import glioma6 from './images/glioma/gg (216).jpg';
import glioma7 from './images/glioma/gg (221).jpg';
import glioma8 from './images/glioma/gg (421).jpg';
import glioma9 from './images/glioma/gg (422).jpg';
import glioma10 from './images/glioma/gg (43).jpg';

const GliomaPage = () => {
  const gliomaImages = [
    glioma1,
    glioma2,
    glioma3,
    glioma4,
    glioma5,
    glioma6,
    glioma7,
    glioma8,
    glioma9,
    glioma10,
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl mb-8 text-center">Glioma Tumor</h1>

      
      <div className="grid grid-cols-5 gap-4 mb-8">
        {gliomaImages.map((image, index) => (
          <div key={index} className="w-48 h-48 mx-auto">
            <img
              src={image}
              alt={`Glioma Thumbnail ${index}`}
              className="w-full h-full rounded-md object-cover"
            />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl mb-4 underline">Characteristics of Glioma Tumors</h2>
        <p className="mb-4">
          Gliomas originate from glial cells, providing support and protection
          for neurons in the brain. These tumors can vary in grade, with higher
          grades indicating a more aggressive form. Common types of gliomas
          include astrocytomas, oligodendrogliomas, and ependymomas.
        </p>

        <h2 className="text-2xl mb-4 underline">Identification and Diagnosis</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Identifying glioma tumors involves a combination of imaging studies
            and biopsy.
          </li>
          <li>
            Common diagnostic methods include magnetic resonance imaging (MRI)
            and computed tomography (CT) scans.
          </li>
          <li>
            Radiological features of gliomas may include irregular borders,
            enhancement patterns, and mass effect on surrounding brain tissues.
          </li>
          <li>A definitive diagnosis is typically confirmed through a biopsy.</li>
        </ul>

        <h2 className="text-2xl mb-4 underline">Treatment Options</h2>
        <p className="mb-4">
          Treatment for gliomas may include surgery, radiation therapy, and
          chemotherapy. The specific approach depends on the tumor's location,
          size, and grade. Gliomas can be challenging to treat due to their
          infiltrative nature within the brain tissue. Treatment plans are often
          personalized based on the individual patient's condition.
        </p>
      </div>
    </div>
  );
};

export default GliomaPage;
