import React from 'react';
import { Text } from '~/client/components';
import styled from 'styled-components';
import { sizes, colors, border } from '~/client/styles';
import { Mission } from '~/client/state/types';
import { ticksToTime } from '~/helpers';

export type MissionCardProps = {
  mission: Mission;
  ticks: number;
};

export const MissionCard: React.FC<MissionCardProps> = ({ mission, ticks }) => {
  return (
    <StyledMissionCard>
      <Row>
        <Text>An {mission.kind} from</Text>
        <Value>
          {mission.from.x.toString()}x {mission.from.y.toString()}y
        </Value>
      </Row>
      <Row>
        <Text>Will arrive to</Text>
        <Value>
          {mission.to.x.toString()}x {mission.to.y.toString()}y
        </Value>
        <Text>in</Text>
        <Value>{ticksToTime(mission.arrivalTick - ticks)}</Value>
      </Row>
    </StyledMissionCard>
  );
};

const StyledMissionCard = styled.div`
  padding: ${sizes.sm} ${sizes.sm} 0 ${sizes.sm};
  margin-bottom: ${sizes.md};
  background: ${colors.base};
  border-radius: ${border.radius};
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: ${sizes.sm};
`;

const Value = styled.div`
  background: ${colors.background};
  padding: ${sizes.xs};
  margin: 0 ${sizes.sm};
  border-radius: ${border.radius};
`;
