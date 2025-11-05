
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getPerformance } from 'firebase/performance';
import { getRemoteConfig } from 'firebase/remote-config';

// TODO: Replace with your own Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getDatabase(app);
const perf = getPerformance(app);
const remoteConfig = getRemoteConfig(app);

// Set default values for Remote Config
remoteConfig.defaultConfig = {
  "app_title": "Personal Finance Tracker"
};

export { auth, db, perf, remoteConfig };
