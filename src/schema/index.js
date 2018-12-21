import { ApolloServer } from 'apollo-server-express';
import adminUserTypes from './adminUser/adminUserTypes';
import customerOrderTypes from './customerOrder/customerOrderTypes';
import specialOrderTypes from './specialOrder/specialOrderTypes';
import sharedTypes from './shared/sharedTypes';
import * as adminUserResolvers from './adminUser/adminUserResolvers';
import * as customerOrderResolvers from './customerOrder/customerOrderResolvers';
import * as specialOrderResolvers from './specialOrder/specialOrderResolvers';
import context from './context';

const typeDefs = [
  customerOrderTypes,
  adminUserTypes,
  specialOrderTypes,
  sharedTypes,
];

// Combine resolvers
const resolvers = {
  Query: { ...customerOrderResolvers.Query, ...specialOrderResolvers.Query },
  Mutation: {
    ...adminUserResolvers.Mutation,
    ...customerOrderResolvers.Mutation,
  },
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
