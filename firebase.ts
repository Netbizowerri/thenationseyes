import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import localConfig from './firebase-applet-config.json';

interface AppletConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  firestoreDatabaseId?: string;
}

const config = localConfig as AppletConfig;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || config.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || config.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || config.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE || config.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID || config.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || config.appId,
};

const firestoreDatabaseId =
  import.meta.env.VITE_FIREBASE_DB_ID ||
  config.firestoreDatabaseId ||
  '(default)';

let app: ReturnType<typeof initializeApp>;
let db: ReturnType<typeof getFirestore>;
let auth: ReturnType<typeof getAuth>;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app, firestoreDatabaseId);
  auth = getAuth(app);
} catch (error) {
  if (import.meta.env.DEV) console.error('Firebase initialization failed:', error);
  throw error;
}

export { db, auth };
