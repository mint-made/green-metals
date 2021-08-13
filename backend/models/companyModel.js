import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  stage: { type: String, required: true },
  resource: [
    {
      size: { type: Number },
      units: { type: String },
      commodity: { type: String },
    },
  ],
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
