// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJdwc6fPgdDPxIsdrBjlWWOD_povb62co",
  authDomain: "eformation-c0fcb.firebaseapp.com",
  projectId: "eformation-c0fcb",
  storageBucket: "eformation-c0fcb.appspot.com", // ✅ fix here (must end with .appspot.com)
  messagingSenderId: "1090569077187",
  appId: "1:1090569077187:web:a58bf52cbef328af643d76",
  measurementId: "G-Z48CY9JZ1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize and export storage
export const storage = getStorage(app);
