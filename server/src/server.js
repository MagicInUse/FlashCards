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

  await db();

  const PORT = process.env.PORT || 3001;

  let BASE_URL = '';
  if (process.env.NODE_ENV === 'production') {
    BASE_URL = '/medical-cards';
  }

  const app = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Serve static files from the 'public' directory
  process.env.NODE_ENV === 'production' ? app.use(BASE_URL, express.static(path.join(__dirname, '../../public_html/medical-cards'))) : app.use(express.static(path.join(__dirname, '../../client/dist')));

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

  app.use(`${BASE_URL}/graphql`, expressMiddleware(server));

  app.use(BASE_URL, routes);

  // Serve the index.html file for any unknown routes
  app.get(`${BASE_URL}/*`, (req, res) => {
    process.env.NODE_ENV ? res.sendFile(path.join(__dirname, '../../public_html/medical-cards/index.html')) : res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Flash Cards ready @ port ${PORT} !`);
    console.log(`GraphQL ready @ http://localhost:${PORT}${BASE_URL}/graphql !`);
  });