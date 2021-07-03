import express from 'express';

import { isAdmin, protect } from '../middleware/authMiddleware.js';
import {
  getCompanies,
  getCompanyById,
  deleteCompany,
} from '../controllers/companyController.js';

const router = express.Router();

router.route('/').get(getCompanies);
router
  .route('/:id')
  .get(getCompanyById)
  .delete(protect, isAdmin, deleteCompany);

export default router;
