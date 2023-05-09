import { Router } from 'express'
const router = Router();
import { uploadRecording, getRecordingById, updateRecording, deleteRecording } from '../controllers/recordings.controller'
import { defaultLimiter } from '../middleware/rate-limiter';
import { authenticateToken } from '../middleware/auth';

router.get('/recording/get/:recordingid', defaultLimiter, getRecordingById)
router.post('/recording/upload', defaultLimiter, authenticateToken, uploadRecording)
router.patch('/recording/update/:recordingid', defaultLimiter, authenticateToken, updateRecording)
router.delete('/recording/delete/:recordingid', defaultLimiter, authenticateToken, deleteRecording)

export default router