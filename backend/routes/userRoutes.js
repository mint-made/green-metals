import express from 'express';

import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from '../controllers/userContoller.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
