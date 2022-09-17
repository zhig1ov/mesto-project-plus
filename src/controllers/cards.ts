import { Request, Response, NextFunction } from 'express';
import { Card } from '../models/cards';
import { successResponse } from '../helpers';
import { POST_NOT_FOUND_MESSAGE } from '../types/errors';
import NotFoundError from '../types/Errors/NotFoundError';
import ForbiddenError from '../types/Errors/ForbiddenError';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.status(200).send(successResponse(cards)))
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  Card.create({ ...req.body, owner: (req as any).user._id })
    .then((card) => res.status(201).send(successResponse(card)))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findById(req.params.cardId).then((card) => {
    if ((card?.owner as any).equals((req as any).user._id)) {
      Card.deleteOne({ _id: req.params.cardId })
        .then((data) => {
          if (data.deletedCount === 0) {
            throw new NotFoundError(POST_NOT_FOUND_MESSAGE);
          }
          res.status(200).send(successResponse({ message: 'Пост удалён' }));
        })
        .catch(next);
    } else {
      throw new ForbiddenError('Пользователь не может удалить чужую карточку.');
    }
  }).catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: (req as any).user._id },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError(POST_NOT_FOUND_MESSAGE);
      }
      res.status(200).send(successResponse(data));
    })
    .catch(next);
};

export const unlikeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: (req as any).user._id },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError(POST_NOT_FOUND_MESSAGE);
      }
      res.status(200).send(successResponse(data));
    })
    .catch(next);
};
