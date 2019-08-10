import ApolloClient from 'apollo-boost';
import { API_ENDPOINT } from '~/client/env';

export const apolloClient = new ApolloClient({
  uri: API_ENDPOINT,
});
