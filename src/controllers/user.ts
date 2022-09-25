import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { successResponse } from '../helpers';
import { USER_NOT_FOUND_MESSAGE } from '../types/errors';
import NotFoundError from '../types/Errors/NotFoundError';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send(successResponse(users)))
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  User.create(req.body)
    .then((user) => res.send(successResponse(user)))
    .catch(next);
};

export const findUsersById = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(successResponse(user));
    })
    .catch(next);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate((req as any).user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      res.status(200).send(successResponse(user));
    })
    .catch(next);
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate((req as any).user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
  .then((user) => {
    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    }
    res.status(200).send(successResponse(user));
  })
  .catch(next);
};