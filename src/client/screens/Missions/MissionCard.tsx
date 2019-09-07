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
  if (mission.comebackTick < ticks) {
    return null;
  }

  const resources = Object.entries(mission.resources);
  const renderResources = resources.length > 0 && (
    <Row>
      <Text>With</Text>
      {resources.map(([name, value], index) => (
        <Resource key={index}>
          <Value>{value}</Value>
          <Text>{name}</Text>
          {index !== resources.length - 1 && <Text>,</Text>}
        </Resource>
      ))}
    </Row>
  );

  const isMissionCommingBack = ticks > mission.arrivalTick;

  const renderArrivalInfo = isMissionCommingBack ? (
    <Row>
      <Text>Will arrive back home in</Text>
      <Value>{ticksToTime(mission.comebackTick - ticks)}</Value>
      {/* TODO: display link to see combat report */}
    </Row>
  ) : (
    <Row>
      <Text>Will arrive to</Text>
      <Value>
        {mission.to.x.toString()}x {mission.to.y.toString()}y
      </Value>
      <Text>in</Text>
      <Value>{ticksToTime(mission.arrivalTick - ticks)}</Value>
    </Row>
  );

  return (
    <StyledMissionCard>
      <Row>
        <Text>An {mission.kind} from</Text>
        <Value>
          {mission.from.x.toString()}x {mission.from.y.toString()}y
        </Value>
      </Row>
      {renderArrivalInfo}
      {renderResources}
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

const Resource = styled.div`
  display: flex;
  align-items: center;
`;
