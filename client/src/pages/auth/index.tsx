import styles from './style.module.css';
import Login from './Login';
import Register from './Register';
import { signInWithGoogle } from './Firebase';

export default function AuthPage() {
  return (
    <div className={styles.auth}>
      <button className={styles.googleSignIn} onClick={signInWithGoogle}>
        Sign In with Google{' '}
      </button>
      <Register />
      <Login />
    </div>
  );
}
