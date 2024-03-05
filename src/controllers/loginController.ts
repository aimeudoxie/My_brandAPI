import { Request, Response } from 'express';
import {User,  IUser } from '../model/user';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class LoginController {
  static async UserLogin(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const authUser: IUser | null = await User.findOne({ email });

      if (!authUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (authUser.password) {
        const passwordMatch = await compare(password, authUser.password);

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: authUser._id, username: authUser.username }, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '1h' });


        return res.status(200).json({user: { _id: authUser._id, username: authUser.username, email: authUser.email, role:authUser.role }, token });

        
      } else {
        return res.status(500).json({ error: 'User password not available' });
      }
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default LoginController;
