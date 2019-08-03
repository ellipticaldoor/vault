import React from 'react';
import { Home } from 'client/screens/Home';
import { Missions } from 'client/screens/Missions';
import { Vaults } from 'client/screens/Vaults';
import { Login } from 'client/screens/Auth/Login';
import { Signup } from 'client/screens/Auth/Signup';
import { CreateMission } from 'client/screens/CreateMission';

export type Route = {
  path: string;
  key: string;
  exact?: boolean;
  component: React.FC;
};

export const routes: Route[] = [
  { path: '/', key: 'Home', exact: true, component: Home },
  { path: '/missions', key: 'Missions', component: Missions },
  { path: '/create-mission', key: 'CreateMission', component: CreateMission },
  { path: '/vaults', key: 'Vaults', component: Vaults },
  { path: '/login', key: 'Login', component: Login },
  { path: '/signup', key: 'Signup', component: Signup },
];
