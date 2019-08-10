import {
  nextTickResources,
  nextTick,
  ticksToTravel,
} from '~/server/ticks/helpers';
import cases from 'jest-in-case';
import { createGameState } from '~/server/state';
import { VAULT_DEFAULT_RESOURCE, createVault } from '~/server/vaults';
import { FacilityKind } from '~/server/facilities';

cases(
  'nextTickResources',
  ({ prepare, expected }) => {
    const gameState = createGameState();

    gameState.setTicks(prepare.ticks);

    const vault = createVault(gameState, {
      coordinate: { x: 0, y: 0 },
    });

    if (prepare.hasIronMine) {
      gameState.increaseFacilityLevel(vault.facilityId, FacilityKind.IronMine);
    }

    nextTickResources(gameState);

    const resource = gameState.findResource({ id: vault.resourceId });
    const facility = gameState.findFacility({ id: vault.facilityId });

    expect(resource).toEqual(expected.resource);
    expect(facility).toEqual(expected.facility);
  },
  {
    'does not increase the resources of a vault without rooms': {
      prepare: {
        ticks: 0,
        hasIronMine: false,
      },
      expected: {
        resource: {
          id: expect.any(String),
          iron: 1000,
          dwellers: 4,
        },
        facility: {
          id: expect.any(String),
          ironMine: 0,
        },
      },
    },
    'increases the iron resources of vault that has an iron mine': {
      prepare: {
        ticks: 1,
        hasIronMine: true,
      },
      expected: {
        resource: {
          id: expect.any(String),
          iron: 1002,
          dwellers: 4,
        },
        facility: {
          id: expect.any(String),
          ironMine: 1,
        },
      },
    },
  },
);

cases(
  'nextTick',
  ({ expected }) => {
    const gameState = createGameState();

    const vaults = [
      createVault(gameState, { coordinate: { x: 0, y: 0 } }),
      createVault(gameState, { coordinate: { x: 1, y: 1 } }),
      createVault(gameState, { coordinate: { x: 2, y: 2 } }),
    ];

    vaults.forEach((vault) => {
      gameState.increaseFacilityLevel(vault.facilityId, FacilityKind.IronMine);
    });

    nextTick(gameState);

    gameState.vaults().forEach((vault) => {
      const resource = gameState.findResource({ id: vault.resourceId });
      expect(resource).toEqual(expected.afterFirstTick.resource);
    });

    expect(gameState.ticks()).toEqual(1);

    nextTick(gameState);

    gameState.vaults().forEach((vault) => {
      const resource = gameState.findResource({ id: vault.resourceId });
      expect(resource).toEqual(expected.afterSecondTick.resource);
    });

    expect(gameState.ticks()).toEqual(2);
  },
  {
    'updates the resources of vaults with iron mines': {
      expected: {
        afterFirstTick: {
          resource: {
            id: expect.any(String),
            iron: VAULT_DEFAULT_RESOURCE.iron + 2,
            dwellers: VAULT_DEFAULT_RESOURCE.dwellers + 1,
          },
        },
        afterSecondTick: {
          resource: {
            id: expect.any(String),
            iron: VAULT_DEFAULT_RESOURCE.iron + 4,
            dwellers: VAULT_DEFAULT_RESOURCE.dwellers + 1,
          },
        },
      },
    },
  },
);

cases(
  'ticksToTravel',
  ({ prepare, expected }) => {
    const ticks = ticksToTravel(prepare);

    expect(ticks).toEqual(expected.ticks);
  },
  {
    'returns the amount of ticks to happen before traveling from one coordinate to another': {
      prepare: {
        from: { x: 0, y: 0 },
        to: { x: 0, y: 0 },
        velocity: 0,
      },
      expected: {
        ticks: 0,
      },
    },
    '2': {
      prepare: {
        from: { x: 0, y: 0 },
        to: { x: 10, y: 20 },
        velocity: 2,
      },
      expected: {
        ticks: 22,
      },
    },
    '3': {
      prepare: {
        from: { x: 0, y: 0 },
        to: { x: 100, y: 77 },
        velocity: 4,
      },
      expected: {
        ticks: 63,
      },
    },
    '5': {
      prepare: {
        from: { x: -10, y: -150 },
        to: { x: -78, y: -320 },
        velocity: 4,
      },
      expected: {
        ticks: 91,
      },
    },
    '6': {
      prepare: {
        from: { x: 100, y: -150 },
        to: { x: -78, y: 320 },
        velocity: 4,
      },
      expected: {
        ticks: 251,
      },
    },
  },
);
