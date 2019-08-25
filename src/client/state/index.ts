import createUseContext from 'constate';
import { useState, useEffect } from 'react';
import { gameConfig } from '~/game-config';
import { GameState } from '~/client/state/types';
import { mockedInitialState } from '~/client/state/mocks';

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

const useGameState = (gameState: GameState) => {
  const [ticks, setTicks] = useState(gameState.ticks);
  const [myVault] = useState(gameState.myVault);

  useEffect(() => {
    setInterval(() => {
      setTicks((prev) => prev + 1);
    }, gameConfig.refreshRate);
  }, []);

  return {
    ticks,
    myVault,
  };
};

export default createUseContext(() => {
  return useGameState(mockedInitialState);
});
