import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'client/routes';
import styled from 'styled-components';
import { sizes } from 'client/styles';

export type NavProps = {
  routes: Route[];
};

export const Nav: React.FC<NavProps> = ({ routes }) => {
  return (
    <List>
      {routes.map(({ path, key }) => (
        <StyledLink key={key} to={path}>
          {key}
        </StyledLink>
      ))}
    </List>
  );
};

export const NAV_WIDTH = '200px';

const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${sizes.md};
  min-width: ${NAV_WIDTH};
  max-width: ${NAV_WIDTH};
`;

const StyledLink = styled(Link)`
  margin-bottom: ${sizes.md};
`;