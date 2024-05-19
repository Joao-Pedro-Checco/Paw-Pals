import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVJElKtRbdVd2wz4EFYWJohT74dCoWSIE",
    authDomain: "paw-pals-c0ab7.firebaseapp.com",
    projectId: "paw-pals-c0ab7",
    storageBucket: "paw-pals-c0ab7.appspot.com",
    messagingSenderId: "805850105358",
    appId: "1:805850105358:web:7331c46cca151cf4eb5e5f"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
