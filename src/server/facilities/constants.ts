import { ResourceUpdate } from 'server/resources';
import { FacilityKind } from 'server/facilities';

type FacilityStats = {
  [k in FacilityKind]: {
    dwellerCapacity: number;
    cost: ResourceUpdate;
  };
};

export const FACILITY_STATS: FacilityStats = {
  ironMine: {
    dwellerCapacity: 10,
    cost: {
      iron: -200,
      dwellers: 0,
    },
  },
};
