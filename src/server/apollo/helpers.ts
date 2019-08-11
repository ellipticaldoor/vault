import graphql from 'graphql';
import { logError } from '~/server/helpers';

export const formatError = (
  error: graphql.GraphQLError,
): graphql.GraphQLFormattedError => {
  // eslint-disable-next-line no-console
  logError(error);

  return graphql.formatError(error);
};
