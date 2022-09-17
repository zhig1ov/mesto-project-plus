import { Router } from 'express';
import {
  getUsers, createUser, findUsersById, updateUser,
} from '../controllers/user';

const userRouter = Router();

userRouter.post('/users', createUser);
userRouter.get('/users', getUsers);
userRouter.get('/:id', findUsersById);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUser);

export default userRouter;
