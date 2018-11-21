import { gql } from 'apollo-server-express';

export default gql`
  type User {
    name: String!
    email: String!
    roles: [String!]!
    _id: ID!
  }
  type UserLoginResponse {
    token: String!
    name: String!
    roles: [String]
  }
  extend type Query {
    me: User
  }
  extend type Mutation {
    login(email: String!, password: String!): UserLoginResponse
  }
`;
