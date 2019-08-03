import createUseContext from 'constate';
import { useState, useEffect } from 'react';
import { GAMESTATE_REFRESH_RATE } from 'server/game/constants';
import { Vault } from 'api';

export type GameState = {
  ticks: number;
  myVault: Vault;
};

export const initialGameState: GameState = {
  ticks: 0,
  myVault: {
    id: '',
    x: 0,
    y: 0,
    facility: { id: '', ironMine: 0 },
    missions: [],
    resource: { id: '', dwellers: 0, iron: 0 },
    user: {} as any,
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
