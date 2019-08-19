import { User } from '~/photon';

export type TokenPayload = {
  userId: string;
};

export type AuthPayload = {
  token: string;
  user: User;
};
