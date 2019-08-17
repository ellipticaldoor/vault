import React, { useState } from 'react';
import {
  ScreenContainer,
  TextTitle,
  InputText,
  Button,
} from '~/client/components';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenContainer>
      <TextTitle>{'Welcome back :)'}</TextTitle>
      <InputText label="username" value={username} onChange={setUsername} />
      <InputText label="password" value={password} onChange={setPassword} />
      <Button title="Login" onClick={() => {}} />
    </ScreenContainer>
  );
};
