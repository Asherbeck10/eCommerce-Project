import { useContext } from 'react';
import { IProps, IShopContext } from '../../models/interface';
import styles from './style.module.css';
import { ShopContext } from '../../context/shop-context';

export default function CartItem(props: IProps) {
  const { _id, productName, price, imageUrl } = props.product;

  const { addToCart, removeFromCart, updateCartItemCount, getCartItemsCount } =
    useContext<IShopContext>(ShopContext);

  // The getCartItemsCount function is used to get the count of items in the cart.
  const cartItemCount = getCartItemsCount(_id);

  return (
    <div className={styles.cartItem}>
      <img src={imageUrl} alt={productName} />
      <div>
        <h3>{productName}</h3>
        <p>Price: ${price}</p>
        <div className={styles.countHandler}>
          <button onClick={() => removeFromCart(_id)}>-</button>
          <input
            type="number"
            value={cartItemCount}
            onChange={(e) => updateCartItemCount(_id, Number(e.target.value))}
          />
          <button onClick={() => addToCart(_id)}>+</button>
        </div>
      </div>
    </div>
  );
}
