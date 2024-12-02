import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6ZS6bRYivWPEtJ9c10XN7-IvytD7LAQk",
  authDomain: "react-native-b5628.firebaseapp.com",
  projectId: "react-native-b5628",
  storageBucket: "react-native-b5628.appspot.com",
  messagingSenderId: "850392146093",
  appId: "1:850392146093:web:7d591f38c30d7fb9906624",
  measurementId: "G-R5JFNN86Y8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // This initializes Firebase Authentication
export const db = getFirestore(app); // This initializes Firestore
