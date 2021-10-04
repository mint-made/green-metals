import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
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

const companySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  issuedShares: {
    type: Number,
    required: true,
  },
  mcap: {
    type: Number,
    required: true,
  },
  primaryCommodity: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  trading: {
    exchange: { type: String, required: true },
    ticker: { type: String, required: true },
    date: { type: String, required: true },
    currency: { type: String, required: true },
    price: { type: Number, required: true },
    mcap: { type: Number, required: true },
  },
  assets: [assetSchema],
});

const Company = mongoose.model('Company', companySchema);

export default Company;
