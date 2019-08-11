import React, { useState } from 'react';
import {
  ScreenContainer,
  TextTitle,
  Text,
  TextInput,
  Button,
} from '~/client/components';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP, SignupMutation } from '~/api';

export const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { error, data }] = useMutation<SignupMutation>(SIGNUP, {
    variables: {
      data: { username, password },
    },
  });

  return (
    <ScreenContainer>
      <TextTitle>Signup</TextTitle>
      <TextInput label="username" value={username} onChange={setUsername} />
      <TextInput
        label="password"
        value={password}
        onChange={setPassword}
        password
      />
      <Button
        title="Create new account"
        onClick={() => {
          signup();
        }}
      />
      <Text>error - {JSON.stringify(error)}</Text>
      <Text>data - {JSON.stringify(data)}</Text>
    </ScreenContainer>
  );
};
