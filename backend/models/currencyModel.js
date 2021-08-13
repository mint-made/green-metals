import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    },
  },
  {
    timestamps: true,
  }
);

const Currency = mongoose.model('currency', currencySchema);

export default Currency;
