import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import localConfig from './firebase-applet-config.json';

// Use environment variables if set (Vercel production),
// otherwise fall back to the local JSON file (local development).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || localConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || localConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || localConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE || localConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID || localConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || localConfig.appId,
};

const firestoreDatabaseId =
  import.meta.env.VITE_FIREBASE_DB_ID ||
  (localConfig as any).firestoreDatabaseId ||
  '(default)';

let app: ReturnType<typeof initializeApp>;
let db: ReturnType<typeof getFirestore>;
let auth: ReturnType<typeof getAuth>;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app, firestoreDatabaseId);
  auth = getAuth(app);
} catch (error) {
  console.error('Firebase initialization failed:', error);
  throw error;
}

export { db, auth };
