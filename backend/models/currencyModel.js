import mongoose from 'mongoose';

const currencySchema = new mongoose.Schema(
  {
    usd: {
      cad: {
        type: Number,
        required: true,
      },
      aud: {
        type: Number,
        required: true,
      },
      gbp: {
        type: Number,
        required: true,
      },
      usd: {
        type: Number,
        required: true,
      },
      eur: {
        type: Number,
        required: true,
      },
      rub: {
        type: Number,
        required: true,
      },
      hkd: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Currency = mongoose.model('currency', currencySchema);

export default Currency;
