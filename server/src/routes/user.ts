import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from '../models/user';
import { UserErrors } from '../errors';
import * as admin from 'firebase-admin';
import { verifyToken } from './verify-token';
// ======================
// CREATE A NEW USER
// ======================
const router = Router();
router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password, userID, isGoogleUser } = req.body;
  try {
    // Check if the user exists
    const userIDExists = await UserModel.findOne({ email });
    if (userIDExists && !isGoogleUser) {
      return res.status(400).json({ type: UserErrors.EMAIL_ALREADY_EXISTS });
    } else if (userIDExists && isGoogleUser) {
      return res.json({ type: UserErrors.EMAIL_ALREADY_EXISTS });
    }
    console.log('isGoogleUser', isGoogleUser);
    // Hash the password
    let hashedPassword = null;
    if (!isGoogleUser) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create a new user
    const newUser = new UserModel({
      userID,
      username,
      email,
      password: hashedPassword,
      isGoogleUser,
    });
    await newUser.save();
    res.json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

// ======================
// LOGIN A USER
// ======================
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: IUser = await UserModel.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }
    // Generate a token
    // const token = jwt.sign({ id: user._id }, 'secret');
    res.json({
      // token,
      UserID: user._id,
      userUId: user.userID,
    });
  } catch (err) {
    return res.status(500).json({ type: err });
  }
});

//  ======================
// GET USER AVAILABLE MONEY
// ======================
router.get(
  '/available-money/:userID',
  verifyToken,
  async (req: Request, res: Response) => {
    const { userID } = req.params;
    try {
      const user = await UserModel.findOne({ userID: userID });
      if (!user) {
        return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      }
      res.json({ availableMoney: user.availableMoney });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);
//  ======================
// GET USER INFO
// ======================
router.get(
  '/user-info/:userID',
  verifyToken,
  async (req: Request, res: Response) => {
    const { userID } = req.params;
    try {
      const user = await UserModel.findOne({ userID: userID });
      if (!user) {
        return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      }
      res.json({
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

export { router as userRouter };
