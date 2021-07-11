import asyncHandler from 'express-async-handler';

import Company from '../models/companyModel.js';

// @description Fetch all companies
// @route GET /api/companies
// @access Public
const getCompanies = asyncHandler(async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Company.countDocuments({ ...keyword });
  const companies = await Company.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ companies, page, pages: Math.ceil(count / pageSize) });
});

// @description Fetch a single company
// @route GET /api/companies/:id
// @access Public
const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    res.json(company);
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

// @description Delete a company
// @route DELETE /api/companies/:id
// @access Private/Admin
const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    await company.remove();
    res.json({ message: 'Company removed' });
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

// @description Create a company
// @route POST /api/companies/:id
// @access Private/Admin
const createCompany = asyncHandler(async (req, res) => {
  const company = new Company({
    user: req.user._id,
    name: 'example corp',
    issuedShares: 1000000,
    primaryCommodity: 'copper',
    website: 'example.com',
    logo: '/images/sample.jpeg',
    trading: {
      exchange: 'LSE',
      ticker: 'EG',
      date: '2021-05-29',
      currency: '£',
      price: '10',
      mcap: 0,
    },
    assets: [],
  });

  company.trading.mcap = company.trading.price * company.issuedShares;

  const createdCompany = await company.save();
  res.json(createdCompany);
});

// @description Update a companies information
// @route PUT /api/companies/:id
// @access Private/Admin
const updateCompany = asyncHandler(async (req, res) => {
  const {
    name,
    issuedShares,
    primaryCommodity,
    website,
    logo,
    assets,
    trading: { exchange, ticker, date, currency, price } = {},
  } = req.body;

  const company = await Company.findById(req.params.id);

  if (company) {
    company.name = name || company.name;
    company.issuedShares = issuedShares || company.issuedShares;
    company.primaryCommodity = primaryCommodity || company.primaryCommodity;
    company.website = website || company.website;
    company.logo = logo || company.logo;
    company.assets = assets || company.assets;
    company.trading = {
      exchange: exchange ? exchange : company.trading.exchange,
      ticker: ticker ? ticker : company.trading.ticker,
      date: date ? date : company.trading.date,
      currency: currency ? currency : company.trading.currency,
      price: price ? price : company.trading.price,
    };
    company.trading.mcap = company.trading.price * company.issuedShares;

    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

export {
  getCompanies,
  getCompanyById,
  deleteCompany,
  createCompany,
  updateCompany,
};
