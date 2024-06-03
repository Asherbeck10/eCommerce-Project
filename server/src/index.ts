import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { userRouter } from './routes/user';
import { productRouter } from './routes/product';
import path from 'path';

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

//==========================================
// Serve static files from the React app
//==========================================
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../../client/build')));

  // The "catchall" handler: for any request that doesn't include an API route,
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
}
// Connect to MongoDB
mongoose.connect(
  `mongodb+srv://${username}:${password}@ecommerce.hotpp0j.mongodb.net/ecommerce`
);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB: ', err);
});

app.listen(3001, () => console.log('Server is running on port 3001'));
