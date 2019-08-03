import React, { useState } from 'react';
import {
  ScreenContainer,
  TextTitle,
  TextInput,
  Button,
} from 'client/components';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('ellipticaldoor');
  const [password, setPassword] = useState('');

  return (
    <ScreenContainer>
      <TextTitle>Login</TextTitle>
      <TextInput label="username" value={username} onChange={setUsername} />
      <TextInput label="password" value={password} onChange={setPassword} />
      <Button title="submit" onClick={() => {}} />
    </ScreenContainer>
  );
};
