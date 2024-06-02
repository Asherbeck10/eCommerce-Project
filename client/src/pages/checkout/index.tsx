import { useContext } from 'react';
import { useGetProducts } from '../../hooks/useGetProducts';
import styles from './style.module.css';
import { ShopContext } from '../../context/shop-context';
import { IProduct, IShopContext } from '../../models/interface';
import CartItem from './cart-item';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { products } = useGetProducts();

  const { getCartItemsCount, getTotalCartAmount, checkout } =
    useContext<IShopContext>(ShopContext);

  const navigate = useNavigate();
  //
  const totalCartAmount = getTotalCartAmount();
  return (
    <div className={styles.cart}>
      <h1>Your Cart Items</h1>
      <div>
        <div className={styles.card}>
          {products.map((product: IProduct) => {
            if (getCartItemsCount(product._id) !== 0) {
              return <CartItem product={product} />;
            }
            return null;
          })}
        </div>
        {totalCartAmount > 0 ? (
          <div className={styles.checkout}>
            <p>Subtotal:£{totalCartAmount.toFixed(2)}</p>
            <button onClick={() => navigate('/')}>Continue Shopping</button>
            <button onClick={checkout}>Checkout</button>
          </div>
        ) : (
          <h1>Your Shopping Cart is Empty</h1>
        )}
      </div>
    </div>
  );
}
