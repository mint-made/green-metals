import asyncHandler from 'express-async-handler';

import Company from '../models/companyModel.js';

// @description Fetch all companies
// @route GET /api/companies
// @access Public
const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find({});

  res.json(companies);
});

// @description Fetch a single company
// @route GET /api/companies/:id
// @access Public
const getCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    res.json(company);
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

export { getCompanies, getCompany };
