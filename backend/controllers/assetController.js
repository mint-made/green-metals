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

// @description Update an assets information
// @route PUT /api/asset/:id
// @access Private/Admin
const updateAsset = asyncHandler(async (req, res) => {
  const {
    name,
    stage,
    study,
    ownership,
    resource,
    location: { country } = {},
  } = req.body;

  const asset = await Asset.findById(req.params.id);

  if (asset) {
    asset.name = name || asset.name;
    asset.stage = stage || asset.stage;
    asset.study = study || asset.study;
    asset.ownership = ownership || asset.ownership;
    asset.resource = resource || asset.resource;
    asset.location = {
      country: country ? country : asset.location.country,
    };

    const updatedAsset = await asset.save();
    res.json(updatedAsset);
  } else {
    res.status(404);
    throw new Error('Asset not found');
  }
});

export { createAsset, getAssets, getAssetById, updateAsset };
