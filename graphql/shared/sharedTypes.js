import { gql } from 'apollo-server-express';

export default gql`
  scalar Date

  enum MatchTypes {
    EXACT
    PARTIAL
  }

  type AdminComment {
    user: String!
    time: String!
    comment: String!
  }
  type Refund {
    refundID: String!
    refundTime: String!
    refundUser: String!
    refundDescription: String!
    refundAmount: Int!
  }
  type Additional {
    additionalID: String!
    additionalTime: String!
    additionalUser: String!
    additionalDescription: String!
    additionalAmount: Int!
  }

  input FieldAndValue {
    field: String!
    value: String!
    matchType: MatchTypes!
  }
  input AdminCommentInput {
    _id: ID!
    user: String!
    comment: String!
  }
  input RefundInput {
    _id: ID!
    user: String
    refundDescription: String
    refundAmount: Int
    stripeCharge: String
  }
  input AdditionalInput {
    _id: ID!
    user: String
    additionalDescription: String
    additioanlAmount: Int
    stripeCustomer: String
  }

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
