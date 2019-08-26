import React from 'react';
import { ScreenContainer, Text, TextTitle } from '~/client/components';
import { useGameStateContext } from '~/client/state';
import styled from 'styled-components';
import { ResourceColor, resourceColors, sizes, colors } from '~/client/styles';

export const Resources: React.FC = () => {
  const { myVault } = useGameStateContext();

  return (
    <ScreenContainer>
      <TextTitle>Resources</TextTitle>
      <ResourceList>
        <Resource>
          <ResourcePicture background={'iron'} />
          <Text bold>Iron</Text>
          <Text>{myVault.resources.iron.toString()}</Text>
        </Resource>
        <Resource>
          <ResourcePicture background={'dwellers'} />
          <Text bold>Dwellers</Text>
          <Text>{myVault.resources.dwellers.toString()}</Text>
        </Resource>
      </ResourceList>
    </ScreenContainer>
  );
};

const ResourceList = styled.div`
  display: flex;
`;

const Resource = styled.div`
  padding: ${sizes.sm};
  margin-right: ${sizes.sm};
  border: 1px solid ${colors.base};

  display: flex;
  flex-direction: column;
`;

const ResourcePicture = styled.div<{ background: ResourceColor }>`
  background: ${({ background }) => resourceColors[background]};
  margin-bottom: ${sizes.xs};
  width: 100px;
  height: 100px;
`;
