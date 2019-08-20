import { GameState } from '~/client/state/types';

export const mockedInitialState: GameState = {
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
