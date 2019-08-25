import React from 'react';
import { ScreenContainer, Text, TextTitle } from '~/client/components';
import { useGameStateContext } from '~/client/state';

export const Resources: React.FC = () => {
  const { myVault } = useGameStateContext();

  return (
    <ScreenContainer>
      <TextTitle>Resources</TextTitle>
      <Text>{JSON.stringify(myVault.resources)}</Text>
    </ScreenContainer>
  );
};
