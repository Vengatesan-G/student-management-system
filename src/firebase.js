import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDdiMVwos8xl-_yWj97aJRjlqK5THc_FlE",
    authDomain: "student-management-db249.firebaseapp.com",
    projectId: "student-management-db249",
    storageBucket: "student-management-db249.firebasestorage.app",
    messagingSenderId: "278802405239",
    appId: "1:278802405239:web:6b333f31bd06ea0b017372"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);