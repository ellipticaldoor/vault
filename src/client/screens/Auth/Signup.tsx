import React, { useState } from 'react';
import {
  ScreenContainer,
  TextTitle,
  TextInput,
  Button,
  Message,
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
      <Message
        kind="info"
        label="Some info"
        message="Something happened and this is just some info"
      />
      <Message
        kind="error"
        label="Some error"
        message="Something happened and this is just some error"
      />
    </ScreenContainer>
  );
};
