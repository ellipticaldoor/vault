import { ID, Coordinate } from '~/server/game';

export type Vault = {
  id: ID;
  userId: ID | null;
  resourceId: ID;
  facilityId: ID;
  createdAtTick: number;
} & Coordinate;
