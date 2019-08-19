import Photon, { User } from '~/photon';
import { Request, Response } from 'express';
import { GameState } from '~/server/state';

export type ExpressContext = {
  req: Request;
  res: Response;
};

export type AuthContext = {
  user: User;
};

export type ApolloContext = {
  req: Request;
  res: Response;
  gameState: GameState;
  photon: Photon;
  auth?: AuthContext;
};
