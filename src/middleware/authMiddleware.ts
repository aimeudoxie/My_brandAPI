// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../model/user'; 

import dotenv from 'dotenv';
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) throw new Error('You don\'t have access to do that action');
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }

    jwt.verify( token , process.env.JWT_SECRET || 'fallback_secret_key', async (err, decodedToken) => {
      if (err) {
        console.error('Error verifying token:', err);
        return res.status(403).json({ status:'Fail', error: 'Invalid token' });
      }

      //console.log('Decoded Token:', decodedToken);

      const userId = (decodedToken as { userId: string }).userId;

      // Check if the user exists
      const user: IUser | null = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      req.user = user; // Attach user to the request for later use
      next();
    });
  } catch (error) {
    console.error('Error during token authentication:', error);
    return res.status(500).json({ status:'fail', error: 'Internal Server Error' });
  }
}
export async function authenticateAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    // Ensure that the user has been authenticated first
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Error during admin authentication:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}