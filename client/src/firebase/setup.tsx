import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDDKb316iW6T2myf1H4n6ANJTWthvGBB5Y",
    authDomain: "second-project-2ad44.firebaseapp.com",
    projectId: "second-project-2ad44",
    storageBucket: "second-project-2ad44.appspot.com",
    messagingSenderId: "1074024990122",
    appId: "1:1074024990122:web:9b177991c65d6b71e217d3"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)