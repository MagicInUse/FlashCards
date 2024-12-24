import 'dotenv/config';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './db/schemas/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import db from './db/config/connections.js';
import cors from 'cors';

try {
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  // app.use(express.static(path.join(__dirname, '../public_html/flash-cards')));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Use CORS middleware
  app.use(cors({
    origin: ['https://magicapps.dev', 'http://localhost:3000'], // Allow both production and local origins
    credentials: true,
  }));

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
  });
  await server.start();

  app.use('/flash-cards/graphql', expressMiddleware(server));

  app.use(routes);

  // Serve the index.html file for any unknown routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    // res.sendFile(path.join(__dirname, '../public_html/flash-cards/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Flash Cards ready @ port ${PORT} !`);
    console.log(`GraphQL ready @ http://localhost:${PORT}/flash-cards/graphql !`);
  });
} catch (error) {
  console.error('Error starting server:', error);
  process.exit(1);
};