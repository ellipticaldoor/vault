import cases from 'jest-in-case';
import { createGameState } from 'server/state';
import { createMission, MissionKind } from 'server/missions';
import { createVault } from 'server/vaults';

cases(
  'getMission, addMission',
  ({ prepare }) => {
    const gameState = createGameState();

    const fromVault = createVault(gameState, {
      coordinate: { x: 0, y: 0 },
    });

    const toVault = createVault(gameState, {
      coordinate: { x: 1, y: 1 },
    });

    expect(gameState.missions()).toHaveLength(0);

    createMission(gameState, {
      fromId: fromVault.id,
      toId: toVault.id,
      kind: MissionKind.Attack,
      initialResources: prepare.initialResources,
    });

    expect(gameState.missions()).toHaveLength(1);
  },
  {
    'updates the resources of a mission': {
      prepare: {
        initialResources: {
          dwellers: 0,
          iron: 0,
        },
      },
    },
  },
);
