import Photon from '~/server/photon';
import { GameState } from '~/server/state';
import { ExpressContext, ApolloContext } from '~/server/apollo';

export const prepareContext = (gameState: GameState, photon: Photon) => async (
  context: ExpressContext,
): Promise<ApolloContext> => {
  return {
    ...context,
    gameState,
    photon,
  };
};
