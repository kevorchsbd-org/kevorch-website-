import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || "";
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kevorch-website.firebaseapp.com";
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "kevorch-website";
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kevorch-website.appspot.com";
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "";
const appId = import.meta.env.VITE_FIREBASE_APP_ID || "";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!getApps().length) {
  if (!apiKey) {
    console.warn("⚠️ Kevorch Web App: VITE_FIREBASE_API_KEY is not configured in .env file. Please add your real Firebase API Key from Firebase Console to .env file.");
  }
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

try {
  auth = getAuth(app);
} catch (e) {
  console.warn("Firebase Auth initialization waiting for valid VITE_FIREBASE_API_KEY in .env:", e);
  auth = null as unknown as Auth;
}

try {
  db = getFirestore(app);
} catch (e) {
  console.warn("Firestore initialization waiting for valid VITE_FIREBASE_API_KEY in .env:", e);
  db = null as unknown as Firestore;
}

export { auth, db, app };
export default app;
