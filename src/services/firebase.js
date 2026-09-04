import { initializeApp, getApps, getApp, } from 'firebase/app';
import { getAuth, } from 'firebase/auth';
import { getFirestore, } from 'firebase/firestore';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBQ0ALujnUk7hRYYkcok0Gb5WsTVXbeA2o";
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kevorch-website.firebaseapp.com";
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "kevorch-website";
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kevorch-website.firebasestorage.app";
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "547511257360";
const appId = import.meta.env.VITE_FIREBASE_APP_ID || "1:547511257360:web:56494c9bf3c3e1ef53fd95";
const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-4XG54V7EHP";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
export default app;
