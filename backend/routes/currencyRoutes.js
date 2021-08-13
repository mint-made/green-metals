import express from 'express';

import { isAdmin, protect } from '../middleware/authMiddleware.js';
import { getCurrency } from '../controllers/currencyController.js';

const router = express.Router();

router.route('/').get(getCurrency);

export default router;
