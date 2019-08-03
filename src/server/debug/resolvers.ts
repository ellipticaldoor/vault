import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  GameStateResolvers,
} from 'api';
import { prop } from 'remeda';
import { serializeGamestate } from 'server/state';
import { resetGameState } from 'server/debug';

const GameState: GameStateResolvers = {
  id: prop('id'),
  ticks: prop('ticks'),
  resources: prop('resources'),
  vaults: prop('vaults'),
  facilities: prop('facilities'),
  missions: prop('missions'),
};

const Query: Partial<QueryResolvers> = {
  gameState: (parent, args, { gameState }) => {
    return serializeGamestate(gameState);
  },
};

const Mutation: Partial<MutationResolvers> = {
  resetGameState: async (parent, args, { gameState, photon }) => {
    await resetGameState(photon, gameState);
    return serializeGamestate(gameState);
  },
};

export default {
  GameState,
  Query,
  Mutation,
} as Resolvers;
