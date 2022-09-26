import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
} from '../controllers/cards';
import createCardValidator from '../validators/createCardValidator';
import cardIdParamValidator from '../validators/cardIdParamValidator';

const cardRouter = Router();

cardRouter.post('/', createCardValidator(), createCard);
cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', cardIdParamValidator(), deleteCard);
cardRouter.put('/:cardId/likes', cardIdParamValidator(), likeCard);
cardRouter.delete('/:cardId/likes', cardIdParamValidator(), unlikeCard);

export default cardRouter;
