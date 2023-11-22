
import './App.css';
import React from 'react';
import confusion_matrix from './images/output.png';
import results from './images/output2.png';
const ModelPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl mb-6 text-center">Brain MRI Classification Model</h1>

     
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Model Architecture</h2>
        <p className="mb-4">
          The classification model utilizes the EfficientNet B3 architecture for feature extraction.
          The classifier is customized with additional layers for the specific classification task.
        </p>
      </div>

    
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Training Details</h2>
        <table className="table-auto border border-white w-full">
          <thead>
            <tr>
              <th className="border border-white px-4 py-2">Epochs</th>
              <th className="border border-white px-4 py-2">Batch Size</th>
              <th className="border border-white px-4 py-2">Optimizer</th>
             
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white px-4 py-2">100</td>
              <td className="border border-white px-4 py-2">32</td>
              <td className="border border-white px-4 py-2">Adam</td>
           
            </tr>
          </tbody>
        </table>
      </div>

     
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Performance Metrics</h2>
        <table className="table-auto border border-white w-full">
          <thead>
            <tr>
              <th className="border border-white px-4 py-2">Epoch</th>
              <th className="border border-white px-4 py-2">Training Accuracy</th>
              <th className="border border-white px-4 py-2">Validation Accuracy</th>
            </tr>
          </thead>
          <tbody>
            
            <tr>
              <td className="border border-white px-4 py-2">22 (Early Stopping) </td>
              <td className="border border-white px-4 py-2">99.1%</td>
              <td className="border border-white px-4 py-2">97.3%</td>
            </tr>
          
          </tbody>
        </table>
      </div>

      <div className="mb-8 w-full content-center">
        <div className="mx-auto w-2/3">
          <h2 className="text-2xl mb-4">Metric Evaluation</h2>
          <div className="flex space-x-4">
            <div className="bg-gray-700 w-1/2">
              <h2 className="text-2xl mb-4">Confusion Matrix</h2>
            
               <img src={confusion_matrix} alt="Confusion Matrix" className="w-full h-full object-cover" /> 
            </div>
            <div className="bg-gray-700 w-1/2">
            <h2 className="text-2xl mb-4">Test Results</h2>
              <img src={results} alt="Results" className="w-full h-full object-cover" /> 
            </div>
          </div>
        </div>
      </div>

      {/* Final Model */}
      <div>
        <h2 className="text-2xl mb-4">Final Model</h2>
        <p className="mb-4">
          The trained model is saved as "efficientnet_b3_final.pth" for future use.
        </p>
      </div>

      {/* Code Section */}
      <div className="mt-8 bg-gray-700 p-4 rounded-md">
        <h2 className="text-2xl mb-4">Model Training Code</h2>
        <pre className="text-green-300 overflow-x-auto">
          {`import os
import random
import shutil
import torchvision.transforms as transforms
import torchvision.transforms.functional as F
from PIL import Image

source_train_dir = 'Training/' 
source_validation_dir = 'Testing/' 

combined_dir = 'custom_dataset-brain-mri4/combined/'
if not os.path.exists(combined_dir):
    os.makedirs(combined_dir)

def is_valid_image(file_path):
    try:
        img = Image.open(file_path)
        img.verify()
        return True
    except:
        return False

for source_dir in [source_train_dir, source_validation_dir]:
    for subfolder in os.listdir(source_dir):
        subfolder_path = os.path.join(source_dir, subfolder)
        for img in os.listdir(subfolder_path):
            img_path = os.path.join(subfolder, img)
            source_image_path = os.path.join(source_dir, img_path)
            if is_valid_image(source_image_path):
                dest_folder = os.path.join(combined_dir, subfolder)
                if not os.path.exists(dest_folder):
                    os.makedirs(dest_folder)
                shutil.copy(source_image_path, os.path.join(dest_folder, img))

all_combined_images = []
for subfolder in os.listdir(combined_dir):
    subfolder_path = os.path.join(combined_dir, subfolder)
    all_combined_images += [os.path.join(subfolder, img) for img in os.listdir(subfolder_path)]

random.shuffle(all_combined_images)

test_dir = 'custom_dataset-brain-mri4/test/'
if not os.path.exists(test_dir):
    os.makedirs(test_dir)

test_images = random.sample(all_combined_images, 10)

for img_path in test_images:
    source_path = os.path.join(combined_dir, img_path)
    if os.path.exists(source_path):
        img_name = os.path.basename(img_path)
        shutil.move(source_path, os.path.join(test_dir, img_name))
    all_combined_images.remove(img_path)  

split_index = int(0.8 * len(all_combined_images))
train_images = all_combined_images[:split_index]
validation_images = all_combined_images[split_index:]

augmentations = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(brightness=0, contrast=0.2, saturation=0.2, hue=0.2),
    transforms.RandomResizedCrop(224, scale=(0.8, 1.0)),
    transforms.RandomAffine(degrees=0, translate=(0.1, 0.1)),
    transforms.RandomAffine(degrees=0, shear=10),
    transforms.RandomVerticalFlip(),
])

final_train_dir = 'custom_dataset-brain-mri4/train/'
final_validation_dir = 'custom_dataset-brain-mri4/validation/'

if not os.path.exists(final_train_dir):
    os.makedirs(final_train_dir)
if not os.path.exists(final_validation_dir):
    os.makedirs(final_validation_dir)

for img_path in train_images:
    subfolder, img_name = os.path.split(img_path)
    img = Image.open(os.path.join(combined_dir, img_path))
    dest_folder = os.path.join(final_train_dir, subfolder)
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)
    
    for i in range(2):
        augmented_img = augmentations(img)
        augmented_img.save(os.path.join(dest_folder, f'augmented_{i}_{img_name}'))

for img_path in validation_images:
    subfolder, img_name = os.path.split(img_path)
    dest_folder = os.path.join(final_validation_dir, subfolder)
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)
    img = Image.open(os.path.join(combined_dir, img_path))
    img.save(os.path.join(dest_folder, img_name))
`}
        </pre>
      </div>
    </div>
  );
};

export default ModelPage;
