import { ApolloServer, gql } from 'apollo-server-express';
import userTypes from './user/userTypes';
import orderTypes from './order/orderTypes';
import specialOrderTypes from './specialOrder/specialOrderTypes';
import * as userResolvers from './user/userResolvers';
import * as orderResolvers from './order/orderResolvers';
import * as specialOrderResolvers from './specialOrder/specialOrderResolvers';
import context from './context';

// Combine typedefs
const root = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const typeDefs = [orderTypes, userTypes, specialOrderTypes, root];

// Combine resolvers
const resolvers = {
  Query: { ...orderResolvers.Query, ...specialOrderResolvers.Query },
  Mutation: { ...userResolvers.Mutation },
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
