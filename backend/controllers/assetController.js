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

    const assets = await Asset.find({
      $or: [keyword, country],
      ...metal,
    }).select(['_id', 'name', 'location', 'stage', 'resource', 'ownership']);
    res.json(assets);
  } else if (req.query.assetRefs) {
    const assetRefArray = req.query.assetRefs.split('-');
    let assets;
    if (req.user && req.user.isSubscriber) {
      assets = await Asset.find({ _id: { $in: assetRefArray } }).select(
        '-user'
      );
    } else {
      assets = await Asset.find({ _id: { $in: assetRefArray } }).select([
        '-npv',
        '-user',
      ]);
    }

    res.json(assets);
  }
});

// @description Fetch a single asset by ID
// @route GET /api/assets/:id
// @access Public
const getAssetById = asyncHandler(async (req, res) => {
  let asset;
  if (req.user && req.user.isSubscriber) {
    asset = await Asset.findById(req.params.id).select('-user');
  } else {
    asset = await Asset.findById(req.params.id).select(['-npv', '-user']);
  }

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
    name: '',
    stage: '',
    study: '',
    npv: { value: null, discount: null },
    location: { country: '-', province: '', lat: null, lng: null },
    link: '',
    ownership: [],
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
    npv: { value, discount } = {},
    location: { country, province, lat, lng } = {},
    link,
    ownership,
    resource,
    image,
  } = req.body;

  const asset = await Asset.findById(req.params.id);

  if (asset) {
    asset.name = name || asset.name;
    asset.stage = stage || asset.stage;
    asset.study = study || asset.study;
    asset.npv = {
      value: value ? value : asset.npv.value,
      discount: discount ? discount : asset.npv.discount,
    };
    asset.location = {
      country: country ? country : asset.location.country,
      province: province ? province : asset.location.province,
      lat: lat ? lat : asset.location.lat,
      lng: lng ? lng : asset.location.lng,
    };
    asset.link = link || asset.link;
    asset.ownership = ownership || asset.ownership;
    asset.resource = resource || asset.resource;
    asset.image = image || asset.image;

    const updatedAsset = await asset.save();
    res.json(updatedAsset);
  } else {
    res.status(404);
    throw new Error('Asset not found');
  }
});

export { createAsset, getAssets, getAssetById, updateAsset, deleteAsset };
