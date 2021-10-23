import mongoose from 'mongoose';

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
  assets: [
    {
      assetRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Company = mongoose.model('Company', companySchema);

export default Company;
