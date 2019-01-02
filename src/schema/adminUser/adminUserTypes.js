import { gql } from 'apollo-server-express';

export default gql`
  type AdminUser {
    name: String
    email: String
    access_level: String
    id: ID
  }
  type AdminUserLoginResponse {
    token: String
    name: String
    access_level: String
    email: String
    id: ID
  }
  extend type Query {
    checkToken: AdminUser
  }
  extend type Mutation {
    login(email: String!, password: String!): AdminUserLoginResponse
    register(
      email: String!
      password: String!
      access_level: String
      name: String!
    ): AdminUser
  }
`;
