// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCojBdVt_Z7Xu9CvVnLQuUbqDWeSDXWHag",
  authDomain: "forte-ad71d.firebaseapp.com",
  projectId: "forte-ad71d",
  storageBucket: "forte-ad71d.appspot.com",
  messagingSenderId: "100053105693",
  appId: "1:100053105693:web:5dc55b07cfd835aec79af4",
  measurementId: "G-9MQ7L5QF83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
