import { Router } from 'express'
const router = Router();
import {getConsoleOutput, uploadRecording, addNewCreator } from '../controllers/controller'

router.post('/console', getConsoleOutput )

router.post('/recording/upload', uploadRecording )

router.post('/user/creator/add', addNewCreator )

export default router