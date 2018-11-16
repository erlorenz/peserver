import graphqlHTTP from 'express-graphql';
import schema from '../graphql';

export default graphqlHTTP({
  schema,
  graphiql: true,
});
