import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetToken } from './useGetToken';
import { IProduct } from '../models/interface';

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]); // Added type annotation and initialized as an empty array
  const { headers } = useGetToken();

  //fetchProducts function is defined to fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products', {
        headers,
      });
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      alert('ERROR:Failed to fetch products');
    }
  };

  //useEffect hook is used to fetch products when the component is mounted
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);
  return { products };
};
