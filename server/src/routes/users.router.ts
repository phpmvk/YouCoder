import { Router } from 'express'
const router = Router();
import { creatorLogin, updateCreator, deleteCreator } from '../controllers/users.controller'

router.post('/users/creator/add', creatorLogin)
router.patch('/users/creator/update/:creatorid', updateCreator)
router.delete('/users/creator/delete/:creatorid', deleteCreator)

export default router