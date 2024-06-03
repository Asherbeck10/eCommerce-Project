import styles from './style.module.css';
import { useState, SyntheticEvent, useContext } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { UserErrors } from '../../models/errors';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import { IShopContext } from '../../models/interface';

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/user/login', {
        email,
        password,
      });
      //set the access token in the cookies and user id in the local storage
      setCookies('access_token', response.data.token);
      localStorage.setItem('userID', response.data.UserID);
      //set the isAuthenticated to true
      setIsAuthenticated(true);
      //navigate to the shop page
      navigate('/');
    } catch (err) {
      //check the error type and display the error message
      let errorMessage = '';
      switch (err?.response.data?.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = 'Error:No User Found';
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = 'Error:Wrong Credentials';
          break;
        default:
          errorMessage = 'Error:Something went wrong';
          break;
      }
      alert('Error:' + errorMessage);
    }
  };

  return (
    <div className={styles.auth_container_login}>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className={styles.form_group}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
