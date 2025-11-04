import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCW6LaDIhWxOzJDSlrGPVy759sw2AaDAiE",
  authDomain: "detox-usage.firebaseapp.com",
  projectId: "detox-usage",
  storageBucket: "detox-usage.firebasestorage.app",
  messagingSenderId: "846265362767",
  appId: "1:846265362767:web:f8208248a10371fad3bd3a",
  measurementId: "G-2NCYTQG7YD"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
