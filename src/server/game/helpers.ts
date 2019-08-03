import { createGameState, GameState } from 'server/state';
import { GAMESTATE_REFRESH_RATE } from 'server/game/constants';

const startGameLoop = (gameState: GameState) => {
  setInterval(() => {
    gameState.increaseTicks();
  }, GAMESTATE_REFRESH_RATE);
};

export const createGame = () => {
  const gameState = createGameState();

  startGameLoop(gameState);

  return gameState;
};
