import React from 'react';
import { Text } from '~/client/components';
import styled from 'styled-components';
import { sizes } from '~/client/styles';

export type MissionCardProps = {};

export const MissionCard: React.FC<MissionCardProps> = (props) => {
  return (
    <StyledMissionCard>
      <Text>Mission Card</Text>
    </StyledMissionCard>
  );
};

const StyledMissionCard = styled.div`
  padding: ${sizes.md};
  margin: ${sizes.md};
`;
