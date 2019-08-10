import { createGameState } from '~/server/state';

it('increaseTicks', () => {
  const gameState = createGameState();

  expect(gameState.ticks()).toEqual(0);

  gameState.increaseTicks();

  expect(gameState.ticks()).toEqual(1);

  gameState.increaseTicks();

  expect(gameState.ticks()).toEqual(2);
});

it('setTicks', () => {
  const gameState = createGameState();

  expect(gameState.ticks()).toEqual(0);

  gameState.setTicks(437);

  expect(gameState.ticks()).toEqual(437);
});
