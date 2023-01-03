import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsTaTl4-S9lV_hL7tJamQ7gRwx0bZBCSo",
  authDomain: "another-chat-yvntrix.firebaseapp.com",
  projectId: "another-chat-yvntrix",
  storageBucket: "another-chat-yvntrix.appspot.com",
  messagingSenderId: "502384049195",
  appId: "1:502384049195:web:89150df4202911e7c1be6e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

