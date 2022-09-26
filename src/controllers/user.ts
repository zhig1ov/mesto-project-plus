import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { successResponse } from '../helpers';
import NotFoundError from '../types/Errors/NotFoundError';
import { SECRET_KEY } from '../types/constants';
import { USER_NOT_FOUND_MESSAGE, INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../types/errors';
import AuthError from '../types/Errors/AuthError';

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send(successResponse(users)))
    .catch(next);
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  bcrypt.hash(req.body.password, 10).then((passwordHash) => {
    User.create({ ...req.body, password: passwordHash })
      .then((user) => {
        const { password, ...rest } = user.toObject();
        res.send(successResponse(rest));
      })
      .catch(next);
  }).catch(next);
};

const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User.findById((req as any).user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      res.status(200).send(successResponse(user));
    })
    .catch(next);
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
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

const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
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

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new AuthError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
    }
    bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new AuthError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
      }
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.cookie('httpOnly', token).send(successResponse({ token }));
    });
  }).catch(next);
};

export {
  getUsers, getUserById, createUser, updateUser, login, updateUserAvatar,
};
