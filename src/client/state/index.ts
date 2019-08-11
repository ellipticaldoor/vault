import createUseContext from 'constate';
import { useState, useEffect } from 'react';
import { GAMESTATE_REFRESH_RATE } from '~/server/game/constants';
import { GameState } from '~/client/state/types';

export const initialGameState: GameState = {
  ticks: 0,
  myVault: {
    id: '',
    x: 0,
    y: 0,
    missions: [],
    facilities: {
      id: '',
      ironMine: 0,
    },
    resources: {
      id: '',
      dwellers: 0,
      iron: 0,
    },
    user: {
      id: '',
      username: '',
    },
  },
};

export const useGameState = (gameState: GameState) => {
  const [ticks, setTicks] = useState(gameState.ticks);
  const [myVault] = useState(gameState.myVault);

  useEffect(() => {
    setInterval(() => {
      setTicks((prev) => prev + 1);
    }, GAMESTATE_REFRESH_RATE);
  }, []);

  return {
    state: {
      ticks,
      myVault,
    },
  };
};

export default createUseContext(() => {
  return useGameState(initialGameState);
});
