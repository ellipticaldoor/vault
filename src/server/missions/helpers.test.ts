import {
  createMission,
  missionOnArrival,
  missionOnComeback,
  MissionKind,
} from '~/server/missions';
import cases from 'jest-in-case';
import * as helpers from '~/server/helpers';
import { createGameState } from '~/server/state';
import { createVault } from '~/server/vaults';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('createMission', () => {
  test('throws an error when a vault tries to attack itself', () => {
    const gameState = createGameState();
    const attacker = createVault(gameState);

    try {
      createMission(gameState, {
        fromId: attacker.id,
        toId: attacker.id,
        initialResources: { iron: 0, dwellers: 0 },
        kind: MissionKind.Attack,
      });

      fail('User should not be able to attack himself');
    } catch (error) {
      expect(error.message).toMatch(
        "Mission destination can't be equal to departure",
      );
    }
  });

  test('throws an error when a vault tries to create a missions with more resources than it has', () => {
    const gameState = createGameState();
    const attacker = createVault(gameState);
    const defendant = createVault(gameState);

    try {
      createMission(gameState, {
        fromId: attacker.id,
        toId: defendant.id,
        initialResources: { iron: 0, dwellers: 1000 },
        kind: MissionKind.Attack,
      });

      fail('User should not be able to create the mission');
    } catch (error) {
      expect(error.message).toMatch(
        'Not enough resources to create the mission',
      );
    }
  });
});

cases(
  'missionOnArrival, missionOnComeback',
  ({ prepare, expected }) => {
    const gameState = createGameState();

    const fromVault = createVault(gameState, {
      coordinate: prepare.from.coordinate,
    });

    gameState.updateResource(fromVault.resourceId, prepare.from.resource);

    const toVault = createVault(gameState, {
      coordinate: prepare.to.coordinate,
    });

    gameState.updateResource(toVault.resourceId, prepare.to.resource);

    const mission = createMission(gameState, {
      fromId: fromVault.id,
      toId: toVault.id,
      initialResources: prepare.createMissionResource,
      kind: MissionKind.Attack,
    });

    const randomPercentageMock = jest
      .spyOn(helpers, 'randomPercentage')
      .mockReturnValueOnce(prepare.randomPercentage);

    // missionOnArrival
    missionOnArrival(gameState, mission);

    expect(gameState.missions()).toHaveLength(1);

    expect(gameState.findOneMission({ id: mission.id })).toMatchObject(
      expected.mission,
    );

    let missionResource = gameState.findResource({ id: mission.resourceId });
    expect(missionResource).toMatchObject(expected.missionResource.onArrival);

    let fromVaultResource = gameState.findResource({
      id: fromVault.resourceId,
    });
    expect(fromVaultResource).toMatchObject(expected.from.resource);

    const toVaultResource = gameState.findResource({
      id: toVault.resourceId,
    });
    expect(toVaultResource).toMatchObject(expected.to.resource);

    // missionOnComeback
    gameState.setTicks(mission.comebackTick);

    missionOnComeback(gameState, gameState.findOneMission({ id: mission.id }));

    missionResource = gameState.findResource({ id: mission.resourceId });
    expect(missionResource).toMatchObject(expected.missionResource.onComeback);

    fromVaultResource = gameState.findResource({ id: fromVault.resourceId });
    expect(fromVaultResource).toMatchObject(expected.from.resourceOnComeback);

    expect(randomPercentageMock).toHaveBeenCalledTimes(1);
  },
  {
    'attacker wins': {
      prepare: {
        randomPercentage: 0, // Best chance for attacker to win
        from: {
          coordinate: { x: 5, y: 10 },
          resource: { iron: 0, dwellers: 1500 },
        },
        to: {
          coordinate: { x: 50, y: 150 },
          resource: { iron: 10000, dwellers: 10 },
        },
        createMissionResource: {
          iron: 0,
          dwellers: 1500,
        },
      },
      expected: {
        mission: {
          arrivalTick: 58,
          comebackTick: 116,
          createdAtTick: 0,
          kind: 'attack',
        },
        missionResource: {
          onArrival: {
            iron: 11000,
            dwellers: 1500,
          },
          onComeback: {
            iron: 0,
            dwellers: 0,
          },
        },
        from: {
          resource: {
            dwellers: 3,
            iron: 1000,
          },
          resourceOnComeback: {
            dwellers: 1503,
            iron: 12000,
          },
        },
        to: {
          resource: {
            dwellers: 0,
            iron: 0,
          },
        },
      },
    },
    'defendant wins': {
      prepare: {
        randomPercentage: 100, // Best chance for defendant to win
        from: {
          coordinate: { x: 5, y: 10 },
          resource: { iron: 0, dwellers: 1500 },
        },
        to: {
          coordinate: { x: 50, y: 150 },
          resource: { iron: 10000, dwellers: 100 },
        },
        createMissionResource: {
          iron: 0,
          dwellers: 5,
        },
      },
      expected: {
        mission: {
          arrivalTick: 58,
          comebackTick: 116,
          createdAtTick: 0,
          kind: 'attack',
        },
        missionResource: {
          onArrival: {
            iron: 0,
            dwellers: 0,
          },
          onComeback: {
            iron: 0,
            dwellers: 0,
          },
        },
        from: {
          resource: {
            dwellers: 1498,
            iron: 1000,
          },
          resourceOnComeback: {
            dwellers: 1498,
            iron: 1000,
          },
        },
        to: {
          resource: {
            dwellers: 103,
            iron: 11000,
          },
        },
      },
    },
  },
);
