export type Facilities = {
  id: string;
  ironMine: number;
};

export type User = {
  id: string;
  username: string;
};

export type MyMission = {
  id: string;
};

export type Resources = {
  id: string;
  dwellers: number;
  iron: number;
};

export type MyVault = {
  id: string;
  x: 0;
  y: 0;
  missions: MyMission[];
  facilities: Facilities;
  resources: Resources;
  user: User;
};

export type GameState = {
  ticks: number;
  myVault: MyVault;
};
