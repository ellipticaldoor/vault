import React, { useState } from 'react';
import { ScreenContainer, TextTitle, Text } from 'client/components';
import { Vault } from 'api';

export const Vaults: React.FC = () => {
  const [vaults] = useState<Vault[]>([]);

  return (
    <ScreenContainer>
      <TextTitle>Vaults</TextTitle>
      {vaults.map((vault) => (
        <Text key={vault.id}>{vault.id}</Text>
      ))}
    </ScreenContainer>
  );
};
