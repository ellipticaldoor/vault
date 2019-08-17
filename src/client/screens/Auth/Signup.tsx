import React, { useState } from 'react';
import {
  ScreenContainer,
  TextTitle,
  TextInput,
  Button,
  ErrorMessage,
} from '~/client/components';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP, SignupMutation } from '~/api';

export const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { data, error }] = useMutation<SignupMutation>(SIGNUP, {
    variables: {
      data: { username, password },
    },
  });

  const submit = async () => {
    try {
      await signup();
    } catch (e) {}
    // TODO: handle data
  };

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
      <Button title="Create new account" onClick={() => submit()} />
      <ErrorMessage label="Signup error" message={error} />
    </ScreenContainer>
  );
};
