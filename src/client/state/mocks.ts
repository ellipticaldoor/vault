import { GameState } from '~/client/state/types';
import { MissionKind } from '~/api/graphql';

export const mockedInitialState: GameState = {
  ticks: 0,
  myVault: {
    id: 'my-vault',
    x: 0,
    y: 0,
    missions: [
      {
        id: 'mission-1',
        from: { id: 'my-vault', x: 0, y: 0 },
        to: { id: 'enemy-vault', x: 10, y: 10 },
        kind: MissionKind.Attack,
      },
      {
        id: 'mission-2',
        from: { id: 'my-vault', x: 0, y: 0 },
        to: { id: 'enemy-vault-2', x: 20, y: 20 },
        kind: MissionKind.Attack,
      },
      {
        id: 'mission-3',
        from: { id: 'enemy-vault', x: 10, y: 10 },
        to: { id: 'my-vault', x: 0, y: 0 },
        kind: MissionKind.Attack,
      },
    ],
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
