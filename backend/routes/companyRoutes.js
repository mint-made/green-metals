import express from 'express';

import { getCompanies, getCompany } from '../controllers/companyController.js';

const router = express.Router();

router.get('/', getCompanies);
router.get('/:id', getCompany);

export default router;
