import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user: IUser = new UserModel({ name, email, password });
    const newUser = await user.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`Attempting to delete user with ID: ${id}`);
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User deleted successfully');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(id, { name, email, password }, { new: true });
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.query;
    const query: any = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Busca case-insensitive
    }

    if (email) {
      query.email = { $regex: email, $options: 'i' }; // Busca case-insensitive
    }

    const users = await UserModel.find(query);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
