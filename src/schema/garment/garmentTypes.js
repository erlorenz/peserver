import { gql } from 'apollo-server-express';

export default gql`
  type Garment {
    id: ID
    price: Int
    slug: String
    description: String
    list_order: Int
  }

  extend type Query {
    getGarments: [Garment!]
  }

  extend type Mutation {
    insertGarment(
      slug: String!
      description: String!
      price: Int!
      list_order: Int!
    ): SuccessAndMessage
    deleteGarment(id: String!): SuccessAndMessage
    updateGarment(
      id: String!
      slug: String
      description: String
      price: Int
      list_order: Int
    ): SuccessAndMessage
  }
`;
