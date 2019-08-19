import Photon from '~/photon';
import { NODE_ENV } from '~/server/env';
import {
  GameState,
  setGameState,
  SERIALIZED_INITIAL_GAMESTATE,
} from '~/server/state';
// import { resetGameStateRequest } from '~/server/debug';
// import { loginRequest } from '~/server/auth';
// import { TEST_USER } from '~/server/debug';
// import { AuthPayloadFieldsFragment } from '~/server/apollo';
import { seedGameState, resetDb } from '~/server/debug';

export const validateTestingMode = () => {
  const isTestingMode = NODE_ENV === 'development' || NODE_ENV === 'test';

  if (!isTestingMode) {
    throw new Error('resetTestingDb should be used in development mode only');
  }
};

export const resetGameState = async (photon: Photon, gameState: GameState) => {
  validateTestingMode();
  setGameState(gameState, SERIALIZED_INITIAL_GAMESTATE);
  await resetDb(photon);
  await seedGameState(photon, gameState);
};

export const e2eTestSetup = () => {
  // const setup: AuthPayloadFieldsFragment = { token: '', user: {} as any };
  const setup = {};

  beforeAll(async () => {
    // await resetGameStateRequest();
    // const { login } = await loginRequest({
    //   variables: {
    //     data: {
    //       username: TEST_USER.username,
    //       password: TEST_USER.password,
    //     },
    //   },
    // });
    // setup.token = login.token;
    // setup.user = login.user;
  });

  return setup;
};

export const dbTestSetup = () => {
  validateTestingMode();

  let photon = (undefined as any) as Photon;
  const setup = { photon };

  beforeAll(async () => {
    photon = new Photon();
    await resetDb(photon);
    setup.photon = photon;
  });

  afterAll(async () => {
    await photon.disconnect();
  });

  return setup;
};
