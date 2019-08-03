import Photon from 'server/photon';
import glob from 'glob';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { GameState } from 'server/state';
import { prepareContext, formatError } from 'server/apollo';
import { SERVER_ROOT_DIR } from 'server/constants';

const loadSchemas = () =>
  glob.sync(`${SERVER_ROOT_DIR}/**/schema.{js,ts}`).map((module) => {
    return require(module).default;
  });

const loadResolvers = () =>
  glob.sync(`${SERVER_ROOT_DIR}/**/resolvers.{js,ts}`).map((module) => {
    return require(module).default;
  });

const createApolloServer = (gameState: GameState) => {
  const schema = makeExecutableSchema({
    typeDefs: mergeTypes(loadSchemas()),
    resolvers: mergeResolvers(loadResolvers()),
  });

  const photon = new Photon();
  const context = prepareContext(gameState, photon);

  const apollo = new ApolloServer({
    schema,
    context,
    formatError,
  });

  return apollo;
};

export const createServer = (gameState: GameState) => {
  const apollo = createApolloServer(gameState);

  const app = express();

  app.disable('x-powered-by');

  apollo.applyMiddleware({ app });

  app.use(cors());

  return app;
};
