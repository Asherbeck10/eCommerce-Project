import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from '../models/user';
import { UserErrors } from '../errors';

// ======================
// CREATE A NEW USER
// ======================
const router = Router();
router.post('/register', async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // const user = await UserModel.findOne({ username });
    const emailExists = await UserModel.findOne({ email });
    // Check if the user already exists
    // if (user) {
    //   return res.status(400).json({ type: UserErrors.USER_ALREADY_EXISTS });
    // } else {
    if (emailExists) {
      return res.status(400).json({ type: UserErrors.EMAIL_ALREADY_EXISTS });
    }
    // }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
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
    const token = jwt.sign({ id: user._id }, 'secret');
    res.json({ token, UserID: user._id });
  } catch (err) {
    return res.status(500).json({ type: err });
  }
});

//Verify the token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header('authorization');
  if (authHeader) {
    jwt.verify(authHeader, 'secret', (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

//  ======================
// GET USER AVAILABLE MONEY
// ======================
router.get(
  '/available-money/:userID',
  verifyToken,
  async (req: Request, res: Response) => {
    const { userID } = req.params;
    try {
      const user = await UserModel.findById(userID);
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
      const user = await UserModel.findById(userID);
      if (!user) {
        return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      }
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

// ======================
export { router as userRouter };
