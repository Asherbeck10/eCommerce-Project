import { Schema, model } from 'mongoose';

export interface IUser {
  _id?: string;
  userID: string;
  username: string;
  email: string;
  password: string;
  availableMoney: number;
  purchaseItems: string[];
  isGoogleUser: boolean;
}

// Define the schema
const userSchema = new Schema<IUser>({
  userID: { type: String, required: true },
  username: { type: String, required: true },
  isGoogleUser: { type: Boolean, default: false },
  password: {
    type: String,
    required: function () {
      // If isGoogleUser is true, the password is not required
      return !this.isGoogleUser;
    },
  },
  email: { type: String, required: true },
  availableMoney: { type: Number, default: 5000 },
  purchaseItems: [{ type: Schema.Types.ObjectId, ref: 'Product', default: [] }],
});

export const UserModel = model<IUser>('User', userSchema);
