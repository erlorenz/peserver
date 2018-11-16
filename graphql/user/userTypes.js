import { gql } from 'apollo-server-express';

export default gql`
  type User {
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean!
  }
  type UserLoginResponse {
    token: String!
    isAdmin: Boolean!
    userName: String!
  }
  extend type Query {
    me: User
  }
  extend type Mutation {
    login(email: String!, password: String!): UserLoginResponse
  }
`;
