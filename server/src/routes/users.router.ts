import { Router } from 'express'
const router = Router();
import { creatorLoginController, deleteCreatorController } from '../controllers/users.controller'
import { defaultLimiter } from '../middleware/rate-limiter';
import { authenticateToken } from '../middleware/auth';

router.post('/creator/login', defaultLimiter, authenticateToken, creatorLoginController)
router.delete('/creator/delete', defaultLimiter, authenticateToken, deleteCreatorController)

export default router