// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-abb1c.firebaseapp.com",
  projectId: "mern-estate-abb1c",
  storageBucket: "mern-estate-abb1c.firebasestorage.app",
  messagingSenderId: "438317992324",
  appId: "1:438317992324:web:f32c2f27f83a51f350b5d1",
  measurementId: "G-432QY2QJ6M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
