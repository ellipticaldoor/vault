export const NODE_ENV = process.env.NODE_ENV || 'development';

export const API_HOST = process.env.API_HOST || 'localhost';

export const API_PORT = parseInt(process.env.API_PORT || '8080', 10);

export const API_PREFIX = process.env.API_PREFIX || 'api';

export const API_ENDPOINT =
  process.env.API_ENDPOINT || 'http://localhost:8080/graphql';

export const JWT_SECRET =
  process.env.JWT_SECRET || 'jwt_secret_for_development';
