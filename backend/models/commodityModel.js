import mongoose from 'mongoose';

const commoditySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  data: [
    {
      closingPrice: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

const Commodity = mongoose.model('Commodity', commoditySchema);

export default Commodity;
