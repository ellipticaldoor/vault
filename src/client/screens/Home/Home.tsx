import React from 'react';
import { ScreenContainer, Text, TextTitle } from '~/client/components';
import useGameStateContext from '~/client/state';

export const Home: React.FC = () => {
  const {
    state: { myVault },
  } = useGameStateContext();

  return (
    <ScreenContainer>
      <TextTitle>Home</TextTitle>
      <Text>
        Coordinate:
        {` x: ${myVault.x}, y: ${myVault.y}`}
      </Text>
    </ScreenContainer>
  );
};
