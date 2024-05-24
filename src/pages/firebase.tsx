// src/firebase.tsx
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwWyj1xjae-Z-Upg6WLmmpPMbTFniRnVc",
  authDomain: "fir-auth-37fd3.firebaseapp.com",
  projectId: "fir-auth-37fd3",
  storageBucket: "fir-auth-37fd3.appspot.com",
  messagingSenderId: "876106354260",
  appId: "1:876106354260:web:05cf20e779a8e63763a7c1",
  measurementId: "G-B7LSDZYN19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export Auth and Firestore instances

