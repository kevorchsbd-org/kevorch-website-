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

let app: FirebaseApp | undefined;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (apiKey) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  try {
    auth = getAuth(app);
  } catch (e) {
    console.warn("Firebase Auth error:", e);
  }
  try {
    db = getFirestore(app);
  } catch (e) {
    console.warn("Firestore error:", e);
  }
} else {
  console.info("ℹ️ Kevorch Web App: VITE_FIREBASE_API_KEY is not set in .env. Firebase Auth & Firestore will activate when .env is configured.");
}

export { auth, db, app };
export default app;
