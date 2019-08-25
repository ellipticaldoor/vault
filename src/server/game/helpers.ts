import { createGameState, GameState } from '~/server/state';
import { gameConfig } from '~/game-config';

const startGameLoop = (gameState: GameState) => {
  setInterval(() => {
    gameState.increaseTicks();
  }, gameConfig.refreshRate);
};

export const createGame = () => {
  const gameState = createGameState();

  startGameLoop(gameState);

  return gameState;
};
