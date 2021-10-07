import express from 'express';

import { isAdmin, protect } from '../middleware/authMiddleware.js';
import { createAsset } from '../controllers/assetController.js';

const router = express.Router();

router.route('/').post(protect, isAdmin, createAsset);

export default router;
