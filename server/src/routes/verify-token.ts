// ======================
// VERIFY TOKEN
// ======================

// Import the necessary modules
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Fetch the service account keys from the environment variables
// Parse the service account key JSON
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header('authorization');
  if (authHeader) {
    admin
      .auth()
      .verifyIdToken(authHeader)
      .then((decodedToken) => {
        // If verification is successful, add the user's UID to the request
        req.body.uid = decodedToken.uid;
        next();
      })
      .catch((error) => {
        // If verification fails, return an error response
        return res.status(403).json({ error: 'Invalid token' });
      });
  } else {
    return res.status(403).json({ error: 'No token provided' });
  }
};
