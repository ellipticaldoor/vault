import { ID } from 'server/game/types';

export type Resource = {
  id: ID;
  iron: number;
  dwellers: number;
};

export type ResourceUpdate = {
  iron?: number;
  dwellers?: number;
};
