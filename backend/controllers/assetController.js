import asyncHandler from 'express-async-handler';

import Asset from '../models/assetModel.js';

// @description Create an Asset
// @route POST /api/assets/
// @access Private/Admin
const createAsset = asyncHandler(async (req, res) => {
  const createdAsset = new Asset({
    user: req.user._id,
    name: 'Racecourse',
    location: { country: 'Australia' },
    stage: 'Exploration',
    study: '-',
    ownership: '-',
  });

  const createdasset = await Asset.save();
  res.json(createdAsset);
});

export { createAsset };
