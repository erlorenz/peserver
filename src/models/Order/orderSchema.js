export default {
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
    required: false,
    type: String,
  },
  returnDate: {
    required: true,
    type: String,
  },
  returnHour: {
    required: false,
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
    default: 'processed',
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
  refunds: [
    {
      refundID: {
        required: true,
        type: String,
      },
      refundTime: {
        default: Date.now,
        type: Date,
      },
      refundUser: {
        required: true,
        type: String,
      },
      refundDescription: {
        required: true,
        type: String,
      },
      refundAmount: {
        required: true,
        type: Number,
      },
    },
  ],
  additionals: [
    {
      additionalID: {
        required: true,
        type: String,
      },
      additionalTime: {
        type: Date,
        default: Date.now,
      },
      additionalUser: {
        required: true,
        type: String,
      },
      additionalDescription: {
        required: true,
        type: String,
      },
      additionalAmount: {
        required: true,
        type: Number,
      },
    },
  ],

  textSent: {
    required: true,
    type: String,
  },
  emailSent: {
    required: true,
    type: String,
  },
};
