import React from 'react';
import { Home } from 'client/screens/Home';
import { Missions } from 'client/screens/Missions';
import { Atlas } from 'client/screens/Atlas';
import { Login } from 'client/screens/Auth/Login';
import { Signup } from 'client/screens/Auth/Signup';
import { NewMission } from 'client/screens/NewMission';

export type Route = {
  path: string;
  key: string;
  exact?: boolean;
  component: React.FC;
};

export const routes: Route[] = [
  { path: '/', key: 'Home', exact: true, component: Home },
  { path: '/missions', key: 'Missions', component: Missions },
  { path: '/new-mission', key: 'New Mission', component: NewMission },
  { path: '/atlas', key: 'Atlas', component: Atlas },
  { path: '/login', key: 'Login', component: Login },
  { path: '/signup', key: 'Signup', component: Signup },
];
