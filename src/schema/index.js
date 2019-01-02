import { ApolloServer } from 'apollo-server-express';
import adminUserTypes from './adminUser/adminUserTypes';
import adminCommentTypes from './adminComment/adminCommentTypes';
import customerOrderTypes from './customerOrder/customerOrderTypes';
import specialOrderTypes from './specialOrder/specialOrderTypes';
import additionalChargeTypes from './additionalCharge/additionalChargeTypes';
import refundTypes from './refund/refundTypes';
import sharedTypes from './shared/sharedTypes';
import garmentTypes from './garment/garmentTypes';

import * as adminUserResolvers from './adminUser/adminUserResolvers';
import * as customerOrderResolvers from './customerOrder/customerOrderResolvers';
import * as specialOrderResolvers from './specialOrder/specialOrderResolvers';
import * as adminCommentResolvers from './adminComment/adminCommentResolvers';
import * as refundResolvers from './refund/refundResolvers';
import * as additionalChargeResolvers from './additionalCharge/additionalChargeResolvers';
import * as garmentResolvers from './garment/garmentResolvers';
import * as sharedResolvers from './shared/sharedResolvers';

import context from './context';

const typeDefs = [
  customerOrderTypes,
  adminCommentTypes,
  adminUserTypes,
  specialOrderTypes,
  sharedTypes,
  additionalChargeTypes,
  refundTypes,
  garmentTypes,
];

// Combine resolvers
const resolvers = {
  Query: {
    ...customerOrderResolvers.Query,
    ...specialOrderResolvers.Query,
    ...adminCommentResolvers.Query,
    ...refundResolvers.Query,
    ...additionalChargeResolvers.Query,
    ...garmentResolvers.Query,
    ...adminUserResolvers.Query,
  },
  Mutation: {
    ...adminUserResolvers.Mutation,
    ...customerOrderResolvers.Mutation,
    ...specialOrderResolvers.Mutation,
    ...adminCommentResolvers.Mutation,
    ...refundResolvers.Mutation,
    ...additionalChargeResolvers.Mutation,
    ...sharedResolvers.Mutation,
    ...garmentResolvers.Mutation,
  },
};

// Enable Graphql playground in staging
const enablePlaygound = process.env.PLAYGROUND
  ? { introspection: true, playground: true }
  : {};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
  ...enablePlaygound,
});
