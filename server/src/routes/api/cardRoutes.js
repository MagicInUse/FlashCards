import { Router } from 'express';
import { getAllCards, getCardById, addCard, updateCard } from '../../controllers/cardController.js';

const cardRouter = Router();

cardRouter.get('/', getAllCards);
cardRouter.get('/:id', getCardById);

cardRouter.post('/', addCard);

cardRouter.put('/:id', updateCard);

export default cardRouter;