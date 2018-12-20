import { ApolloServer } from 'apollo-server-express';
import adminUserTypes from './adminUser/adminUserTypes';
import orderTypes from './order/orderTypes';
import specialOrderTypes from './specialOrder/specialOrderTypes';
import sharedTypes from './shared/sharedTypes';
import * as adminUserResolvers from './adminUser/adminUserResolvers';
import * as orderResolvers from './order/orderResolvers';
import * as specialOrderResolvers from './specialOrder/specialOrderResolvers';
import context from './context';

const typeDefs = [orderTypes, adminUserTypes, specialOrderTypes, sharedTypes];

// Combine resolvers
const resolvers = {
  Query: { ...orderResolvers.Query, ...specialOrderResolvers.Query },
  Mutation: { ...adminUserResolvers.Mutation, ...orderResolvers.Mutation },
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
