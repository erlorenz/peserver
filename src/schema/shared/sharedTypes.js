import { gql } from 'apollo-server-express';

export default gql`
  scalar Date

  enum MatchTypes {
    EXACT
    PARTIAL
  }

  type SuccessAndMessage {
    success: Boolean
    message: String
  }
  type ChangeStatusResponse {
    database: SuccessAndMessage
    twilio: SuccessAndMessage
  }

  input ColumnAndValue {
    column: String!
    value: String!
  }

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
    updateStatus(
      status: String!
      customer_order_id: ID
      special_order_id: ID
    ): ChangeStatusResponse
  }
`;
