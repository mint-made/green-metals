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

const tickerSchema = new mongoose.Schema({
  exchange: { type: String, required: true },
  ticker: { type: String, required: true },
  date: { type: String, required: true },
  currency: { type: String, required: true },
  price: { type: Number, required: true },
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
    value: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
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
  assets: [assetSchema],
  tickers: [tickerSchema],
});

const Company = mongoose.model('Company', companySchema);

export default Company;
