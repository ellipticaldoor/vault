import Photon from '~/photon';
import { Resource } from '~/server/resources';
import { Vault } from '~/server/vaults';
import { Mission } from '~/server/missions';
import { Facility } from '~/server/facilities';

export type SerializedGameState = {
  id: number;
  ticks: number;
  resources: Resource[];
  facilities: Facility[];
  vaults: Vault[];
  missions: Mission[];
};

export type Table = Exclude<keyof Photon, 'connect' | 'disconnect'>;
