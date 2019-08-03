import { ID } from 'server/game';
import { FacilityKind, FACILITY_STATS } from 'server/facilities';
import { GameState } from 'server/state';

export const upgradeFacilityLevel = (
  gameState: GameState,
  args: {
    vaultId: ID;
    facilityKind: FacilityKind;
  },
) => {
  const vault = gameState.findVault({ id: args.vaultId });

  gameState.updateResource(
    vault.resourceId,
    FACILITY_STATS[args.facilityKind].cost,
  );

  const facility = gameState.increaseFacilityLevel(
    vault.facilityId,
    args.facilityKind,
  );

  return facility;
};
