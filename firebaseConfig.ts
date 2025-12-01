import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// IMPORTANT: Replace the following with your app's Firebase project configuration
// For more information, visit: https://firebase.google.com/docs/web/setup#available-libraries
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY_placeholder",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase using the compat library.
// This sets up the default app instance that the modular SDK can use.
firebase.initializeApp(firebaseConfig);

// Initialize and export Firebase services.
// Firestore uses the modular SDK, while Auth uses the compat SDK.
// This is a supported pattern.
export const db = getFirestore();
export const storage = getStorage();
export const auth = firebase.auth();

// Set auth persistence to 'session' to better support sandboxed/iframe environments
// where localStorage (the default) might be restricted. This helps resolve
// 'auth/operation-not-supported-in-this-environment' errors.
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .catch((error) => {
      console.error("Firebase Auth: Could not set session persistence.", error);
  });

// Enable Firestore offline persistence to improve resilience to network issues.
// This helps the app function even when the connection to the backend is temporarily unavailable.
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // This can happen if multiple tabs are open.
      console.warn("Firestore persistence could not be enabled. This is likely because the app is open in multiple tabs.");
    } else if (err.code === 'unimplemented') {
      // The browser may not support persistence.
      console.warn("Firestore persistence is not supported in this browser.");
    }
  });