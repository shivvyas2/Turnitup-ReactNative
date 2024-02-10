import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyCvNGVxOi2jCiBpL_gzNFZnKMK6-u7FsXw",
    authDomain: "sub-hackathon.firebaseapp.com",
    projectId: "sub-hackathon",
    storageBucket: "sub-hackathon.appspot.com",
    messagingSenderId: "155419562508",
    appId: "1:155419562508:web:f2b212984cd64cf09fd429",
    measurementId: "G-6XPDPB3BJJ"
  };
  
// let app;

// if ( firebase.apps.length === 0){
//   app = firebase.initializeApp(firebaseConfig);
// }else{
//   app = firebase.app(); // or else it will keep on initializing

// }


// const db = app.firestore();
// const auth = firebase.auth();

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = firebase.auth();
// const storage = firebase.storage;


export{ db, auth };