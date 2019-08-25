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
        createdAtTick: 0,
        arrivalTick: 60,
        comebackTick: 120,
        resources: {
          dwellers: 100,
        },
      },
      {
        id: 'mission-2',
        from: { id: 'my-vault', x: 0, y: 0 },
        to: { id: 'enemy-vault-2', x: 20, y: 20 },
        kind: MissionKind.Attack,
        createdAtTick: 0,
        arrivalTick: 5,
        comebackTick: 100,
        resources: {
          dwellers: 40,
          iron: 1000,
        },
      },
      {
        id: 'mission-3',
        from: { id: 'enemy-vault', x: 10, y: 10 },
        to: { id: 'my-vault', x: 0, y: 0 },
        kind: MissionKind.Attack,
        createdAtTick: 0,
        arrivalTick: 60,
        comebackTick: 120,
        resources: {},
      },
    ],
    facilities: {
      id: '',
      ironMine: 0,
    },
    resources: {
      dwellers: 0,
      iron: 0,
    },
    user: {
      id: '',
      username: '',
    },
  },
};
