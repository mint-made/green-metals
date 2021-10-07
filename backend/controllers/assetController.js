import asyncHandler from 'express-async-handler';

import Asset from '../models/assetModel.js';

// @description Fetch all assets
// @route GET /api/assets
// @access Public
const getAssets = asyncHandler(async (req, res) => {
  const assets = await Asset.find({});
  res.json(assets);
});

// @description Fetch a single asset
// @route GET /api/assets/:id
// @access Public
const getAssetById = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);

  if (asset) {
    res.json(asset);
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
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

export { createAsset, getAssets, getAssetById };
