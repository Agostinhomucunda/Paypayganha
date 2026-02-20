import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAY5uxKnQSDSCRSDurK-jbsTsu4XmFEsPM",
  authDomain: "paypayganha.firebaseapp.com",
  projectId: "paypayganha",
  storageBucket: "paypayganha.firebasestorage.app",
  messagingSenderId: "380876444602",
  appId: "1:380876444602:web:606b1430440883e53d8383"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);