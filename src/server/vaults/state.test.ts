import { createGameState } from '~/server/state';
import cases from 'jest-in-case';
import { createVault } from '~/server/vaults';

cases(
  'findVaultBy',
  ({ shouldError }) => {
    const gameState = createGameState();

    const vault = createVault(gameState, {
      coordinate: { x: 0, y: 0 },
    });

    const vaultId = shouldError ? 'invalid-vault-id' : vault.id;

    try {
      const expectedVault = gameState.findVault({ id: vaultId });

      if (shouldError) {
        fail('findVaultBy should throw an error if the vault is not there');
      }

      expect(vault.id).toEqual(expectedVault.id);
    } catch (error) {
      expect(error).toEqual(expect.any(Error));
    }
  },
  {
    'finds a vault that is present on the gameState': {
      shouldError: false,
    },
    "throws an error when the vault doesn't exists": {
      shouldError: true,
    },
  },
);
