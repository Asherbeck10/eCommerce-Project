import styles from './style.module.css';
import Login from './Login';
import Register from './Register';
import { signInWithGoogle } from './Firebase';
import { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { IShopContext } from '../../models/interface';
import axios from 'axios';
import { UserErrors } from '../../models/errors';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const { setGoogleUserInformation } = useContext<IShopContext>(ShopContext);
  const navigate = useNavigate();
  const handleSignInWithGoogle = async () => {
    try {
      // This function will return the google user information
      const googleUserInformation = await signInWithGoogle();
      console.log('googleUserInformation', googleUserInformation);

      //  handle the googleUserInformation
      const {
        googleUserID,
        googleUserName,
        googleUserEmail,
        googleUserIsVerified,
      } = googleUserInformation;

      // Check if the user is verified
      if (googleUserIsVerified) {
        // Send the user information to the server
        const response = await axios.post('/user/register', {
          userID: googleUserID,
          username: googleUserName,
          email: googleUserEmail,
          isGoogleUser: true,
        });

        // Check if the user is already registered
        if (response.data.message === UserErrors.EMAIL_ALREADY_EXISTS) {
          navigate('/');
        }
      } else {
        alert('Error: User Not Verified');
      }

      setGoogleUserInformation(googleUserInformation);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.auth}>
      <button className={styles.googleSignIn} onClick={handleSignInWithGoogle}>
        Sign In with Google
      </button>
      <Register />
      <Login />
    </div>
  );
}
