import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { userRouter } from './routes/user';
import { productRouter } from './routes/product';

const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

const password = process.env.MONGO_PASSWORD;
const username = process.env.MONGO_USERNAME;
// Routes
app.use('/user', userRouter);
app.use('/products', productRouter);

mongoose.connect(
  `mongodb+srv://${username}:${password}@ecommerce.hotpp0j.mongodb.net/ecommerce`
);

app.listen(3001, () => console.log('Server is running on port 3001'));
