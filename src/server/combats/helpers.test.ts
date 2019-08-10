import cases from 'jest-in-case';
import * as helpers from '~/server/helpers';
import {
  getCombatStats,
  decideWinner,
  getAttackerChanceToWin,
  calculateLostDwellersInCombat,
  calculateWinningsAndLosses,
  applyCombatSimulation,
  Winner,
} from '~/server/combats';
import { createMission, MissionKind } from '~/server/missions';
import { createGameState } from '~/server/state';
import { createVault } from '~/server/vaults';

beforeEach(() => {
  jest.restoreAllMocks();
});

cases(
  'getDefendantStats',
  ({ prepare, expected }) => {
    const power = getCombatStats(prepare.resource);

    expect(power.attack).toEqual(expected.attack);
    expect(power.defense).toEqual(expected.defense);
  },
  {
    'resturns attack and defense power of a defendant vault': {
      prepare: {
        resource: {
          id: 'resource-id',
          iron: 1000,
          dwellers: 3,
        },
      },
      expected: {
        attack: 300,
        defense: 300,
      },
    },
  },
);

cases(
  'decideWinner',
  ({ prepare, expected }) => {
    const randomPercentageMock = jest
      .spyOn(helpers, 'randomPercentage')
      .mockReturnValueOnce(prepare.randomPercentage);

    const winner = decideWinner(prepare.attackerChanceToWin);

    expect(randomPercentageMock).toHaveBeenCalledTimes(1);
    expect(winner).toEqual(expected.winner);
  },
  {
    'attacker wins': {
      prepare: {
        randomPercentage: 70,
        attackerChanceToWin: 80,
      },
      expected: {
        winner: 'attacker',
      },
    },
    'defendant wins': {
      prepare: {
        randomPercentage: 90,
        attackerChanceToWin: 80,
      },
      expected: {
        winner: 'defendant',
      },
    },
  },
);

cases(
  'getAttackerChanceToWin',
  ({ prepare, expected }) => {
    const attackerChanceToWin = getAttackerChanceToWin(
      getCombatStats(prepare.attacker.resource),
      getCombatStats(prepare.defendant.resource),
    );

    expect(attackerChanceToWin).toEqual(expected.attackerChanceToWin);
  },
  {
    'returns a high change to win for the attacker': {
      prepare: {
        attacker: {
          resource: {
            id: 'attacker-id',
            dwellers: 30,
            iron: 0,
          },
        },
        defendant: {
          resource: {
            id: 'defendant-id',
            dwellers: 3,
            iron: 1000,
          },
        },
      },
      expected: {
        attackerChanceToWin: 90,
      },
    },
    'returns a low chance to win for the attacker': {
      prepare: {
        attacker: {
          resource: {
            id: 'attacker-id',
            dwellers: 6,
            iron: 0,
          },
        },
        defendant: {
          resource: {
            id: 'defendant-id',
            dwellers: 3,
            iron: 1000,
          },
        },
      },
      expected: {
        attackerChanceToWin: 50,
      },
    },
    '100 is the maximun chance to win': {
      prepare: {
        attacker: {
          resource: {
            id: 'attacker-id',
            dwellers: 1000,
            iron: 0,
          },
        },
        defendant: {
          resource: {
            id: 'defendant-id',
            dwellers: 3,
            iron: 1000,
          },
        },
      },
      expected: {
        attackerChanceToWin: 100,
      },
    },
    '0 is the minimum chance to win': {
      prepare: {
        attacker: {
          resource: {
            id: 'attacker-id',
            dwellers: 10,
            iron: 0,
          },
        },
        defendant: {
          resource: {
            id: 'defendant-id',
            dwellers: 1000,
            iron: 1000,
          },
        },
      },
      expected: {
        attackerChanceToWin: 0,
      },
    },
  },
);

cases(
  'calculateLostDwellersInCombat',
  ({ prepare, expected }) => {
    const lostDwellers = calculateLostDwellersInCombat(prepare);

    expect(lostDwellers).toEqual(expected.lostDwellers);
  },
  {
    'returns amount of lost dwellers': {
      prepare: {
        totalDwellers: 10,
        percentageToLoose: 50,
      },
      expected: {
        lostDwellers: -5,
      },
    },
  },
);

