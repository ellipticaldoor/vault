import React, { useState } from 'react';
import { ScreenContainer, TextTitle, ListMissions } from '~/client/components';
import { Mission } from '~/api';

export const Missions: React.FC = () => {
  const [missions] = useState<Mission[]>([]);

  return (
    <ScreenContainer>
      <TextTitle>Missions</TextTitle>
      <ListMissions missions={missions} />
    </ScreenContainer>
  );
};
