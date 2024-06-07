// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authRegWithGoogle = getAuth(app);

// Create a new user with Google
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(authRegWithGoogle, provider);
    // Get user information
    const user = result.user;
    const googleUserName = user.displayName;
    const googleUserEmail = user.email;
    const googleUserIsVerified = user.emailVerified;
    const googleUserID = user.uid;
    const googleUserAccessToken = await user.getIdToken();
    return {
      googleUserName,
      googleUserEmail,
      googleUserIsVerified,
      googleUserID,
      googleUserAccessToken,
    };
  } catch (error) {
    console.error(error.message);
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
    const user = result.user;
    const passwordUserID = user.uid;
    return { passwordUserID };
  } catch (error) {
    alert('Error:Email Already Exists');
  }
};

//Get email and password user from Firebase

export const signInUserEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const result = await signInWithEmailAndPassword(
      authRegWithPassword,
      email,
      password
    );
    const emailUserName = result.user.displayName; // Declare and initialize emailUserName
    const emailUserEmail = result.user.email; // Declare and initialize emailUserEmail
    const emailUserIsVerified = result.user.emailVerified; // Declare and initialize emailUserIsVerified
    const emailUserID = result.user.uid; // Declare and initialize emailUserID
    const emailUserAccessToken = await result.user.getIdToken(); // Declare and initialize emailUserAccessToken
    return {
      emailUserName,
      emailUserEmail,
      emailUserIsVerified,
      emailUserID,
      emailUserAccessToken,
    };
  } catch (error) {
    console.error(error.message);
  }
};
