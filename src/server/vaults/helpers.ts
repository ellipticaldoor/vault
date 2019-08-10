import { ID, Coordinate } from '~/server/game';
import { Vault, VAULT_DEFAULT_RESOURCE } from '~/server/vaults';
import { GameState } from '~/server/state';
import { createId } from '~/server/helpers';
import { ERROR } from '~/server/language';

export const randomInt = (limit: number) => {
  const int = Math.floor(Math.random() * limit) + 0;
  const randomSign = Math.floor(Math.random() * 2) === 1 ? 1 : -1;
  return int * randomSign;
};

// Rate has to be greater than one
const MAP_EXPANSION_RATE = 1.5;

export const createCoordinate = (vaultLength: number): Coordinate => {
  return {
    x: randomInt(vaultLength * MAP_EXPANSION_RATE),
    y: randomInt(vaultLength * MAP_EXPANSION_RATE),
  };
};

export const isCoordinateUnique = (
  vaults: Vault[],
  newCoordinate: Coordinate,
) => {
  let isUnique = true;

  vaults.some(({ x, y }) => {
    if (newCoordinate.x === x && newCoordinate.y === y) {
      isUnique = false;
      return true;
    }
    return false;
  });

  return isUnique;
};

export const createUniqueCoordinate = (gameState: GameState): Coordinate => {
  const vaults = gameState.vaults();
  let newCoordinate = createCoordinate(vaults.length);
  let coordinateIsUnique = isCoordinateUnique(vaults, newCoordinate);

  while (!coordinateIsUnique) {
    newCoordinate = createCoordinate(vaults.length);
    coordinateIsUnique = isCoordinateUnique(vaults, newCoordinate);
  }

  return newCoordinate;
};

export const validateCreateVaultArgs = (
  gameState: GameState,
  { coordinate }: CreateVaultArgs,
) => {
  if (coordinate) {
    const vaults = gameState.vaults();
    const coordinateIsUnique = isCoordinateUnique(vaults, coordinate);

    if (!coordinateIsUnique) {
      throw new Error(ERROR.COORDINATE_ALREADY_IN_USE(coordinate));
    }
  }
};

type CreateVaultArgs = {
  coordinate?: Coordinate;
  userId?: ID;
};

export const createVault = (gameState: GameState, args?: CreateVaultArgs) => {
  if (args) {
    validateCreateVaultArgs(gameState, args);
  }

  let { coordinate, userId } = args ? args : ({} as CreateVaultArgs);
  coordinate = coordinate ? coordinate : createUniqueCoordinate(gameState);

  const resource = gameState.addResource({
    id: createId(),
    dwellers: VAULT_DEFAULT_RESOURCE.dwellers,
    iron: VAULT_DEFAULT_RESOURCE.iron,
  });

  const facility = gameState.addFacility({
    id: createId(),
    ironMine: 0,
  });

  const vault = gameState.addVault({
    id: createId(),
    createdAtTick: gameState.ticks(),
    facilityId: facility.id,
    resourceId: resource.id,
    userId: userId ? userId : null,
    ...coordinate,
  });

  return vault;
};
