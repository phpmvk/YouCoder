import { Router } from 'express'
const router = Router();
import { creatorLogin, updateCreator, deleteCreator } from '../controllers/users.controller'
import { defaultLimiter } from '../middleware/rate-limiter';
import { authenticateToken } from '../middleware/auth';

router.post('/users/creator/add', defaultLimiter, authenticateToken, creatorLogin)
router.patch('/users/creator/update/:creatorid', defaultLimiter, authenticateToken, updateCreator)
router.delete('/users/creator/delete/:creatorid', defaultLimiter, authenticateToken, deleteCreator)

export default router