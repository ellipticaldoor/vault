import { createGameState } from 'server/state';
import { createVault } from 'server/vaults';
import { FacilityKind, upgradeFacilityLevel } from 'server/facilities';

describe('upgradeFacilityLevel', () => {
  test('increases the level of a facility', () => {
    const gameState = createGameState();

    const vault = createVault(gameState, {
      coordinate: { x: 0, y: 0 },
    });

    const resources = gameState.findResource({ id: vault.resourceId });

    upgradeFacilityLevel(gameState, {
      vaultId: vault.id,
      facilityKind: FacilityKind.IronMine,
    });

    const resourcesAfterUpgrade = gameState.findResource({
      id: vault.resourceId,
    });

    expect(resources.iron).toBeGreaterThan(resourcesAfterUpgrade.iron);
  });

  test("throws an error when trying to update a facility of a vault that doesn't has enough resources", () => {
    const gameState = createGameState();

    const vault = createVault(gameState, {
      coordinate: { x: 0, y: 0 },
    });

    let resources = gameState.findResource({ id: vault.resourceId });

    resources = gameState.updateResource(vault.resourceId, {
      dwellers: resources.dwellers * -1,
      iron: resources.iron * -1,
    });

    expect(resources).toEqual({
      id: expect.any(String),
      iron: 0,
      dwellers: 0,
    });

    try {
      upgradeFacilityLevel(gameState, {
        vaultId: vault.id,
        facilityKind: FacilityKind.IronMine,
      });

      fail(
        'A vault without resources should not be able to increase a facility level',
      );
    } catch (error) {
      expect(error.message).toMatch('Not enough resources to update');
    }
  });
});
