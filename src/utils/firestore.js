import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "vacation-social-media.firebaseapp.com",
  projectId: "vacation-social-media",
  storageBucket: "vacation-social-media.appspot.com",
  messagingSenderId: "136338690513",
  appId: "1:136338690513:web:51dc665792f7d7d97050f0",
  measurementId: "G-38Z6R9PQDP",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const firestore = getFirestore();

export default firestore;
