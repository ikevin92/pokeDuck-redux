import firebase from 'firebase/app';
import 'firebase/auth';


// SDK de configuracion
const firebaseConfig = {
    apiKey: "AIzaSyBDplEGJWnrjTHUP8pOwmWTJ46muKzDAz8",
    authDomain: "poke-redux-fdea3.firebaseapp.com",
    projectId: "poke-redux-fdea3",
    storageBucket: "poke-redux-fdea3.appspot.com",
    messagingSenderId: "616820914195",
    appId: "1:616820914195:web:23970968f4f1b0d79da7e6"
};

// Initialize Firebase
firebase.initializeApp( firebaseConfig );

// inicializamos nuestras variables
const auth = firebase.auth();

export { auth, firebase };

