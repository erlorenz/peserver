import { ApolloServer } from 'apollo-server-express';
import userTypes from './user/userTypes';
import orderTypes from './order/orderTypes';
import specialOrderTypes from './specialOrder/specialOrderTypes';
import sharedTypes from './shared/sharedTypes';
import * as userResolvers from './user/userResolvers';
import * as orderResolvers from './order/orderResolvers';
import * as specialOrderResolvers from './specialOrder/specialOrderResolvers';
import context from './context';

const typeDefs = [orderTypes, userTypes, specialOrderTypes, sharedTypes];

// Combine resolvers
const resolvers = {
  Query: { ...orderResolvers.Query, ...specialOrderResolvers.Query },
  Mutation: { ...userResolvers.Mutation, ...orderResolvers.Mutation },
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
