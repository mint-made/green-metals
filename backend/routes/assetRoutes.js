import express from 'express';

import { isAdmin, protect } from '../middleware/authMiddleware.js';
import {
  createAsset,
  getAssets,
  getAssetById,
} from '../controllers/assetController.js';

const router = express.Router();

router.route('/').post(protect, isAdmin, createAsset).get(getAssets);
router.route('/:id').get(getAssetById);

export default router;
