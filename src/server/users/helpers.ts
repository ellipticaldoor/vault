import Photon, { User } from '~/server/photon';
import { createId } from '~/server/helpers';
import { createVault } from '~/server/vaults';
import { GameState } from '~/server/state';
import { hashPassword } from '~/server/auth';
import { ERROR } from '~/server/language';
import Joi from 'joi';

export const validateUsername = (username: string) => {
  Joi.assert(
    username,
    Joi.string()
      .strict()
      .min(3)
      .max(30)
      .token()
      .lowercase(),
  );
};

export const validatePassword = (password: string) => {
  Joi.assert(
    password,
    Joi.string()
      .strict()
      .min(8)
      .max(100),
  );
};

export const validateUsernameIsAvailable = async (
  photon: Photon,
  username: string,
) => {
  try {
    await photon.users.findOne({ where: { username } });
  } catch (error) {
    return;
  }
  throw new Error(ERROR.USERNAME_ALREADY_EXISTS(username));
};

type CreateUserArgs = {
  username: string;
  password: string;
  hasVault?: boolean;
};

export const createUser = async (
  photon: Photon,
  gameState: GameState,
  { username, password, hasVault = true }: CreateUserArgs,
): Promise<User> => {
  validateUsername(username);
  validatePassword(password);
  await validateUsernameIsAvailable(photon, username);

  const user = await photon.users.create({
    data: {
      id: createId(),
      username,
      password: await hashPassword(password),
    },
  });

  if (hasVault) {
    createVault(gameState, {
      userId: user.id,
    });
  }

  return user;
};
