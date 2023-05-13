import { Router } from 'express'
const router = Router();
import { uploadRecordingController, getRecordingByIdController, getAllUserRecordingsController, updateRecordingController, deleteRecordingController } from '../controllers/recordings.controller'
import { defaultLimiter } from '../middleware/rate-limiter';
import { authenticateToken } from '../middleware/auth';
import { authenticateTokenForPrivateRecordingAccess } from '../middleware/privateRecordingAuth';

router.get('/get/:recordingid', authenticateTokenForPrivateRecordingAccess, getRecordingByIdController)
router.get('/user/get', defaultLimiter, authenticateToken, getAllUserRecordingsController)
router.post('/upload', defaultLimiter, authenticateToken, uploadRecordingController)
router.patch('/update/:recordingid', defaultLimiter, authenticateToken, updateRecordingController)
router.delete('/delete/:recordingid', defaultLimiter, authenticateToken, deleteRecordingController)

export default router