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
  apiKey: 'AIzaSyC6hntEWf1xAvnsSwscqEMMGFP1sIY0Q5w',
  authDomain: 'auth-for-shop.firebaseapp.com',
  projectId: 'auth-for-shop',
  storageBucket: 'auth-for-shop.appspot.com',
  messagingSenderId: '796287830020',
  appId: '1:796287830020:web:0e29324a7b45fd0a8acd51',
};

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
