import firebase from "firebase/app";
import "firebase/storage";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBme9Uo23O2ML__D8p1by8fmNxJerUvDik",
  authDomain: "chuggr-6a851.firebaseapp.com",
  databaseURL: "https://chuggr-6a851.firebaseio.com",
  projectId: "chuggr-6a851",
  storageBucket: "chuggr-6a851.appspot.com",
  messagingSenderId: "1046653963698",
  appId: "1:1046653963698:web:e26ab6a28553d00f5be8ab",
  measurementId: "G-5TMDD3N2B2",
};

export const firebaseClient = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
};