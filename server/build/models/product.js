"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
// Define the schema
const productSchema = new mongoose_1.Schema({
    ProductName: { type: String, required: true },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must be greater than 1'],
    },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stockQuantity: {
        type: Number,
        required: true,
        min: [0, "Stock can't be lower then 0"],
    },
});
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
