import { gql } from 'apollo-server-express';

export default gql`
  type Refund {
    created_at: String
    amount: Int
    id: ID
    customer_order_id: ID
    admin_user_id: ID
    special_order_id: ID
    stripe_refund: String
  }
  type RefundResponse {
    receiptEmail: SuccessAndMessage
    database: SuccessAndMessage
  }

  extend type Query {
    getRefundsByOrderID(customer_order_id: String): [Refund!]
  }

  extend type Mutation {
    insertRefund(
      customer_order_id: ID
      special_order_id: ID
      admin_user_id: ID!
      amount: Int!
      stripe_charge: String!
      name: String!
      email: String!
    ): RefundResponse
  }
`;
