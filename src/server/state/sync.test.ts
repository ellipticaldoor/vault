import { dbTestSetup } from 'server/debug';
import {
  createGameState,
  // syncDbWithGameState,
  // DEFAULT_GAME_STATE_ID,
} from 'server/state';
import { createVault } from 'server/vaults';
import { createMission, MissionKind } from 'server/missions';

const setup = dbTestSetup();

test('syncDbWithGameState, syncGameStateWithDb', async () => {
  const gameState = createGameState();
  console.log(setup.photon);

  gameState.setTicks(100);

  const fromVault = createVault(gameState, {
    coordinate: { x: 0, y: 0 },
  });

  const toVault = createVault(gameState, {
    coordinate: { x: 1, y: 1 },
  });

  createMission(gameState, {
    fromId: fromVault.id,
    toId: toVault.id,
    kind: MissionKind.Attack,
    initialResources: {
      iron: 0,
      dwellers: 0,
    },
  });

  // await syncDbWithGameState(setup.photon, gameState);

  // expect(await GameState.findOne({ id: DEFAULT_GAME_STATE_ID })).toEqual({
  //   id: DEFAULT_GAME_STATE_ID,
  //   ticks: 100,
  // });

  // expect(await setup.photon.vaults.findMany()).toHaveLength(2);
  // expect(await Resource.find()).toHaveLength(3);
  // expect(await Facility.find()).toHaveLength(2);
  // expect(await Mission.find()).toHaveLength(1);

  const gameStateToSyncWithDb = createGameState();

  expect(gameStateToSyncWithDb.ticks()).toEqual(0);
  expect(gameStateToSyncWithDb.resources()).toHaveLength(0);
  expect(gameStateToSyncWithDb.facilities()).toHaveLength(0);
  expect(gameStateToSyncWithDb.vaults()).toHaveLength(0);
  expect(gameStateToSyncWithDb.missions()).toHaveLength(0);

  // await syncGameStateWithDb(gameStateToSyncWithDb);

  // expect(gameStateToSyncWithDb.ticks()).toEqual(100);
  // expect(gameStateToSyncWithDb.vaults()).toHaveLength(2);
  // expect(gameStateToSyncWithDb.resources()).toHaveLength(3);
  // expect(gameStateToSyncWithDb.facilities()).toHaveLength(2);
  // expect(gameStateToSyncWithDb.missions()).toHaveLength(1);
});
