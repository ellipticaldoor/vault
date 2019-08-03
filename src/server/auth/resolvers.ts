import { ERROR } from 'server/language';
import { Resolvers, MutationResolvers, AuthPayloadResolvers } from 'api';
import { prop } from 'remeda';
import { signToken } from 'server/auth';
import { AuthContext } from 'server/apollo';
import { compare } from 'bcrypt';
import { validateUsername, validatePassword, createUser } from 'server/users';

const AuthPayload: AuthPayloadResolvers = {
  token: prop('token'),
  user: prop('user'),
};

const Mutation: Partial<MutationResolvers> = {
  login: async (parent, { data: { username, password } }, context) => {
    validateUsername(username);
    validatePassword(password);

    const user = await context.photon.users.findOne({ where: { username } });

    if (!user) {
      throw new Error(ERROR.WRONG_USERNAME_OR_PASSWORD);
    }

    const isPassworValid = await compare(password, user.password);

    if (!isPassworValid) {
      throw new Error(ERROR.WRONG_USERNAME_OR_PASSWORD);
    }

    context.auth = { user } as AuthContext;

    return {
      token: signToken(user),
      user,
    };
  },
  signup: async (parent, { data }, context) => {
    const user = await createUser(context.photon, context.gameState, data);
    context.auth = { user } as AuthContext;
    return {
      token: signToken(user),
      user,
    };
  },
};

export default {
  AuthPayload,
  Mutation,
} as Resolvers;
