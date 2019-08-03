import { ID } from 'server/game';

export enum MissionKind {
  Attack = 'attack',
}

export type Mission = {
  id: ID;
  fromId: ID;
  toId: ID;
  resourceId: ID;
  kind: MissionKind;
  createdAtTick: number;
  arrivalTick: number;
  comebackTick: number;
};
