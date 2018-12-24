import { gql } from 'apollo-server-express';

export default gql`
  type AdditionalCharge {
    created_at: String
    amount: Integer
    id: ID
    customer_order_id: ID
    admin_user_id: ID
    special_order_id: ID
    stripe_charge: ID
  }
  type AdditionalChargeDisplay {
    created_at: String
    amount: Integer
    id: ID
    customer_order_id: ID
    admin_user_id: ID
    special_order_id: ID
    stripe_charge: ID
    name: String
    email: String
  }

  input AdditionalChargeInput {
    customer_order_id: ID
    special_order_id: ID
    admin_user_id: ID!
    amount: String!
    stripe_charge: String!
  }

  extend type Query {
    getAdditionalChargesByOrderID(
      customer_order_id: String
    ): [AdditionalChargeDisplay!]
  }

  extend type Mutation {
    insertAdditionalCharge(payload: AdditionalChargeInput!): AdditionalCharge
  }
`;
