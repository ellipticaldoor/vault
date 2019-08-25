import React from 'react';
import { Missions } from '~/client/screens/Missions';
import { Atlas } from '~/client/screens/Atlas';
import { Login } from '~/client/screens/Auth/Login';
import { Signup } from '~/client/screens/Auth/Signup';
import { NewMission } from '~/client/screens/NewMission';
import { Resources } from '~/client/screens/Resources';
import { Facilities } from '~/client/screens/Facilities';

export type Route = {
  path: string;
  key: string;
  exact?: boolean;
  component: React.FC;
};

export const routes: Route[] = [
  { path: '/', key: 'Atlas', exact: true, component: Atlas },
  { path: '/resources', key: 'Resources', component: Resources },
  { path: '/facilities', key: 'Facilities', component: Facilities },
  { path: '/missions', key: 'Missions', component: Missions },
  { path: '/new-mission', key: 'New Mission', component: NewMission },
  { path: '/login', key: 'Login', component: Login },
  { path: '/signup', key: 'Signup', component: Signup },
];
