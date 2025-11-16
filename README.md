MERN-Estate 🏡

MERN-Estate is a full-stack real estate web application built with MongoDB, Express, React (Vite), and Node.js. It allows users to browse, list, and manage property listings through a modern, responsive UI and a robust backend API.

📌 Table of Contents

Features

Tech Stack

Project Structure

Getting Started
• Prerequisites
• Installation
• Environment Variables

Usage

API Endpoints

Contributing

Roadmap

License

Contact

🚀 Features

Property listings with images and details

Add, edit, delete property listings

Fully responsive UI for all devices

Filter and search properties

RESTful backend API

User authentication (if implemented)

Clean folder structure for scalability

🧰 Tech Stack

Frontend: React, Vite, Tailwind CSS
Backend: Node.js, Express
Database: MongoDB
Tools: ESLint, npm

📁 Project Structure
MERN-Estate/
│
├── api/                # Backend  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
│   └── ...
│
├── src/                # Frontend  
│   ├── components/  
│   ├── pages/  
│   └── ...
│
├── .eslintrc.cjs  
├── vite.config.js  
├── tailwind.config.js  
├── package.json  
└── README.md

🛠️ Getting Started
✔ Prerequisites

Node.js

npm or yarn

MongoDB (local or cloud)

✔ Installation

Clone the repo:

git clone https://github.com/Itwgd98/MERN-Estate.git
cd MERN-Estate


Install backend dependencies:

cd api
npm install


Install frontend dependencies:

cd ../src
npm install

🔐 Environment Variables

Create a .env file inside api folder:

MONGODB_URI=your-mongodb-url
PORT=5000
JWT_SECRET=your-secret-key

▶ Usage

Run backend:

cd api
npm run dev


Run frontend:

cd ../src
npm run dev


Open the browser:

http://localhost:5173

📡 API Endpoints (Examples)
Method	Route	Description
GET	/api/properties	Get all properties
GET	/api/properties/:id	Get single property
POST	/api/properties	Create property
PUT	/api/properties/:id	Update property
DELETE	/api/properties/:id	Delete property
🤝 Contributing

Fork the repo

Create a branch

Commit changes

Push

Open a pull request

🧭 Roadmap

User authentication

Image uploads

Map integration

Admin dashboard

Real-time chat

Deployment scripts

📄 License

Licensed under the MIT License.

📬 Contact

Author: Gagan
GitHub: https://github.com/Itwgd98
