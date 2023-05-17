import { Router } from 'express'
const router = Router();
import { uploadRecordingController, getRecordingByIdController, discoverPublicRecordingController, recordingsQueryController, getAllUserRecordingsController, updateRecordingController, deleteRecordingController, incrementRecordingLikesController } from '../controllers/recordings.controller'
import { defaultLimiter, likeRecordingLimiter, searchLimiter } from '../middleware/rate-limiter';
import { authenticateToken } from '../middleware/auth';
import { authenticateTokenForPrivateRecordingAccess } from '../middleware/privateRecordingAuth';

router.get('/get/:recordingid', authenticateTokenForPrivateRecordingAccess, getRecordingByIdController)
router.get('/user/get', defaultLimiter, authenticateToken, getAllUserRecordingsController)
router.get('/search', searchLimiter, recordingsQueryController)
router.get('/discover', searchLimiter, discoverPublicRecordingController)
router.post('/like/:recordingid', likeRecordingLimiter, incrementRecordingLikesController)
router.post('/upload', defaultLimiter, authenticateToken, uploadRecordingController)
router.patch('/update/:recordingid', defaultLimiter, authenticateToken, updateRecordingController)
router.delete('/delete/:recordingid', defaultLimiter, authenticateToken, deleteRecordingController)

export default router