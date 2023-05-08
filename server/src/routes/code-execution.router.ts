import { Router } from 'express'
const router = Router();
import {getConsoleOutput } from '../controllers/code-execution.controller'

router.post('/console', getConsoleOutput)

export default router