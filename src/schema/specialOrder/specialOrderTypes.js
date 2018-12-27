import { gql } from 'apollo-server-express';

export default gql`
  type SpecialOrder {
    name: String
    total_price: Int
    status: String
    id: ID
    phone: String
    email: String
    company: String
    description: String
    adminComments: [AdminCommentDisplay]
    refunds: [Refund]
    additionalCharges: [AdditionalCharge]
    picked_up: String
    checked_in: String
    out_for_delivery: String
    completed: String
    stripe_charge: String
    stripe_customer: String
    created_at: String!
  }
  extend type Query {
    getSpecialOrdersByStatus(status: [String!]): [SpecialOrder!]
    getAllSpecialOrderDetails(special_order_id: ID!): SpecialOrder
    specialOrdersMatch(input: FieldAndValue!): [SpecialOrder!]!
  }
`;
