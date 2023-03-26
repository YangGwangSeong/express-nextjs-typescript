import { Router } from 'express';
import userMiddleware from '../middlewares/user';
import authMiddleware from '../middlewares/auth';

const createVote = async () => {};

const router = Router();
router.post('/', userMiddleware, authMiddleware, createVote);

export default router;
