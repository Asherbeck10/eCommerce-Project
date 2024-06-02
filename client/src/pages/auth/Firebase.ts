// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
console.log({ firebaseConfig });
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authRegWithGoogle = getAuth(app);

// Create a new user with Google
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(authRegWithGoogle, provider);
    console.log(result.user);
  } catch (error) {
    console.log(error.message);
  }
};
//Create a new user with an email and password
export const authRegWithPassword = getAuth(app);
export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(
      authRegWithPassword,
      email,
      password
    );
    console.log(result.user);
  } catch (error) {
    console.log(error.message);
  }
};
