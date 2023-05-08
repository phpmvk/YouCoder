import { Router } from 'express'
const router = Router();
import {getConsoleOutput } from '../controllers/code-execution.controller'
import { consoleRouteLimiter } from '../middleware/rate-limiter';


router.post('/console', consoleRouteLimiter, getConsoleOutput)

export default router