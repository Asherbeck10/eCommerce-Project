import { createContext, useEffect, useState } from 'react';

import { IProduct, IShopContext } from '../models/interface';
import { useGetProducts } from '../hooks/useGetProducts';
import axios from 'axios';
import { useGetToken } from '../hooks/useGetToken';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const defaultValues: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItemsCount: () => 0,
  getTotalCartAmount: () => 0,
  checkout: () => null,
  availableMoney: 0,
  purchasedItems: [],
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  userInfo: { firstName: '', lastName: '', email: '' },
};

//======================
// CREATE A CONTEXT
//======================
export const ShopContext = createContext<IShopContext>(defaultValues);

//======================
// CRATE A PROVIDER
//======================
export const ShopContextProvider = (props: any) => {
  const { products } = useGetProducts();
  const { headers } = useGetToken();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const [cookies, setCookies] = useCookies(['access_token']);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token !== null
  );
  const [userInfo, setUserInfo] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  }>({ firstName: '', lastName: '', email: '' });

  //======================
  // Fetch available money
  //======================
  const fetchAvailableMoney = async () => {
    try {
      const res = await axios.get(
        `/user/available-money/${localStorage.getItem('userID')}`,
        { headers }
      );

      setAvailableMoney(res.data.availableMoney);
    } catch (error) {
      alert('Something went wrong');
    }
  };

  //======================
  // Fetch user info
  //======================
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(
        `/user/user-info/${localStorage.getItem('userID')}`,
        { headers }
      );
      setUserInfo(res.data);
    } catch (error) {
      alert('Something went wrong');
    }
  };

  //======================
  // Fetch purchased items
  //======================
  const fetchPurchasedItems = async () => {
    try {
      const res = await axios.get(
        `products/purchased-items/${localStorage.getItem('userID')}`,
        { headers }
      );
      setPurchasedItems(res.data.purchasedItems);
    } catch (error) {
      alert('Something went wrong');
    }
  };

  //======================
  // Get cart items count
  //======================
  const getCartItemsCount = (itemId: string): number => {
    if (cartItems[itemId]) {
      return cartItems[itemId];
    }
    return 0;
  };

  //======================
  //  Add to cart
  //======================
  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems({ ...cartItems, [itemId]: 1 });
    } else {
      setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
    }
  };

  //======================
  // Remove from cart
  //======================
  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] === 0) return;
    setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 });
  };

  //=======================
  // Update cart item count
  //=======================
  const updateCartItemCount = (itemId: string, newAmount: number) => {
    if (newAmount < 0) return;
    setCartItems({ ...cartItems, [itemId]: newAmount });
  };

  //=======================
  // Get total cart amount
  //=======================
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let productInfo: IProduct = products.find(
          (product) => product._id === itemId
        );
        totalAmount += productInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  //=======================
  // Checkout
  //=======================
  const checkout = async () => {
    // Call your backend API to process the payment
    // and clear the cart
    const body = {
      customerID: localStorage.getItem('userID'),
      cartItems,
    };
    try {
      await axios.post('/products/checkout', body, { headers });
      setCartItems({});
      fetchAvailableMoney();
      fetchPurchasedItems();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  //Fetch the available money and purchased items when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasedItems();
      fetchUserInfo();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      setCookies('access_token', null);
      setAvailableMoney(0);
      setPurchasedItems([]);
      setUserInfo({ firstName: '', lastName: '', email: '' });
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const contextValues: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemsCount,
    getTotalCartAmount,
    checkout,
    availableMoney,
    purchasedItems,
    isAuthenticated,
    setIsAuthenticated,
    userInfo, // Update the type of userInfo
  };

  return (
    <ShopContext.Provider value={contextValues}>
      {props.children}
    </ShopContext.Provider>
  );
};
