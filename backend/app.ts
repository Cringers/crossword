import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as express from "express";
import * as http from 'http';
import * as path from 'path';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { CONFIG } from '@crossword/config';

async function startApolloServer(typeDefs, resolvers){
  const app = express()
  const httpServer = http.createServer(app);
  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  // })

  // app.use(express.static(path.join(__dirname, '../frontend/build')));

  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>(resolve => httpServer.listen({ port: CONFIG.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${CONFIG.PORT}${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers);