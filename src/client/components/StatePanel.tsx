import React from 'react';
import useGameStateContext from '~/client/state';
import { Text } from '~/client/components';
import styled from 'styled-components';
import { sizes } from '~/client/styles';

export const StatePanel: React.FC = () => {
  const { state } = useGameStateContext();

  const stateInfo = [
    { title: 'dwellers', amount: state.myVault.resources.dwellers },
    { title: 'iron', amount: state.myVault.resources.iron },
  ];

  return (
    <StatePanelContainer>
      {stateInfo.map(({ title, amount }, index) => (
        <Info key={index}>
          <Text bold>{title}</Text>
          <Text>{amount.toString()}</Text>
        </Info>
      ))}
    </StatePanelContainer>
  );
};

export const STATE_PANEL_WIDTH = 200;

const StatePanelContainer = styled.div`
  padding: ${sizes.md};
  min-width: ${STATE_PANEL_WIDTH}px;
  max-width: ${STATE_PANEL_WIDTH}px;

  display: flex;
  flex-direction: column;
`;

const Info = styled.div`
  margin-bottom: ${sizes.md};

  display: flex;
  flex-direction: column;
`;
