import Photon from '~/photon';
import glob from 'glob';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { GameState } from '~/server/state';
import {
  prepareContext,
  formatError,
  PLAYGROUND_CONFIG,
} from '~/server/apollo';
import { SERVER_ROOT_DIR } from '~/server/constants';
import { NODE_ENV } from '~/server/env';

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
    debug: NODE_ENV !== 'production',
    introspection: NODE_ENV !== 'production',
    playground: NODE_ENV !== 'production' ? PLAYGROUND_CONFIG : false,
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
