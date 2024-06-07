import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { IShopContext } from '../../models/interface';

export default function Navbar() {
  const {
    availableMoney,
    userInfo,
    setIsAuthenticated,
    isAuthenticated,
    googleUserInformation,
  } = useContext<IShopContext>(ShopContext);
  //  Logout function
  const logout = () => {
    setIsAuthenticated(false);
  };

  const googleUserName = googleUserInformation?.googleUserName;
  const googleUserEmail = googleUserInformation.googleUserEmail;
  return (
    <div className={styles.navbar}>
      <div>
        <h1>Curiosity Shop</h1>
      </div>
      <div className={styles.navbar_links}>
        <Link to="/">Shop</Link>
        <Link to="/purchased-items">Purchased</Link>
        <Link to="/checkout">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        {!isAuthenticated ? (
          <Link to="/auth">Login/Register</Link>
        ) : (
          <Link to="/auth" onClick={logout}>
            Logout
          </Link>
        )}
      </div>
      <div>
        <span>
          {googleUserName
            ? `${googleUserName}: ${googleUserEmail}`
            : `${userInfo.username}: ${userInfo.email}`}{' '}
        </span>
      </div>
      <span>£{availableMoney?.toFixed(2)}</span>
    </div>
  );
}
