import { Router } from 'express'
const router = Router();
import { creatorLogin, updateCreator, deleteCreator } from '../controllers/users.controller'
import { defaultLimiter } from '../middleware/rate-limiter';

router.post('/users/creator/add', defaultLimiter,creatorLogin)
router.patch('/users/creator/update/:creatorid', defaultLimiter, updateCreator)
router.delete('/users/creator/delete/:creatorid', defaultLimiter,deleteCreator)

export default router