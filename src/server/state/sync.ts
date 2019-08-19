import Photon from '~/photon';
import { GameState, SerializedGameState, Table } from '~/server/state';

export const syncDbWithGameState = async (
  photon: Photon,
  gameState: GameState,
) => {
  async function upsertMany(table: Exclude<Table, 'users'>) {
    const toUpsert = gameState[table]().map((record) =>
      photon[table].upsert({
        where: { id: record.id },
        create: record,
        update: {},
      }),
    );
    return Promise.all(toUpsert);
  }

  await upsertMany('vaults');
};

export const setGameState = (
  gameState: GameState,
  rawGameState: SerializedGameState,
): GameState => {
  gameState.setTicks(rawGameState.ticks);
  gameState.setResources(rawGameState.resources);
  gameState.setFacilities(rawGameState.facilities);
  gameState.setVaults(rawGameState.vaults);
  gameState.setMissions(rawGameState.missions);

  return gameState;
};

export const serializeGamestate = (
  gameState: GameState,
): SerializedGameState => {
  return {
    id: gameState.id(),
    ticks: gameState.ticks(),
    resources: gameState.resources(),
    vaults: gameState.vaults(),
    facilities: gameState.facilities(),
    missions: gameState.missions(),
  };
};
