// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBSl8vFcd4DTjlwKAhJS02jerF_7ize_cc",
  authDomain: "note-app-b9219.firebaseapp.com",
  projectId: "note-app-b9219",
  storageBucket: "note-app-b9219.firebasestorage.app",
  messagingSenderId: "211747803021",
  appId: "1:211747803021:web:baefe122a12db5f292f7c4",
  measurementId: "G-GWZRF40LS6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
