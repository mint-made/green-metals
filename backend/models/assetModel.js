import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: { type: String, required: true },
  location: {
    country: { type: String, required: true },
    province: { type: String },
    lat: { type: Number },
    lng: { type: Number },
  },
  stage: { type: String, required: true },
  ownership: { type: String, required: true },
  study: { type: String, required: true },
  resource: [
    {
      inferred: { type: Number },
      indicated: { type: Number },
      measured: { type: Number },
      units: { type: String },
      commodity: { type: String },
    },
  ],
  npv: {
    value: { type: Number },
    discount: { type: Number },
  },
});

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
