import { Router } from 'express';
import cardRoutes from './cardRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/cards', cardRoutes);
router.use('/users', userRoutes);

export default router;