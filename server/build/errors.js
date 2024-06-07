"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsErrors = exports.UserErrors = void 0;
var UserErrors;
(function (UserErrors) {
    UserErrors["NO_USER_FOUND"] = "No user found";
    UserErrors["WRONG_CREDENTIALS"] = "Wrong credentials";
    UserErrors["USER_ALREADY_EXISTS"] = "User already exists";
    UserErrors["NO_AVAILABLE_FUNDS"] = "No available money";
    UserErrors["EMAIL_ALREADY_EXISTS"] = "Email already exists";
})(UserErrors || (exports.UserErrors = UserErrors = {}));
var ProductsErrors;
(function (ProductsErrors) {
    ProductsErrors["NO_PRODUCT_FOUND"] = "No product found";
    ProductsErrors["NOT_ENOUGH_STOCK"] = "Not enough stock";
})(ProductsErrors || (exports.ProductsErrors = ProductsErrors = {}));