cases(
  'calculateWinningsAndLosses, applyCombatSimulation',
  ({ prepare, expected }) => {
    const gameState = createGameState();

    const attackerVault = createVault(gameState, {
      coordinate: { x: 0, y: 0 },
    });

    gameState.updateResource(
      attackerVault.resourceId,
      prepare.attacker.resource,
    );

    const defendantVault = createVault(gameState, {
      coordinate: { x: 10, y: 10 },
    });

    gameState.updateResource(
      defendantVault.resourceId,
      prepare.defendant.resource,
    );

    const attackerMission = createMission(gameState, {
      fromId: attackerVault.id,
      toId: defendantVault.id,
      initialResources: prepare.attackerMission.resource,
      kind: MissionKind.Attack,
    });

    const combatSimulation = calculateWinningsAndLosses(gameState, {
      attacker: attackerMission,
      defendant: defendantVault,
      winner: prepare.winner,
      attackerChanceToWin: prepare.attackerChanceToWin,
    });

    expect(combatSimulation).toEqual(expected.combatSimulation);

    expect(
      gameState.findResource({
        id: attackerMission.resourceId,
      }),
    ).toEqual({
      ...prepare.attackerMission.resource,
      id: expect.any(String),
    });

    expect(
      gameState.findResource({
        id: defendantVault.resourceId,
      }),
    ).toEqual(expected.defendantVaultBeforeSimulationApply.resource);

    applyCombatSimulation(gameState, {
      attackerId: attackerMission.id,
      defendantId: defendantVault.id,
      combatSimulation,
    });

    expect(
      gameState.findResource({
        id: attackerMission.resourceId,
      }),
    ).toEqual(expected.attackerMission.resource);

    expect(
      gameState.findResource({
        id: defendantVault.resourceId,
      }),
    ).toEqual(expected.defendantVault.resource);
  },
  {
    'attacker wins': {
      prepare: {
        attacker: {
          resource: {
            iron: 0,
            dwellers: 30,
          },
        },
        attackerMission: {
          resource: { iron: 0, dwellers: 30 },
        },
        defendant: {
          resource: {
            iron: 10000,
            dwellers: 0,
          },
        },
        winner: 'attacker' as Winner,
        attackerChanceToWin: 90,
      },
      expected: {
        combatSimulation: {
          winner: 'attacker',
          attacker: {
            resourceUpdate: {
              iron: 9900,
              dwellers: -3,
            },
          },
          defendant: {
            resourceUpdate: {
              iron: -9900,
              dwellers: -2,
            },
          },
        },
        attackerMission: {
          resource: {
            id: expect.any(String),
            iron: 9900,
            dwellers: 27,
          },
        },
        defendantVaultBeforeSimulationApply: {
          resource: {
            id: expect.any(String),
            iron: 11000,
            dwellers: 3,
          },
        },
        defendantVault: {
          resource: {
            id: expect.any(String),
            iron: 1100,
            dwellers: 1,
          },
        },
      },
    },
    'attacker losses everything when attackerChanceToWin is zero': {
      prepare: {
        attacker: {
          resource: {
            iron: 0,
            dwellers: 30,
          },
        },
        attackerMission: {
          resource: { iron: 0, dwellers: 30 },
        },
        defendant: {
          resource: {
            iron: 10000,
            dwellers: 100,
          },
        },
        winner: 'defendant' as Winner,
        attackerChanceToWin: 0,
      },
      expected: {
        combatSimulation: {
          winner: 'defendant',
          attacker: {
            resourceUpdate: {
              iron: 0,
              dwellers: -30,
            },
          },
          defendant: {
            resourceUpdate: {
              iron: 0,
              dwellers: -0,
            },
          },
        },
        attackerMission: {
          resource: {
            id: expect.any(String),
            iron: 0,
            dwellers: 0,
          },
        },
        defendantVaultBeforeSimulationApply: {
          resource: {
            id: expect.any(String),
            iron: 11000,
            dwellers: 103,
          },
        },
        defendantVault: {
          resource: {
            id: expect.any(String),
            iron: 11000,
            dwellers: 103,
          },
        },
      },
    },
  },
);
