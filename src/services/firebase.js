import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    //Todo: add project details here
    apiKey: "AIzaSyDZqCQLHd6-0NVU4bIcIJpNXUUrwzvSYWw",
    authDomain: "soccer-brackets.firebaseapp.com",
    projectId: "soccer-brackets",
    storageBucket: "soccer-brackets.appspot.com",
    messagingSenderId: "252887233677",
    appId: "1:252887233677:web:94311e5fd1411469b11ec4"
}

firebase.initializeApp(config);

// Setup a provider .. Google, Facebook, Github etc
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Reference to firebase auth
const auth = firebase.auth();

// Set up auth functions
function login() {
    auth.signInWithPopup(googleProvider);
}

function logout() {
    auth.signOut();
}

// Export the auth functions
export {
    login,
    logout,
    auth
}