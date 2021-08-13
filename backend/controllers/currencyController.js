import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken.js';
import Currency from '../models/currencyModel.js';

// @description Get Currency information
// @route GET /api/currency
// @access Public
const getCurrency = asyncHandler(async (req, res) => {
  const currency = await Currency.findById('6116c5d44f24fa3d3e18f886');

  res.json(currency);
});

export { getCurrency };
