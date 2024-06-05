export interface IProduct {
  _id: string;
  productName: string;
  price: number;
  description: string;
  stockQuantity: number;
  imageUrl: string;
}
export interface IShopContext {
  addToCart: (item: string) => void;
  removeFromCart: (item: string) => void;
  updateCartItemCount: (item: string, newAmount: number) => void;
  getCartItemsCount: (itemId: string) => number;
  getTotalCartAmount: () => number;
  checkout: () => void;
  availableMoney: number;
  purchasedItems: IProduct[];
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  userInfo: { username: string; email: string };
  googleUserInformation: {
    googleUserName: string;
    googleUserEmail: string;
    googleUserIsVerified: boolean;
  };
  setGoogleUserInformation: (googleUserInformation: {
    googleUserName: string;
    googleUserEmail: string;
    googleUserIsVerified: boolean;
  }) => void;
}

export interface IProps {
  product: IProduct;
}

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  availableMoney: number;
  purchaseItems: string[];
}
