import { Router } from 'express'
const router = Router();
import { uploadRecording, getRecordingById, getAllUserRecordings, updateRecording, deleteRecording } from '../controllers/recordings.controller'
import { defaultLimiter } from '../middleware/rate-limiter';
import { authenticateToken } from '../middleware/auth';
import { authenticateTokenForPrivateRecordingAccess } from '../middleware/privateRecordingAuth';

router.get('/get/:recordingid', authenticateTokenForPrivateRecordingAccess, getRecordingById)
router.get('/user/get', defaultLimiter, authenticateToken, getAllUserRecordings)
router.post('/upload', defaultLimiter, authenticateToken, uploadRecording)
router.patch('/update/:recordingid', defaultLimiter, authenticateToken, updateRecording)
router.delete('/delete/:recordingid', defaultLimiter, authenticateToken, deleteRecording)

export default router