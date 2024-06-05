import styles from './style.module.css';
import Login from './Login';
import Register from './Register';
import { signInWithGoogle } from './Firebase';
import { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { IShopContext } from '../../models/interface';

export default function AuthPage() {
  const { setGoogleUserInformation } = useContext<IShopContext>(ShopContext);
  const handleSignInWithGoogle = async () => {
    try {
      // This function will return the google user information
      const googleUserInformation = await signInWithGoogle();
      //  handle the googleUserInformation
      console.log(googleUserInformation);
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
