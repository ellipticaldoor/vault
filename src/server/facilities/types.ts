import { ID } from '~/server/game';

export type FacilityKind = 'ironMine';

export type Facility = {
  id: ID;
  ironMine: number;
};
