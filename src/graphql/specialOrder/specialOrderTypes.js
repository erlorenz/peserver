import { gql } from 'apollo-server-express';

export default gql`
  type SpecialOrder {
    name: String!
    totalPrice: Int!
    status: String!
    _id: ID!
    phone: String!
    email: String!
    company: String!
    description: String!
    adminComments: [AdminComment!]
    refunds: [Refund!]
    additionals: [Additional!]
    pickedUp: String
    checkedIn: String
    outForDelivery: String
    completed: String
    stripeCharge: String!
    stripeCustomer: String!
    created: String!
  }
  extend type Query {
    specialOrdersByStatus(status: [String]): [SpecialOrder!]!
    specialOrderById(_id: ID!): SpecialOrder!
    specialOrdersMatch(input: FieldAndValue!): [SpecialOrder!]!
  }
`;
