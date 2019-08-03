import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'server/env';
import { JWT_SECRET_EXPIRES_IN, TokenPayload } from 'server/auth';
import { User } from 'server/photon';
import { hash } from 'bcrypt';

export const signToken = (user: User): string => {
  const tokenPayload: TokenPayload = {
    userId: user.id,
  };

  return sign(tokenPayload, JWT_SECRET, {
    expiresIn: JWT_SECRET_EXPIRES_IN,
  });
};

export const hashPassword = async (password: string) => {
  return await hash(password, 10);
};
