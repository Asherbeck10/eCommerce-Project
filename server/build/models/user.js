"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// Define the schema
const userSchema = new mongoose_1.Schema({
    // username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    availableMoney: { type: Number, default: 5000 },
    purchaseItems: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', default: [] }],
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
