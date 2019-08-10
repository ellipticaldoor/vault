import { createGameState } from '~/server/state';
import { createVault } from '~/server/vaults';
import cases from 'jest-in-case';

test('createUniqueCoordinate', () => {
  const gameState = createGameState();
  const coordinatesAmount = 10000;

  const vaults = Array.from({ length: coordinatesAmount }, () =>
    createVault(gameState),
  );

  const distinctsCoordinates = [
    ...new Set(
      vaults.map(({ x, y }) => {
        return `${x},${y}`;
      }),
    ),
  ];

  expect(distinctsCoordinates).toHaveLength(coordinatesAmount);
});

describe('createVault', () => {
  cases(
    'throws an error when trying to create a vault in the same coordinate',
    ({ coordinate }) => {
      const gameState = createGameState();

      createVault(gameState, { coordinate });

      try {
        createVault(gameState, { coordinate });
        fail(
          'should not be able to create a vault in a place that already exists',
        );
      } catch (error) {
        expect(error.message).toMatch('already in use');
      }
    },
    {
      '1': {
        coordinate: { x: 0, y: 0 },
      },
      '2': {
        coordinate: { x: 1, y: 1 },
      },
      '3': {
        coordinate: { x: -1, y: -1 },
      },
      '4': {
        coordinate: { x: 1, y: -1 },
      },
      '5': {
        coordinate: { x: -1, y: 1 },
      },
    },
  );
});
