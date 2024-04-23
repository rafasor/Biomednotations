import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user
    const user: IUser = new UserModel({ name, email, password });
    const newUser = await user.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};