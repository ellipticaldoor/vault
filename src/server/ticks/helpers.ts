import { Coordinate } from 'server/game';
import { ResourceUpdate } from 'server/resources';
import { GameState } from 'server/state';
import { triggerMissionEvents } from 'server/missions';
import {
  IRON_PRODUCTION_FACTOR,
  DWELLERS_BORN_TICK_FACTOR,
  DEWLLERS_BORN_AMOUNT,
  ACCELERATION,
} from 'server/ticks';

export const nextTickResources = (gameState: GameState) => {
  const vaults = gameState.vaults();

  vaults.forEach((vault) => {
    const ticksSinceCreation = gameState.ticks() - vault.createdAtTick;
    const shouldProduceDwellers =
      ticksSinceCreation % DWELLERS_BORN_TICK_FACTOR === 0;
    const vaultFacility = gameState.findFacility({ id: vault.facilityId });

    const resourcesToUpdate: ResourceUpdate = {
      iron: IRON_PRODUCTION_FACTOR * vaultFacility.ironMine,
      dwellers: shouldProduceDwellers ? DEWLLERS_BORN_AMOUNT : 0,
    };

    gameState.updateResource(vault.resourceId, resourcesToUpdate);
  });
};

export const nextTick = (gameState: GameState) => {
  nextTickResources(gameState);
  triggerMissionEvents(gameState);

  gameState.increaseTicks();
};

type TicksToTravel = {
  from: Coordinate;
  to: Coordinate;
  velocity: number;
};

export const ticksToTravel = ({
  from,
  to,
  velocity,
}: TicksToTravel): number => {
  const distance = Math.hypot(to.x - from.x, to.y - from.y);

  if (distance === 0) {
    return 0;
  }

  const ticks = Math.floor(distance / (velocity * ACCELERATION));

  return ticks;
};
