import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as express from "express";
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { CONFIG } from '@crossword/config';
import * as cors from 'cors';

async function startApolloServer(typeDefs, resolvers){
  const app = express()
  const backendServer = http.createServer(app);
  
  const apiServer = new ApolloServer({ 
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: backendServer })],
  });
  
  app.use(cors()); //TODO pick CORS policy besides *
  
  await apiServer.start();
  apiServer.applyMiddleware({ app });
  await new Promise<void>(resolve => backendServer.listen({ port: CONFIG.BACKEND_PORT}, resolve));
  console.log(`🚀 Server ready at http://localhost:${CONFIG.BACKEND_PORT}${apiServer.graphqlPath}`)

  var frontendServer;
  
  switch (CONFIG.STAGE) {
    case 'production':
      const key  = fs.readFileSync(CONFIG.SSL_KEY, 'utf8');
      const cert = fs.readFileSync(CONFIG.SSL_CERT, 'utf8');
      const credentials = {key, cert};
      
      frontendServer = https.createServer(credentials, app)
      
      app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
      })
      app.use(express.static(path.join(__dirname, '../frontend/build')));
      await new Promise<void>(resolve => frontendServer.listen({ port: CONFIG.FRONTEND_PORT}))
      console.log(`🚀 Server ready at http://localhost:${CONFIG.FRONTEND_PORT}/`)
      break;
    case 'development':
      break;
    default:
      console.error("Cringe wtfffffff");
      throw new Error(`Not a recognized stage: ${CONFIG.STAGE}`);
  }
}

startApolloServer(typeDefs, resolvers);