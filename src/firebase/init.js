import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDTniL7aCnBXowfRVPd0IkbiXvq3X6tprM",
    authDomain: "lebillion-2297b.firebaseapp.com",
    databaseURL: "https://lebillion-2297b.firebaseio.com",
    projectId: "lebillion-2297b",
    storageBucket: "",
    messagingSenderId: "1042391836369",
    appId: "1:1042391836369:web:e18e365c6c963d9f"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()