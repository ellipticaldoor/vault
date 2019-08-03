import { DEFAULT_GAME_STATE_ID } from 'server/state';
import { createTicks } from 'server/ticks';
import { createVaults } from 'server/vaults';
import { createMissions } from 'server/missions';
import { createResources } from 'server/resources';
import { createFacilities } from 'server/facilities';

export const createGameState = () => {
  return {
    id: () => DEFAULT_GAME_STATE_ID,
    ...createTicks(),
    ...createVaults(),
    ...createMissions(),
    ...createResources(),
    ...createFacilities(),
  };
};

export type GameState = ReturnType<typeof createGameState>;
