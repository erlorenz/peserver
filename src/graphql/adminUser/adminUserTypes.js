import { gql } from 'apollo-server-express';

export default gql`
  type AdminUser {
    id: ID
    name: String
    email: String
    password: String
    role: String
  }
  type AdminUserLoginResponse {
    token: String!
    name: String!
    roles: [String]
    password: String
  }
  extend type Query {
    user: AdminUser
  }
  extend type Mutation {
    login(email: String!, password: String!): AdminUserLoginResponse
    register(
      email: String!
      password: String!
      role: String
      name: String!
    ): AdminUser
  }
`;
