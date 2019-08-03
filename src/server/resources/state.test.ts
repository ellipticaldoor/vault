import { createGameState } from 'server/state';
import cases from 'jest-in-case';
import { createVault } from 'server/vaults';

cases(
  'updateResource',
  ({ prepare, expected }) => {
    const gameState = createGameState();

    const vault = createVault(gameState, {
      coordinate: { x: 0, y: 0 },
    });

    const updatedResource = gameState.updateResource(
      vault.resourceId,
      prepare.resourcesToUpdate,
    );

    expect(updatedResource).toEqual(expected.vault.resources);
  },
  {
    'updates the resources of a vault': {
      prepare: {
        resourcesToUpdate: { iron: 123000, dwellers: 0 },
      },
      expected: {
        vault: {
          resources: {
            id: expect.any(String),
            dwellers: 3,
            iron: 124000,
          },
        },
      },
    },
  },
);
