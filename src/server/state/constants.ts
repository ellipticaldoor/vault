import { SerializedGameState } from 'server/state';

export const DEFAULT_GAME_STATE_ID = 1;

export const SERIALIZED_INITIAL_GAMESTATE: SerializedGameState = {
  id: DEFAULT_GAME_STATE_ID,
  ticks: 0,
  resources: [],
  facilities: [],
  vaults: [],
  missions: [],
};
