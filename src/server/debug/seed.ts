import Photon, { UserDelegate } from '~/photon';
import { GameState, Table, DEFAULT_GAME_STATE_ID } from '~/server/state';
import { createUser } from '~/server/users';
import { createVault } from '~/server/vaults';
import { TEST_USER, validateTestingMode } from '~/server/debug';

const deleteTable = async (photon: Photon, table: Table) => {
  // Warning: UserDelegate is forced as a type to enable to query generic methods
  const { findMany, deleteMany } = photon[table] as UserDelegate;
  const results = await findMany();

  if (results.length > 0) {
    await deleteMany({
      where: { id: { in: results.map(({ id }) => id) } },
    });
  }
};

export const resetDb = async (photon: Photon) => {
  validateTestingMode();

  await Promise.all([
    deleteTable(photon, 'gameStates'),
    deleteTable(photon, 'users'),
    deleteTable(photon, 'vaults'),
  ]);
};

export const seedGameState = async (photon: Photon, gameState: GameState) => {
  validateTestingMode();

  await Promise.all([
    photon.gameStates.create({
      data: {
        id: DEFAULT_GAME_STATE_ID,
        ticks: 0,
      },
    }),
    createUser(photon, gameState, {
      username: TEST_USER.username,
      password: TEST_USER.password,
    }),
    createUser(photon, gameState, {
      username: 'first_seed_user',
      password: 'password',
    }),
  ]);

  createVault(gameState);
};
