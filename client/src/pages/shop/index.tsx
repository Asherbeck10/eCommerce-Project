import styles from './style.module.css';
import { useGetProducts } from '../../hooks/useGetProducts';

import Product from './Product';
export default function ShopPage() {
  const { products } = useGetProducts();
  return (
    <div className={styles.shope}>
      <div className={styles.products}>
        {/* Map through the products and render each product*/}
        {Array.isArray(products) &&
          products.map((product) => <Product product={product} />)}
      </div>
    </div>
  );
}
