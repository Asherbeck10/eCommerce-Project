"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./routes/user");
const product_1 = require("./routes/product");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const password = process.env.MONGO_PASSWORD;
const username = process.env.MONGO_USERNAME;
// Serve static files from the React app
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
// The "catchall" handler: for any request that doesn't include an API route,
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../client/build', 'index.html'));
});
// Routes
app.use('/user', user_1.userRouter);
app.use('/products', product_1.productRouter);
mongoose_1.default.connect(`mongodb+srv://${username}:${password}@ecommerce.hotpp0j.mongodb.net/ecommerce`);
app.listen(3001, () => console.log('Server is running on port 3001'));
