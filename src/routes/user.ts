import { Router } from 'express';
import {
  getUsers, createUser, findUsersById, updateUser, updateUserAvatar,
} from '../controllers/user';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', findUsersById);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

export default userRouter;
