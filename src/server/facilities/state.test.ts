import { createGameState } from 'server/state';
import { createVault } from 'server/vaults';
import { FacilityKind } from 'server/facilities';

describe('increaseFacilityLevel', () => {
  test('increases the level of a facility', () => {
    const gameState = createGameState();

    const vault = createVault(gameState, {
      coordinate: { x: 0, y: 0 },
    });

    const facility = gameState.findFacility({ id: vault.facilityId });

    expect(facility.ironMine).toEqual(0);

    gameState.increaseFacilityLevel(vault.facilityId, FacilityKind.IronMine);

    const updatedFacility = gameState.findFacility({ id: vault.facilityId });

    expect(updatedFacility.ironMine).toEqual(1);
  });
});
