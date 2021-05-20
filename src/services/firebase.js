import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    //Todo: add project details here
    apiKey: "AIzaSyA49lgnRIeOe08V-r2RZB-x-Wb41sh6-PA",
    authDomain: "react-dev-skills-1d532.firebaseapp.com",
    projectId: "react-dev-skills-1d532",
    storageBucket: "react-dev-skills-1d532.appspot.com",
    messagingSenderId: "360515302015",
    appId: "1:360515302015:web:27ddda6466355e3fe7c54a"
}

firebase.initializeApp(config);

// Setup a provider .. Google, Facebook, Github etc
const googleProvider = new firebase.auth.GoogleAuthProvider();


// Set up auth functions
function login() {
    firebase.auth().signInWithPopup(googleProvider);
}

function logout() {
    firebase.auth().signOut();
}

// Export the auth functions
export {
    login,
    logout
}