import { MissionKind, Resources } from '~/api/graphql';

export type Facilities = {
  id: string;
  ironMine: number;
};

export type User = {
  id: string;
  username: string;
};

export type Vault = {
  id: string;
  x: number;
  y: number;
};

export type Mission = {
  id: string;
  kind: MissionKind;
  from: Vault;
  to: Vault;
  createdAtTick: number;
  arrivalTick: number;
  comebackTick: number;
  resources: Partial<Resources>;
};

export type MyVault = {
  id: string;
  x: number;
  y: number;
  missions: Mission[];
  facilities: Facilities;
  resources: Resources;
  user: User;
};

export type GameState = {
  ticks: number;
  myVault: MyVault;
};
