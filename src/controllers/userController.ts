import { Request, Response } from 'express';
import User, { IUser } from '../model/user';

import { hash } from 'bcryptjs'

class UserController {
  
  static async signup(req: Request, res: Response): Promise<Response> {
    try {
      const { firstname,lastname,username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
      }
      const hashedPassword = await hash(password, 10);

      const user: IUser = await User.create({ firstname,lastname,username, email, password: hashedPassword });
      return res.status(201).json(user);

    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAllUsers(_req: Request, res: Response): Promise<Response> {
    try {
      const users: IUser[] = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId: string = req.params.userId;
      const { username, email, password } = req.body;


      if (password) {

        const hashedPassword = await hash(password, 10);
        req.body.password = hashedPassword;
      }

      const updatedUser: IUser | null = await User.findByIdAndUpdate(userId, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId: string = req.params.userId;
      const deletedUser: IUser | null = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserController;
