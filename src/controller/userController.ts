import { Request, Response, NextFunction } from 'express';
import { User, users } from '../models/user';

// Create an item
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone } = req.body;
    const newUser: User = { id: Date.now(), name, email, phone };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Read all users
export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Read single user
export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = users.find((i) => i.id === id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update an user
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, email, phone } = req.body;
    const userIndex = users.findIndex((i) => i.id === id);

    if (userIndex === -1) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    users[userIndex].name = name;
    users[userIndex].email = email;
    users[userIndex].phone = phone;

    res.json(users[userIndex]);
  } catch (error) {
    next(error);
  }
};

// Delete an user
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const userIndex = users.findIndex((i) => i.id === id);
    if (userIndex === -1) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const deletedItem = users.splice(userIndex, 1)[0];
    res.json(deletedItem);
  } catch (error) {
    next(error);
  }
};