import asyncHandler from 'express-async-handler';

import Asset from '../models/assetModel.js';

// @description Fetch all companies
// @route GET /api/companies
// @access Public
const getAssets = asyncHandler(async (req, res) => {
  const assets = await Asset.find({});
  res.json(assets);
});

// @description Create an Asset
// @route POST /api/assets/
// @access Private/Admin
const createAsset = asyncHandler(async (req, res) => {
  const asset = new Asset({
    user: req.user._id,
    name: 'Racecourse',
    location: { country: 'Australia' },
    stage: 'Exploration',
    study: '-',
    ownership: '-',
  });

  const createdAsset = await asset.save();
  res.json(createdAsset);
});

export { createAsset, getAssets };
