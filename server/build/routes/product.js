"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const user_2 = require("./user");
const errors_1 = require("../errors");
const router = (0, express_1.Router)();
exports.productRouter = router;
//==================
//GET ALL PRODUCTS
//=================
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.ProductModel.find({});
        res.json(products);
    }
    catch (err) {
        return res.status(400).json({ type: err });
    }
}));
//==================
//CHECKOUT
//=================
router.post('/checkout', user_2.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerID, cartItems } = req.body;
    try {
        const user = yield user_1.UserModel.findById(customerID);
        const productIDs = Object.keys(cartItems);
        const products = yield product_1.ProductModel.find({ _id: { $in: productIDs } });
        //check if user exists
        if (!user) {
            return res.status(400).json({ type: errors_1.UserErrors.NO_USER_FOUND });
        }
        //check if products exists
        if (products.length !== productIDs.length) {
            return res.status(400).json({ type: errors_1.ProductsErrors.NO_PRODUCT_FOUND });
        }
        let totalPrice = 0;
        for (const item in cartItems) {
            const product = products.find((product) => String(product._id) === item);
            if (!product) {
                return res.status(400).json({ type: errors_1.ProductsErrors.NO_PRODUCT_FOUND });
            }
            //check if there is enough stock
            if (product.stockQuantity < cartItems[item]) {
                return res.status(400).json({ type: errors_1.ProductsErrors.NOT_ENOUGH_STOCK });
            }
            totalPrice += product.price * cartItems[item];
        }
        //check if user has enough money
        if (user.availableMoney < totalPrice) {
            return res.status(400).json({ type: errors_1.UserErrors.NO_AVAILABLE_FUNDS });
        }
        //update stock and user money
        yield product_1.ProductModel.updateMany({ _id: { $in: productIDs } }, { $inc: { stockQuantity: -1 } });
        user.availableMoney -= totalPrice;
        user.purchaseItems.push(...productIDs);
        yield user.save();
        res.json({ purchaseItems: user.purchaseItems });
    }
    catch (err) {
        return res.status(400).json({ type: err });
    }
}));
router.get('/purchased-items/:customerID', user_2.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerID } = req.params;
    try {
        const user = yield user_1.UserModel.findById(customerID);
        if (!user) {
            return res.status(400).json({ type: errors_1.UserErrors.NO_USER_FOUND });
        }
        const products = yield product_1.ProductModel.find({
            _id: { $in: user.purchaseItems },
        });
        res.json({ purchasedItems: products });
    }
    catch (err) {
        res.status(500).json({ err });
    }
}));
