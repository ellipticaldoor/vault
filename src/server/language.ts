import { Coordinate } from 'server/game';

export const ERROR = {
  INVALID_TOKEN: 'Invalid token',
  AUTH_ERROR: 'User is not authenticated',
  WRONG_USERNAME_OR_PASSWORD: 'The username or the password is invalid',
  USERNAME_ALREADY_EXISTS: (username: string) =>
    `Username "${username}" already exists`,
  COORDINATE_ALREADY_IN_USE: ({ x, y }: Coordinate) =>
    `The coordinate x:${x}, y:${y} is already in use`,
  MISSION_DESTINATION_CANT_BE_EQUAL_TO_DEPARTURE:
    "Mission destination can't be equal to departure",
  NOT_ENOUGH_RESOURCES_TO_CREATE_THE_MISSION:
    'Not enough resources to create the mission',
  NOT_ENOUGH_RESOURCES_TO_UPDATE: 'Not enough resources to update',
  VALUE_IS_NOT_STRING: 'Value is not a "string"',
  INVALID_USERNAME: 'Invalid username',
  VAULT_NOT_FOUND: 'Vault not found',
  MISSION_NOT_FOUND: 'Mission not found',
  USER_NOT_FOUND: 'User not found',
  RESOURCE_NOT_FOUND: 'Resource not found',
  GAMESTATE_NOT_FOUND: 'Game state not found',
  FACILITY_NOT_FOUND: 'Facility not found',
  RESOURCE_MUST_BE_NUMBER: 'A resource must be number',
};
