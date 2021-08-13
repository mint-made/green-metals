import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken.js';
import Currency from '../models/currencyModel.js';

// @description Get Currency information
// @route GET /api/currency
// @access Public
const getCurrency = asyncHandler(async (req, res) => {
  const currency = await Currency.find({});

  res.json(currency);
});

export { getCurrency };
