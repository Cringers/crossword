import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { CONFIG } from '@crossword/config';
import * as cors from 'cors';
import { AppDataSource } from '@crossword/db';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { Crossword } from './entities/crossword';
import 'reflect-metadata';

async function startApolloServer(localTypeDefs, localResolvers) {
   // eslint-disable-next-line no-console
   console.log('Starting Apollo Server');
   const frontendApp = express();
   frontendApp.use(
      '/graphql',
      createProxyMiddleware({
         target: `http://localhost:${CONFIG.BACKEND_PORT}/graphql`,
         changeOrigin: true,
      }),
   );

   const backendApp = express();
   const backendServer = http.createServer(backendApp);
   const apiServer = new ApolloServer({
      typeDefs: localTypeDefs,
      resolvers: localResolvers,
      plugins: [
         ApolloServerPluginDrainHttpServer({ httpServer: backendServer }),
      ],
   });
   backendApp.use(cors());
   frontendApp.use(cors()); // TODO pick CORS policy besides *

   await apiServer.start();
   apiServer.applyMiddleware({ app: backendApp });
   await new Promise<void>((resolve) => {
      backendServer.listen({ port: CONFIG.BACKEND_PORT }, resolve);
   });
   // eslint-disable-next-line no-console
   console.log(
      `🚀 Server ready at http://localhost:${CONFIG.BACKEND_PORT}${apiServer.graphqlPath}`,
   );

   let frontendServer : https.Server;
   switch (CONFIG.STAGE) {
      case 'production': {
         const key = fs.readFileSync(CONFIG.SSL_KEY, 'utf8');
         const cert = fs.readFileSync(CONFIG.SSL_CERT, 'utf8');
         const credentials = { key, cert };

         frontendServer = https.createServer(credentials, frontendApp);

         frontendApp.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
         });
         frontendApp.use(
            express.static(path.join(__dirname, '../frontend/build')),
         );
         await new Promise<void>(() => {
            frontendServer.listen({ port: CONFIG.FRONTEND_PORT });
         });
         // eslint-disable-next-line no-console
         console.log(
            `🚀 Server ready at http://localhost:${CONFIG.FRONTEND_PORT}/`,
         );
         break;
      }
      case 'development':
         break;
      default:
         // eslint-disable-next-line no-console
         console.error('Cringe wtfffffff');
         throw new Error(`Not a recognized stage: ${CONFIG.STAGE}`);
   }
}

// eslint-disable-next-line no-console
console.log('Connecting to ATP database');
AppDataSource.initialize().then(async () => {
   const xword: Crossword = new Crossword();
   xword.name = 'cringe';
   AppDataSource.manager.save(xword);

   await startApolloServer(typeDefs, resolvers);
});
