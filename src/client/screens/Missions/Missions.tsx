import React from 'react';
import { ScreenContainer, TextTitle, Text } from '~/client/components';
import useGameState from '~/client/state';
import styled from 'styled-components';
import { sizes } from '~/client/styles';
import { MissionCard } from '~/client/screens/Missions/MissionCard';

export const Missions: React.FC = () => {
  const { state } = useGameState();
  const { missions } = state.myVault;

  const myMissions = [];
  const enemyMissions = [];

  return (
    <ScreenContainer>
      <TextTitle>Missions</TextTitle>

      <MissionsContainer>
        <MissionsRow>
          <Text>My missions</Text>
        </MissionsRow>

        <MissionsRow>
          <Text>Enemy missions</Text>
        </MissionsRow>
      </MissionsContainer>
    </ScreenContainer>
  );
};

const MissionsContainer = styled.div`
  display: flex;
`;

const MissionsRow = styled.div`
  padding: ${sizes.md} ${sizes.md} ${sizes.md} 0;

  display: flex;
  flex-direction: column;
  width: 100%;
`;
