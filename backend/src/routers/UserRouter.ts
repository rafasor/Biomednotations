import express, { Request, Response } from 'express';
import { createUser } from '../controllers/UserController';

const UserRouters = express.Router();

UserRouters.get('/users', (req: Request, res: Response) => {
  // Lógica para buscar e retornar os usuários
  res.json({ message: 'Rota GET /users' });
});

UserRouters.post('/users', createUser) 

export default UserRouters;

