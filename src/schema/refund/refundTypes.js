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
  type RefundDisplay {
    created_at: String
    amount: Int
    id: ID
    customer_order_id: ID
    admin_user_id: ID
    special_order_id: ID
    stripe_refund: String
    name: String
    email: String
  }

  input RefundInput {
    customer_order_id: ID
    special_order_id: ID
    admin_user_id: ID!
    amount: String!
    stripe_charge: String!
  }

  extend type Query {
    getRefundsByOrderID(customer_order_id: String): [RefundDisplay!]
  }

  extend type Mutation {
    insertRefund(payload: RefundInput!): Refund
  }
`;
