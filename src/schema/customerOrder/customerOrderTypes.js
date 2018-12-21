import { gql } from 'apollo-server-express';

export default gql`
  type Order {
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
    special_instructions: String
    stripe_charge: String
    stripe_customer: String
    admin_comments: [AdminComment]
    picked_up: String
    checked_in: String
    out_for_delivery: String
    completed: String
    refunds: [Refund]
    additionals: [Additional]
    text_sent: Boolean
    receipt_sent: Boolean
    cart_items: [CartItem]!
  }
  type CartItem {
    name: String
    id: String
    price: Int
    quantity: Int
  }
  type PromoCode {
    id: String
    name: String
    amount: Int
  }
  type DbResponse {
    success: Boolean
    message: Order
  }
  type SuccessAndMessage {
    success: Boolean
    message: String
  }
  type CheckoutResponse {
    mongoDB: SuccessAndMessage
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
    starch: Boolean!
    special_instructions: String
    promo_code: String
    cartItems: [CartItemInput!]!
    stripeToken: String!
  }
  input CartItemInput {
    name: String!
    slug: String!
    price: Int!
    quantity: Int!
  }
  extend type Query {
    ordersByStatus(status: [String]): [Order!]
    orderById(_id: ID!): Order!
    ordersMatch(input: FieldAndValue!): [Order!]!
  }
  extend type Mutation {
    checkout(payload: CheckoutPayload!): CheckoutResponse!
    orderChangeStatus(status: String!, id: ID!): Order!
    orderAddComment(payload: AdminCommentInput!): Order!
  }
`;
