// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXQqNS1bog1M8CZFf43w2cMCaWxRJDNqE",
  authDomain: "register-7b652.firebaseapp.com",
  projectId: "register-7b652",
  storageBucket: "register-7b652.firebasestorage.app",
  messagingSenderId: "808511852750",
  appId: "1:808511852750:web:756c2d39253338df8cc09f",
  measurementId: "G-B407X6ZSQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);