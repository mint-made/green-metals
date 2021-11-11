import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: { type: String },
  stage: { type: String },
  study: { type: String },
  link: { type: String },
  image: { type: String },
  location: {
    country: { type: String, required: true },
    province: { type: String },
    lat: { type: Number },
    lng: { type: Number },
  },
  npv: {
    value: { type: Number },
    discount: { type: Number },
  },
  irr: { type: Number },
  ownership: [
    {
      name: { type: String, required: true },
      stakePercent: { type: Number, required: true },
      companyRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
      },
    },
  ],
  resource: [
    {
      i: { type: Number },
      mi: { type: Number },
      units: { type: String },
      type: { type: String },
    },
  ],
});

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
