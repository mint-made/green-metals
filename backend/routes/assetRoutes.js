import express from 'express';

import {
  isAdmin,
  protect,
  getUserObject,
} from '../middleware/authMiddleware.js';
import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} from '../controllers/assetController.js';

const router = express.Router();

router
  .route('/')
  .post(protect, isAdmin, createAsset)
  .get(getUserObject, getAssets);
router
  .route('/:id')
  .get(getUserObject, getAssetById)
  .delete(protect, isAdmin, deleteAsset)
  .put(protect, isAdmin, updateAsset);

export default router;
