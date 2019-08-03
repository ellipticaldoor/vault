import { ID } from 'server/game';

export enum FacilityKind {
  IronMine = 'ironMine',
}

export type Facility = {
  id: ID;
  ironMine: number;
};
