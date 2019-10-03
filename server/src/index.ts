import { ApolloServer, gql } from 'apollo-server-express';
import { default as express } from 'express';

const port: number = 4000;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);