import { Schema, model } from 'mongoose';

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  availableMoney: number;
  purchaseItems: string[];
}

// Define the schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  availableMoney: { type: Number, default: 5000 },
  purchaseItems: [{ type: Schema.Types.ObjectId, ref: 'Product', default: [] }],
});

export const UserModel = model<IUser>('User', userSchema);
