import { Resolvers, QueryResolvers, UserResolvers } from 'api';
import { prop } from 'remeda';
import { ERROR } from 'server/language';

const User: UserResolvers = {
  id: ({ id }) => id,
  username: prop('username'),
  vault: ({ id }, args, { gameState }) => {
    return gameState.findVault({ userId: id });
  },
};

const Query: Partial<QueryResolvers> = {
  my: async (parent, args, { auth }) => {
    if (!auth) throw new Error(ERROR.AUTH_ERROR);
    return auth.user;
  },
};

export default {
  User,
  Query,
} as Resolvers;
