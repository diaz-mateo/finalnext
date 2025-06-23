// src/lib/firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbmDvXU9qAa7EzNjz156eNnJhMvOKA_ng",
  authDomain: "harmonypsico-app.firebaseapp.com",
  projectId: "harmonypsico-app",
  storageBucket: "harmonypsico-app.appspot.com",
  messagingSenderId: "960933184259",
  appId: "1:960933184259:web:b52fb0cad335bd401edf36",
  measurementId: "G-CZE0WS1CQQ"
};

const app = !getApps().length 
  ? initializeApp(firebaseConfig) 
  : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export { app };