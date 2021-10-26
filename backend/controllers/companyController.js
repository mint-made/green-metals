import asyncHandler from 'express-async-handler';

import Company from '../models/companyModel.js';

// @description Fetch all companies
// @route GET /api/companies
// @access Public
const getCompanies = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const ticker = req.query.keyword
    ? {
        'trading.ticker': {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const primaryCommodity = req.query.metal
    ? {
        primaryCommodity: {
          $regex: req.query.metal,
          $options: 'i',
        },
      }
    : {};

  const sort = {};
  if (req.query.sort) {
    const sortArr = req.query.sort.split('_');
    const sortField = sortArr[0];
    let sortValue;
    if (sortArr[1] === 'asc') {
      sortValue = 1;
    } else if (sortArr[1] === 'desc') {
      sortValue = -1;
    }
    sort[sortField] = sortValue;
  }
  const count = await Company.countDocuments({
    ...keyword,
    ...primaryCommodity,
  });
  const companies = await Company.find({
    $or: [keyword, ticker],
    ...primaryCommodity,
  })
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .select(['_id', 'name', 'trading', 'mcap', 'primaryCommodity']);
  res.json({ companies, page, pages: Math.ceil(count / pageSize) });
});

// @description Fetch a single company
// @route GET /api/companies/:id
// @access Public
const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id).select('-user');

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
// @route POST /api/companies/
// @access Private/Admin
const createCompany = asyncHandler(async (req, res) => {
  const company = new Company({
    user: req.user._id,
    name: '-',
    issuedShares: 1,
    primaryCommodity: '-',
    website: '-',
    logo: '/images/sample.jpeg',
    trading: {
      exchange: 'LSE',
      ticker: '-',
      date: '2021-05-29',
      currency: '$',
      price: '1',
      mcap: 1,
    },
    mcap: 1,
    assets: [],
  });

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
    mcap,
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
    company.mcap = mcap || company.mcap;
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
