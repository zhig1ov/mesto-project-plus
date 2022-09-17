import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
} from '../controllers/cards';

const cardRouter = Router();

cardRouter.post('/cards', createCard);
cardRouter.get('/cards', getCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', unlikeCard);

export default cardRouter;
