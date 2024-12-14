import { Router } from 'express';
import { getAllCards, getCardById, addCard } from '../../controllers/cardController.js';

const cardRouter = Router();

cardRouter.get('/', getAllCards);
cardRouter.get('/:id', getCardById);
cardRouter.post('/', addCard);

export default cardRouter;