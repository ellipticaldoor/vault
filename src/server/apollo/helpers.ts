import { GraphQLFormattedError } from 'graphql/error/formatError';

export const formatError = (
  error: GraphQLFormattedError,
): GraphQLFormattedError => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(error, null, 2));

  return {
    path: error.path,
    locations: error.locations,
    message: error.message,
  };
};
