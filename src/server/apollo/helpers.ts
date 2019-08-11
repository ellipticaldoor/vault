import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { logError } from '~/server/helpers';

export const formatError = (error: GraphQLError): GraphQLFormattedError => {
  logError(error);
  return error;
};
