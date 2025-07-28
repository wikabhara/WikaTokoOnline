// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgCy7MVTL-HQO-prPlwasvCvJpxY8XGEk",
  authDomain: "wikatokoonline.firebaseapp.com",
  projectId: "wikatokoonline",
  storageBucket: "wikatokoonline.firebasestorage.app",
  messagingSenderId: "389803690833",
  appId: "1:389803690833:web:899081e418d0e39edd2170",
  measurementId: "G-H8106RFC9Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
