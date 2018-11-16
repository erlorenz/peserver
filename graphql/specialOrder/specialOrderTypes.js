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
  }
  extend type Query {
    specialOrdersByStatus(status: [String]): [SpecialOrder!]
    specialOrderById(_id: ID!): SpecialOrder!
  }
`;
