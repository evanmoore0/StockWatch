
import firebase from 'firebase/compat/app';
import {initializeApp} from 'firebase/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import config from '../config';

import {getFirestore} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
  measurementId: config.FIREBASE_MEASUREMENT_ID
};



let app;

if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}

