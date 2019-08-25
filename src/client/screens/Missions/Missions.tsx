import React from 'react';
import { ScreenContainer, TextTitle, Text } from '~/client/components';
import useGameState from '~/client/state';
import styled from 'styled-components';
import { sizes } from '~/client/styles';
import { MissionCard } from '~/client/screens/Missions/MissionCard';

export const Missions: React.FC = () => {
  const { myVault, ticks } = useGameState();

  const myMissions = myVault.missions.filter(
    ({ from }) => from.id === myVault.id,
  );
  const enemyMissions = myVault.missions.filter(
    ({ to }) => to.id === myVault.id,
  );

  return (
    <ScreenContainer>
      <TextTitle>Missions</TextTitle>

      <MissionsContainer>
        <MissionsRow>
          <Text margin={{ bottom: 'md' }}>My missions</Text>
          {myMissions.map((mission) => (
            <MissionCard mission={mission} ticks={ticks} />
          ))}
        </MissionsRow>

        <MissionsRow>
          <Text margin={{ bottom: 'md' }}>Enemy missions</Text>
          {enemyMissions.map((mission) => (
            <MissionCard mission={mission} ticks={ticks} />
          ))}
        </MissionsRow>
      </MissionsContainer>
    </ScreenContainer>
  );
};

const MissionsContainer = styled.div`
  display: flex;
`;

const MissionsRow = styled.div`
  padding: 0 ${sizes.md} ${sizes.md} 0;

  display: flex;
  flex-direction: column;
  width: 100%;
`;
