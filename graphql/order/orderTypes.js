import { gql } from 'apollo-server-express';

export default gql`
  type Order {
    name: String!
    totalPrice: Int!
    status: String!
    _id: ID!
    phone: String!
    email: String!
    hotel: String!
    room: String!
    created: String!
    pickupDate: String!
    returnDate: String!
    starch: Boolean!
    specialInstructions: String
    promoCode: PromoCode
    stripeCharge: String!
    stripeCustomer: String!
    adminComments: [AdminComment!]
    pickedUp: String
    checkedIn: String
    outForDelivery: String
    completed: String
    refunds: [Refund!]
    additionals: [Additional!]
    textSent: String!
    emailSent: String!
    cartItems: [CartItem!]!
  }
  type CartItem {
    name: String!
    id: String!
    price: Int!
    quantity: Int!
  }
  type PromoCode {
    name: String!
    amount: Int!
  }
  extend type Query {
    ordersByStatus(status: [String]): [Order!]
    orderById(_id: ID!): Order!
    ordersMatch(input: FieldAndValue!): [Order!]!
  }
`;
