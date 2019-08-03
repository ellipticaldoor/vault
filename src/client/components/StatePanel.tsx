import React from 'react';
import useGameStateContext from 'client/state';
import { Text } from 'client/components';
import styled from 'styled-components';
import { sizes } from 'client/styles';

export const StatePanel: React.FC = () => {
  const { state } = useGameStateContext();

  const stateInfo = [
    { title: 'ticks', amount: state.ticks },
    { title: 'dwellers', amount: state.myVault.resource.dwellers },
    { title: 'iron', amount: state.myVault.resource.iron },
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

export const STATE_PANEL_WIDTH = '200px';

const StatePanelContainer = styled.div`
  padding: ${sizes.md};
  min-width: ${STATE_PANEL_WIDTH};
  max-width: ${STATE_PANEL_WIDTH};

  display: flex;
  flex-direction: column;
`;

const Info = styled.div`
  margin-bottom: ${sizes.md};

  display: flex;
  flex-direction: column;
`;
