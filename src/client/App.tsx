import 'normalize.css';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '~/client/apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import useGameState from '~/client/state';
import { routes } from '~/client/routes';
import { Nav, StatePanel } from '~/client/components';
import styled from 'styled-components';
import { GlobalStyle } from '~/client/styles';

export const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <useGameState.Provider>
        <GlobalStyle />
        <Router>
          <AppContainer>
            <Nav routes={routes} />
            <StatePanel />
            {routes.map((route) => (
              <Route {...route} />
            ))}
          </AppContainer>
        </Router>
      </useGameState.Provider>
    </ApolloProvider>
  );
};

const AppContainer = styled.div`
  display: flex;
  overflow: auto;
`;
