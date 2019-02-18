import { gql } from 'apollo-server-express';

export default gql`
  type CustomerOrder {
    name: String
    total_price: Int
    status: String
    id: ID
    phone: String
    email: String
    hotel: String
    room: String
    created_at: String
    pickup_date: String
    return_date: String
    starch: Boolean
    crease: Boolean
    special_instructions: String
    stripe_charge: String
    stripe_customer: String
    picked_up: String
    checked_in: String
    out_for_delivery: String
    completed: String
    text_sent: Boolean
    receipt_sent: Boolean
  }
  type AllOrderDetails {
    name: String
    total_price: Int
    status: String
    id: ID
    phone: String
    email: String
    hotel: String
    room: String
    created_at: String
    pickup_date: String
    return_date: String
    starch: String
    crease: String
    special_instructions: String
    stripe_charge: String
    stripe_customer: String
    adminComments: [AdminCommentDisplay]
    picked_up: String
    checked_in: String
    out_for_delivery: String
    completed: String
    refunds: [Refund]
    additionalCharges: [AdditionalCharge]
    text_sent: Boolean
    receipt_sent: Boolean
    customerOrderItems: [CustomerOrderItem]
  }
  type CustomerOrderItem {
    description: String
    id: ID
    price: Int
    quantity: Int
    slug: String
  }
  type PromoCode {
    id: String
    name: String
    amount: Int
  }

  type CheckoutResponse {
    database: SuccessAndMessage
    twilio: SuccessAndMessage
    receiptEmail: SuccessAndMessage
    errorEmail: SuccessAndMessage
  }
  input CheckoutPayload {
    name: String!
    total_price: Int!
    phone: String!
    email: String!
    hotel: String!
    room: String!
    pickup_date: String!
    return_date: String!
    starch: String!
    crease: String!
    special_instructions: String
    promo_code: String
    customerOrderItems: [CustomerOrderItemInput!]!
    stripeToken: String!
  }
  input CustomerOrderItemInput {
    description: String!
    slug: String!
    price: Int!
    quantity: Int!
  }
  extend type Query {
    getCustomerOrdersByStatus(
      status: [String]
      direction: String
      orderBy: String
    ): [CustomerOrder]
    getCustomerOrder(id: ID!): AllOrderDetails
    getCustomerOrdersLike(column: String, value: String): [CustomerOrder]
  }
  extend type Mutation {
    checkout(
      name: String!
      total_price: Int!
      phone: String!
      email: String!
      hotel: String!
      room: String!
      pickup_date: String!
      return_date: String!
      starch: String!
      crease: String!
      special_instructions: String
      promo_code: String
      customerOrderItems: [CustomerOrderItemInput!]!
      stripeToken: String!
    ): CheckoutResponse!
  }
`;
