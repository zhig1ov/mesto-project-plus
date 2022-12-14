import { Router } from 'express';
import {
  getUsers, getUserById, updateUser, updateUserAvatar, findUsersById
} from '../controllers/user';
import updateUserValidator from '../validators/updateUserValidator';
import updateUserAvatarValidator from '../validators/updateUserAvatarValidator';
import findUserValidator from '../validators/findUserValidator';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getUserById);
userRouter.get('/:id', findUserValidator(), findUsersById);
userRouter.patch('/me', updateUserValidator(), updateUser);
userRouter.patch('/me/avatar', updateUserAvatarValidator(), updateUserAvatar);

export default userRouter;
