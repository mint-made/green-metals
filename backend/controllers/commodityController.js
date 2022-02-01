import asyncHandler from 'express-async-handler';

import Commodity from '../models/commodityModel.js';

// @description Get Commodity information by name
// @route GET /api/commodity/:name
// @access Public
const getCommodityByName = asyncHandler(async (req, res) => {
  const commodityName = req.params.name;

  const commodity = await Commodity.findOne({ name: commodityName }).select(
    '-_id'
  );

  if (commodity) {
    res.json(commodity);
  } else {
    res.status(404);
    throw new Error('Commodity not found');
  }
});

const createCommodity = asyncHandler(async (req, res) => {
  const { name, data, currency, unit } = req.body;
  const formattedData = data.map(({ close, date }) => {
    return { closingPrice: close, date };
  });

  const commodity = new Commodity({
    name,
    data: formattedData,
    currency,
    unit,
  });

  const createdCommodity = await commodity.save();
  res.json(createdCommodity);
});

export { getCommodityByName, createCommodity };
