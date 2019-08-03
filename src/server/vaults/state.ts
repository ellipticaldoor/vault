import { Vault } from 'server/vaults';
import { ERROR } from 'server/language';
import {
  findOneState,
  queryState,
  setArrayState,
  addToArrayState,
} from 'server/state';

export const createVaults = () => {
  const vaults: Vault[] = [];

  return {
    vaults: () => vaults,
    findVault: findOneState(vaults, ERROR.VAULT_NOT_FOUND),
    queryVaults: queryState(vaults),
    setVaults: setArrayState(vaults),
    addVault: addToArrayState(vaults),
  };
};
