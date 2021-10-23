import asyncHandler from 'express-async-handler';

import Asset from '../models/assetModel.js';

// @description Fetch all assets
// @route GET /api/assets
// @access Public
const getAssets = asyncHandler(async (req, res) => {
  if (!req.query.assetRefs) {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const country = req.query.keyword
      ? {
          'location.country': {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const metal = req.query.metal
      ? {
          resource: {
            $elemMatch: {
              type: {
                $regex: req.query.metal,
                $options: 'i',
              },
            },
          },
        }
      : {};

    const assets = await Asset.find({ $or: [keyword, country], ...metal });
    res.json(assets);
  } else if (req.query.assetRefs) {
    const assetRefArray = req.query.assetRefs.split('-');
    const assets = await Asset.find({ _id: { $in: assetRefArray } });
    res.json(assets);
  }
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
    location: { country: 'Australia' },
  });

  const createdAsset = await asset.save();
  res.json(createdAsset);
});

// @description Delete an asset
// @route DELETE /api/asset/:id
// @access Private/Admin
const deleteAsset = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);

  if (asset) {
    await asset.remove();
    res.json({ message: 'Asset removed' });
  } else {
    res.status(404);
    throw new Error('Asset not found');
  }
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
    image,
    link,
    location: { country } = {},
    npv: { value, discount } = {},
  } = req.body;

  const asset = await Asset.findById(req.params.id);

  if (asset) {
    asset.name = name || asset.name;
    asset.stage = stage || asset.stage;
    asset.study = study || asset.study;
    asset.link = link || asset.link;
    asset.image = image || asset.image;
    asset.ownership = ownership || asset.ownership;
    asset.resource = resource || asset.resource;
    asset.location = {
      country: country ? country : asset.location.country,
    };
    asset.npv = {
      value: value ? value : asset.npv.value,
      discount: discount ? discount : asset.npv.discount,
    };

    const updatedAsset = await asset.save();
    res.json(updatedAsset);
  } else {
    res.status(404);
    throw new Error('Asset not found');
  }
});

export { createAsset, getAssets, getAssetById, updateAsset, deleteAsset };
