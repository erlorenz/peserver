import { gql } from 'apollo-server-express';

export default gql`
  type User {
    name: String!
    email: String!
    password: String!
    roles: [String]
  }
  type UserLoginResponse {
    token: String!
    name: String!
    roles: [String]
    password: String
  }
  extend type Query {
    me: User
  }
  extend type Mutation {
    login(email: String!, password: String!): UserLoginResponse
    register(
      email: String!
      password: String!
      roles: [String]
      name: String!
    ): User
  }
`;
