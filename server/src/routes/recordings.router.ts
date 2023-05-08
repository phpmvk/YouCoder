import { Router } from 'express'
const router = Router();
import { uploadRecording, getRecordingById } from '../controllers/recordings.controller'
import { defaultLimiter } from '../middleware/rate-limiter';

router.get('/recording/get/:id', defaultLimiter, getRecordingById)
router.post('/recording/upload', defaultLimiter, uploadRecording)


export default router