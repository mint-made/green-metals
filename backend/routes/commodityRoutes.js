import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getCommodityByName,
  createCommodity,
} from '../controllers/commodityController.js';

const router = express.Router();

router.route('/').post(createCommodity);
router.route('/:name').get(getCommodityByName);

export default router;
