MERN-Estate 🏡

MERN-Estate is a full-stack real estate web application built using MongoDB, Express, React (Vite), and Node.js. The platform allows users to browse, list, and manage properties through a fast, responsive, and modern interface.

🔗 Live Website:
https://gagan-mern-estate.onrender.com/

📌 Table of Contents

Features

Live Demo

Tech Stack

Project Structure

Getting Started

Environment Variables

Usage

API Endpoints

Contributing

Roadmap

License

Contact

🚀 Features

Browse all property listings

Add, edit, delete property listings

Fully responsive UI

Search and filter functionality

REST API backend

Modern UX with clean design

Authentication ready (if implemented)

🌐 Live Demo

Production Deployment:
https://gagan-mern-estate.onrender.com/

🧰 Tech Stack

Frontend: React, Vite, Tailwind CSS
Backend: Node.js, Express
Database: MongoDB
Tools: ESLint, npm

📁 Project Structure
MERN-Estate/
│
├── api/                 # Backend  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
│   └── ...
│
├── src/                 # Frontend  
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

npm or Yarn

MongoDB

✔ Installation

Clone the repo:

git clone https://github.com/Itwgd98/MERN-Estate.git
cd MERN-Estate


Backend installation:

cd api
npm install


Frontend installation:

cd ../src
npm install

🔐 Environment Variables

Create a .env file inside api:

MONGODB_URI=your-mongo-url
PORT=5000
JWT_SECRET=your-secret-key

▶ Usage

Run backend:

cd api
npm run dev


Run frontend:

cd ../src
npm run dev


Open:

http://localhost:5173

📡 API Endpoints
Method	Route	Description
GET	/api/properties	Get all properties
GET	/api/properties/:id	Get one property
POST	/api/properties	Create property
PUT	/api/properties/:id	Update property
DELETE	/api/properties/:id	Delete property
🤝 Contributing

Fork repository

Create a new branch

Commit your changes

Push branch

Submit pull request

🧭 Roadmap

Authentication

Image upload

Map integration

Admin dashboard

Deployment automation

Messaging between users

📄 License

MIT License

📬 Contact

Author: Gagan
Live App: https://gagan-mern-estate.onrender.com/

GitHub: https://github.com/Itwgd98
