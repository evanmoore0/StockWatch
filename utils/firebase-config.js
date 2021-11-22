// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {initializeApp} from "firebase/app";
import * as firebase from 'firebase'
import 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzTQ1xZof0yDQah9bVvKWLTNmDHxw6dRU",
  authDomain: "stockwatchfirebase.firebaseapp.com",
  projectId: "stockwatchfirebase",
  storageBucket: "stockwatchfirebase.appspot.com",
  messagingSenderId: "183915796202",
  appId: "1:183915796202:web:e279d71aa0bcd710cb2993",
  measurementId: "G-X9RFPNWHD4"
};

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//  }else {
//     firebase.app(); // if already initialized, use that one
//  }

let app;
if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth}

