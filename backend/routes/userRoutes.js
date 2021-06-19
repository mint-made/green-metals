import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userContoller.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/profile').get(protect, getUserProfile);
router.post('/login', authUser);

export default router;
