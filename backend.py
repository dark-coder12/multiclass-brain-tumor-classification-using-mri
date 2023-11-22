from flask import Flask, request, jsonify
import torch
from torchvision import transforms
from PIL import Image
from io import BytesIO
import base64
import numpy as np
import cv2
import timm
import torch.nn as nn

from flask_cors import CORS  

app = Flask(__name__)
CORS(app) 

class CustomModel(nn.Module):
    def __init__(self, num_classes=5):
        super(CustomModel, self).__init__()
        self.transfer_learning_model = timm.create_model('efficientnet_b3', pretrained=True)
        self.transfer_learning_model.classifier = nn.Sequential(
            nn.Linear(self.transfer_learning_model.classifier.in_features, 256),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes)
        )

    def forward(self, x):
        return self.transfer_learning_model(x)

model = CustomModel()

state_dict = torch.load('efficientnet_b3_final.pth', map_location=torch.device('cpu'))

new_state_dict = {}
prefix = "transfer_learning_model."

for key, value in state_dict.items():
    new_key = prefix + key
    new_state_dict[new_key] = value


model.load_state_dict(new_state_dict)

model.eval()

transform = transforms.Compose([
    transforms.RandomResizedCrop(150, scale=(0.8, 1.0)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(degrees=15),
    transforms.ColorJitter(brightness=0, contrast=0.1, saturation=0.1, hue=0.1),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

@app.route('/predict', methods=['POST'])
def predict():
    try:
        img_data = request.get_json()['image']

        img_data = base64.b64decode(img_data)
        img = Image.open(BytesIO(img_data))

        img = transform(img).unsqueeze(0)

        with torch.no_grad():
            output = model(img)

        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        predicted_class = torch.argmax(probabilities).item()
        predicted_probability = probabilities[predicted_class].item()

        print("Predicted Class:", predicted_class)
        print("Predicted Probability:", predicted_probability)

        return jsonify({
            'prediction': predicted_class,
            'probability': predicted_probability
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)