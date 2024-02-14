// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDoiWHtM3YdVl_xjnjMp-Acey9lFkcLzc",
    authDomain: "techunt-project.firebaseapp.com",
    projectId: "techunt-project",
    storageBucket: "techunt-project.appspot.com",
    messagingSenderId: "789696358541",
    appId: "1:789696358541:web:960534bccde2dfc0ad9ac4",
    measurementId: "G-ESPRKYEB31"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);