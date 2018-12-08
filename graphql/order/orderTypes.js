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
  }
  input FindInput {
    type: String!
    value: String!
  }
  extend type Query {
    ordersByStatus(status: [String]): [Order!]
    orderById(_id: ID!): Order!
    orderByInput(input: FindInput!): [Order!]!
  }
`;
