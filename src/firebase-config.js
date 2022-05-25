// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUKRZmiYXFTnQc81WVamykzJNsdMo_e5c",
  authDomain: "tasksmanager-b4f49.firebaseapp.com",
  databaseURL: "https://tasksmanager-b4f49-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tasksmanager-b4f49",
  storageBucket: "tasksmanager-b4f49.appspot.com",
  messagingSenderId: "205459489399",
  appId: "1:205459489399:web:4eb6c585101a0db7303c72",
  measurementId: "G-4HB7SYW8C5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// const analytics = getAnalytics(app);