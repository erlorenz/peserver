import mongoose from 'mongoose';

const SpecialOrderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  stripeCharge: {
    required: true,
    type: String,
  },
  stripeCustomer: {
    required: true,
    type: String,
  },
  status: {
    type: String,
    default: 'Processed',
  },
  adminComments: [
    {
      _id: false,
      user: {
        required: true,
        type: String,
      },
      time: {
        default: Date.now,
        type: Date,
      },
      comment: {
        required: true,
        type: String,
      },
    },
  ],
  mailjet: {
    required: false,
    type: String,
  },
});

export default mongoose.model('SpecialOrder', SpecialOrderSchema);
