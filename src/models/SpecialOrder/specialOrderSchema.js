export default {
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
  completed: {
    type: Date,
    default: null,
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
};
