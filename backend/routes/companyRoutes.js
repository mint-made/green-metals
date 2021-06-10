import express from 'express';
import asyncHandler from 'express-async-handler';

import Company from '../models/companyModel.js';

const router = express.Router();

// @description Fetch all companies
// @route GET /api/companies
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const companies = await Company.find({});

    res.json(companies);
  })
);

// @description Fetch a single company
// @route GET /api/companies/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);

    if (company) {
      res.json(company);
    } else {
      res.status(404);
      throw new Error('Company not found');
    }
  })
);

export default router;
