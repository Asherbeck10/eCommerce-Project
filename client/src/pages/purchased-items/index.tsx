import { useContext } from 'react';
import styles from './style.module.css';
import { ShopContext } from '../../context/shop-context';
export default function PurchasedItemsPage() {
  const { purchasedItems, addToCart, getCartItemsCount } =
    useContext(ShopContext);
  return (
    <div className={styles.purchased_items_page}>
      <h1>Previously Purchased Items</h1>
      <div className={styles.purchased_items}>
        {purchasedItems.map((item) => {
          const count = getCartItemsCount(item._id);
          return (
            <div key={item._id} className={styles.item}>
              <h3>{item.productName}</h3>
              <img src={item.imageUrl} alt={item.productName} />
              <p>{item.price}</p>
              <button onClick={() => addToCart(item._id)}>
                Buy Again {count > 0 && <>({count})</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
