import { Router } from 'express'
const router = Router();
import { uploadRecording, getRecordingById } from '../controllers/recordings.controller'

router.get('/recording/get/:id', getRecordingById)
router.post('/recording/upload', uploadRecording)


export default router