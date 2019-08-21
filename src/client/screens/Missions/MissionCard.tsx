import React from 'react';
import { Text } from '~/client/components';
import styled from 'styled-components';
import { sizes, colors, border } from '~/client/styles';
import { Mission } from '~/client/state/types';

export type MissionCardProps = {
  mission: Mission;
};

export const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  return (
    <StyledMissionCard>
      <Text margin={{ bottom: 'sm' }}>{mission.kind}</Text>
      <Coordinates>
        <Text>from</Text>
        <CoordinateValue>
          x {mission.from.x.toString()} y {mission.from.y.toString()}
        </CoordinateValue>
        <Text>to</Text>
        <CoordinateValue>
          x {mission.to.x.toString()} y {mission.to.y.toString()}
        </CoordinateValue>
      </Coordinates>
    </StyledMissionCard>
  );
};

const StyledMissionCard = styled.div`
  padding: ${sizes.sm};
  margin-bottom: ${sizes.md};
  background: ${colors.base};
  border-radius: ${border.radius};
`;

const Coordinates = styled.div`
  display: flex;
  align-items: center;
`;

const CoordinateValue = styled.div`
  background: ${colors.background};
  padding: ${sizes.xs};
  margin: 0 ${sizes.sm} 0 ${sizes.xs};
  border-radius: ${border.radius};
`;
