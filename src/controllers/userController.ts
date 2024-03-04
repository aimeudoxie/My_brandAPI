import { Request, Response } from 'express';
import { User, IUser } from '../model/user';
import { validateUser,validateupdatedUser } from '../validations/userValidation';
import { Article, IArticle } from '../model/article';

class UserController {
  static async signup(req: Request, res: Response): Promise<Response> {
    try {
      const { firstname, lastname, username, email, password,role} = req.body;
     
      const userData = await validateUser({ firstname, lastname, username, email, password,role});

      if ('validationErrors' in userData) {
        const { validationErrors } = userData;
        return res.status(400).json({ status:'fail', validationErrors });
      }
      

      const user: IUser = await User.create(userData);

      return res.status(201).json({ status:'Success', data: user });

    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });

    }
  }

  static async getAllUsers(_req: Request, res: Response): Promise<Response> {
    try {
      const users: IUser[] = await User.find().select('-password');

      return res.status(200).json({status:'success', data: users});
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }


  static async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId: string = req.params.userId;
      const {firstname,lastname, username, email, password ,role} = req.body;

      // Validate user input
      const updatedUserData = await validateupdatedUser({ firstname,lastname,username, email, password,role });

      if ('validationErrors' in updatedUserData) {
        const { validationErrors } = updatedUserData;
        return res.status(400).json({ status:"fail", validationErrors });
      }

            const updatedUser: IUser | null = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

      if (!updatedUser) {
        return res.status(404).json({status:'fail', error: 'User not found' });
      }

      return res.status(200).json({status:'Success', data: updatedUser});
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  static async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId: string = req.params.userId;
      // Delete the user
      const deletedUser: IUser | null = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ status: "fail", error: 'User not found' });
      }
      return res.status(200).json({ status: 'Success', message: 'User successfully deleted' });

    } catch (error) {
      console.error('Error deleting user and associated comments:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserController;
