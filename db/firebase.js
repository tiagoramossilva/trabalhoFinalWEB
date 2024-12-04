require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBtztcs6VZ1CcganeLhQUYB9snZM--wKvU",
  authDomain: "aulaweb-a0d1b.firebaseapp.com",
  projectId: "aulaweb-a0d1b",
  storageBucket: "aulaweb-a0d1b.firebasestorage.app",
  messagingSenderId: "814702770637",
  appId: "1:814702770637:web:55a390751489f78d62ac84",
  measurementId: "G-ZBM35H9RQW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;
