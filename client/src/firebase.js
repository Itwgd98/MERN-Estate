// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-abb1c.firebaseapp.com",
  projectId: "mern-estate-abb1c",
  storageBucket: "mern-estate-abb1c.appspot.com",
  messagingSenderId: "438317992324",
  appId: "1:438317992324:web:f32c2f27f83a51f350b5d1",
  measurementId: "G-432QY2QJ6M",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
