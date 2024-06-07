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
    googleUserAccessToken: string;
    googleUserID: string;
  };
  setGoogleUserInformation: (googleUserInformation: {
    googleUserName: string;
    googleUserEmail: string;
    googleUserIsVerified: boolean;
    googleUserAccessToken: string;
    googleUserID: string;
  }) => void;
}

export interface IProps {
  product: IProduct;
}

export interface IUser {
  _id?: string;
  userID: string;
  username: string;
  email: string;
  password: string;
  availableMoney: number;
  purchaseItems: string[];
}
