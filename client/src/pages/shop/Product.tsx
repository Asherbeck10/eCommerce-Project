import { useContext } from 'react';
import { IProduct, IShopContext } from '../../models/interface';
import styles from './style.module.css';
import { ShopContext } from '../../context/shop-context';

interface Prop {
  product: IProduct;
}

export default function Product({ product }: Prop) {
  const { _id, productName, price, description, stockQuantity, imageUrl } =
    product;
  //
  const { addToCart, getCartItemsCount } =
    useContext<IShopContext>(ShopContext);

  const count = getCartItemsCount(_id);

  return (
    <div className={styles.product}>
      <img src={imageUrl} alt={productName} />
      <h3>{productName}</h3>
      <p>{description}</p>
      <p>£{price}</p>
      <button className={styles.addToCartBttn} onClick={() => addToCart(_id)}>
        Add to cart
        {/* Show the number of items in the cart if it is greater than 0 */}
        {count > 0 && <>({count})</>}
      </button>

      {/* Show the stock quantity if it is greater than 0 */}
      {stockQuantity > 0 ? (
        <p className={styles.stock}>In stock: {stockQuantity}</p>
      ) : (
        <p className={styles.stock}>Out of stock</p>
      )}
    </div>
  );
}
