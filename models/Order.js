import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  hotel: {
    required: true,
    type: String,
  },
  room: {
    required: true,
    type: String,
    trim: true,
  },
  pickupDate: {
    required: true,
    type: String,
  },
  pickupHour: {
    required: true,
    type: String,
  },
  returnDate: {
    required: true,
    type: String,
  },
  returnHour: {
    required: true,
    type: String,
  },

  cartItems: [
    {
      _id: false,
      name: {
        required: true,
        type: String,
      },
      id: {
        required: true,
        type: String,
      },
      price: {
        required: true,
        type: Number,
      },
      quantity: {
        required: true,
        type: Number,
      },
    },
  ],
  starch: {
    type: Boolean,
    default: false,
  },
  specialInstructions: {
    type: String,
    default: null,
  },
  totalPrice: {
    required: true,
    type: Number,
  },
  promoCode: {
    name: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
  },
  phone: {
    required: true,
    type: String,
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
  adminComment: {
    required: false,
    type: String,
  },
  pickedUp: {
    type: Date,
    default: null,
  },
  checkedIn: {
    type: Date,
    default: null,
  },
  outForDelivery: {
    type: Date,
    default: null,
  },
  delivered: {
    type: Date,
    default: null,
  },
  refundID: {
    required: false,
    type: String,
  },
  refundTime: {
    required: false,
    type: Date,
  },
  refundUser: {
    required: false,
    type: String,
  },
  refundDescription: {
    required: false,
    type: String,
  },
  refundAmount: {
    required: false,
    type: Number,
  },
  additionalID: {
    required: false,
    type: String,
  },
  additionalTime: {
    type: Date,
    default: null,
  },
  additionalUser: {
    required: false,
    type: String,
  },
  additionalDescription: {
    required: false,
    type: String,
  },
  additionalAmount: {
    required: false,
    type: Number,
  },
});

export default mongoose.model('Order', OrderSchema);
