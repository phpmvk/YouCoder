import { Router } from 'express'
const router = Router();
import { addNewCreator } from '../controllers/users.controller'

router.post('/user/creator/add', addNewCreator)


export default router