import { Router } from 'express';
import {
  getUsers, getUserById, updateUser, updateUserAvatar,
} from '../controllers/user';
import updateUserValidator from '../validators/updateUserValidator';
import updateUserAvatarValidator from '../validators/updateUserAvatarValidator';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getUserById);
userRouter.patch('/me', updateUserValidator(), updateUser);
userRouter.patch('/me/avatar', updateUserAvatarValidator(), updateUserAvatar);

export default userRouter;
