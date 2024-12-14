import 'dotenv/config';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './db/schemas/index.js';
import routes from './routes/index.js';
import db from './db/config/connections.js';

await db();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
app.use('/graphql', expressMiddleware(server));

app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});