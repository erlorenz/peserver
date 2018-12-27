import { gql } from 'apollo-server-express';

export default gql`
  type AdminComment {
    created_at: String
    comment_body: String
    id: ID
    customer_order_id: ID
    admin_user_id: ID
    special_order_id: ID
  }
  type AdminCommentDisplay {
    created_at: String
    comment_body: String
    customer_order_id: ID
    name: String
    email: String
  }

  input AdminCommentInput {
    customer_order_id: ID
    special_order_id: ID
    admin_user_id: ID!
    comment_body: String!
  }

  extend type Query {
    getAdminCommentsByOrderID(
      customer_order_id: ID
      special_order_id: ID
    ): [AdminCommentDisplay!]
  }

  extend type Mutation {
    insertAdminComment(payload: AdminCommentInput!): SuccessAndMessage
  }
`;
