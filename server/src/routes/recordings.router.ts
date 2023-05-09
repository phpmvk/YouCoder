import { Router } from 'express'
const router = Router();
import { uploadRecording, getRecordingById, updateRecording } from '../controllers/recordings.controller'
import { defaultLimiter } from '../middleware/rate-limiter';
import { authenticateToken } from '../middleware/auth';

router.get('/recording/get/:recordingid', defaultLimiter, getRecordingById)
router.post('/recording/upload', defaultLimiter, authenticateToken, uploadRecording)
router.patch('/recording/update/:recordingid', defaultLimiter, authenticateToken, updateRecording)

export default router