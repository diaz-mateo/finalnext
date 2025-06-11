// src/lib/firebaseConfig.js
// -----------------------------------------------------------------------
// Este archivo inicializa la app de Firebase para usar Firestore.
// Sustituye los valores de firebaseConfig por los tuyos exactamente como
// los copiaste de la consola de Firebase.
// -----------------------------------------------------------------------

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Sólo importa getAnalytics si vas a usarlo. Si no, puedes comentarlo:
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDbmDvXU9qAa7EzNjz156eNnJhMvOKA_ng",
  authDomain: "harmonypsico-app.firebaseapp.com",
  projectId: "harmonypsico-app",
  storageBucket: "harmonypsico-app.appspot.com",      // <-- corregí el dominio: debe ser ".appspot.com"
  messagingSenderId: "960933184259",
  appId: "1:960933184259:web:b52fb0cad335bd401edf36",
  measurementId: "G-CZE0WS1CQQ"
};

// Evitamos crear múltiples instancias en hot reload / recarga en Next.js
const app = !getApps().length 
  ? initializeApp(firebaseConfig) 
  : getApps()[0];

// Si necesitas Analytics, descomenta estas líneas:
// const analytics = getAnalytics(app);

export const db = getFirestore(app);