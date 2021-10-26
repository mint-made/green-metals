import express from 'express';

import {
  isAdmin,
  protect,
  getUserObject,
} from '../middleware/authMiddleware.js';
import {
  getCompanies,
  getCompanyById,
  deleteCompany,
  createCompany,
  updateCompany,
} from '../controllers/companyController.js';

const router = express.Router();

router.route('/').get(getCompanies).post(protect, isAdmin, createCompany);
router
  .route('/:id')
  .get(getUserObject, getCompanyById)
  .delete(protect, isAdmin, deleteCompany)
  .put(protect, isAdmin, updateCompany);

export default router;
