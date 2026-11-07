/**
 * AppNova Firebase Service
 * 
 * This service provides seamless optional integration with Firebase Authentication,
 * Cloud Firestore, and Firebase Storage.
 * 
 * If Firebase credentials are not supplied in .env, AppNova runs seamlessly
 * using robust local state persistence with automatic LocalStorage & IndexedDB fallbacks.
 * 
 * To connect a live Firebase Project:
 * 1. Create a Firebase project at https://console.firebase.google.com
 * 2. Enable Authentication (Email/Password)
 * 3. Create a Firestore database
 * 4. Create a Firebase Storage bucket
 * 5. Add your credentials to an `.env` file in the project root:
 *    VITE_FIREBASE_API_KEY=your_api_key
 *    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
 *    VITE_FIREBASE_PROJECT_ID=your_project_id
 *    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
 *    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
 *    VITE_FIREBASE_APP_ID=your_app_id
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

console.log(
  `[AppNova Engine] Storage Mode: ${
    isFirebaseConfigured ? 'Live Firebase Cloud' : 'Built-in LocalStorage / Mock Storage (Active)'
  }`
);
