import { Schema, model } from 'mongoose';

export interface IProduct {
  _id?: string;
  ProductName: string;
  price: number;
  description: string;
  imageUrl: string;
  stockQuantity: number;
}

// Define the schema
const productSchema = new Schema<IProduct>({
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

export const ProductModel = model<IProduct>('Product', productSchema);
