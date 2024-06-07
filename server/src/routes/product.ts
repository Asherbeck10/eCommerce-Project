import { Router, Request, Response, NextFunction } from 'express';
import { IProduct, ProductModel } from '../models/product';
import { UserModel } from '../models/user';
// import { verifyToken } from './user';
import { ProductsErrors, UserErrors } from '../errors';
import { verifyToken } from './verify-token';

const router = Router();
//==================
//GET ALL PRODUCTS
//=================
router.get('/', async (_, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (err) {
    return res.status(400).json({ type: err });
  }
});

//==================
//CHECKOUT
//=================
router.post('/checkout', verifyToken, async (req: Request, res: Response) => {
  const { customerID, cartItems } = req.body;

  try {
    const user = await UserModel.findOne({ userID: customerID });
    const productIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    //check if user exists
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    //check if products exists
    if (products.length !== productIDs.length) {
      return res.status(400).json({ type: ProductsErrors.NO_PRODUCT_FOUND });
    }

    let totalPrice = 0;
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);
      if (!product) {
        return res.status(400).json({ type: ProductsErrors.NO_PRODUCT_FOUND });
      }
      //check if there is enough stock
      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ type: ProductsErrors.NOT_ENOUGH_STOCK });
      }
      totalPrice += product.price * cartItems[item];
    }

    //check if user has enough money
    if (user.availableMoney < totalPrice) {
      return res.status(400).json({ type: UserErrors.NO_AVAILABLE_FUNDS });
    }
    //update stock and user money
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } }
    );
    user.availableMoney -= totalPrice;
    user.purchaseItems.push(...productIDs);
    await user.save();
    res.json({ purchaseItems: user.purchaseItems });
  } catch (err) {
    return res.status(400).json({ type: err });
  }
});
//==================
//GET PURCHASED ITEMS
//=================

router.get(
  '/purchased-items/:customerID',
  verifyToken,
  async (req: Request, res: Response) => {
    const { customerID } = req.params;
    try {
      const user = await UserModel.findOne({ userID: customerID });
      if (!user) {
        return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      }
      const products = await ProductModel.find({
        _id: { $in: user.purchaseItems },
      });
      res.json({ purchasedItems: products });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

export { router as productRouter };
