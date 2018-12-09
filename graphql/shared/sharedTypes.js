import { gql } from 'apollo-server-express';

export default gql`
  scalar Date

  enum MatchTypes {
    EXACT
    PARTIAL
  }

  input FieldAndValue {
    field: String!
    value: String!
    matchType: MatchTypes!
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

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
