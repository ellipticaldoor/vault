import React from 'react';
import { NavLink } from 'react-router-dom';
import { Route } from '~/client/routes';
import styled from 'styled-components';
import { sizes } from '~/client/styles';

export type NavProps = {
  routes: Route[];
};

export const Nav: React.FC<NavProps> = ({ routes }) => {
  return (
    <List>
      {routes.map(({ path, key }) => (
        <StyledLink
          key={key}
          to={path}
          exact
          activeStyle={{
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
        >
          {key}
        </StyledLink>
      ))}
    </List>
  );
};

export const NAV_WIDTH = 200;

const List = styled.div`
  padding: ${sizes.md};
  min-width: ${NAV_WIDTH}px;
  max-width: ${NAV_WIDTH}px;

  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(NavLink)`
  margin-bottom: ${sizes.md};
`;
