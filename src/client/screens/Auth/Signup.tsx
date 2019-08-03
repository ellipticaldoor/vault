import React, { useState } from 'react';
import {
  ScreenContainer,
  TextTitle,
  Text,
  TextInput,
  Button,
} from 'client/components';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP, SignupMutation } from 'api';

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
      <Text>{`data - {"signup":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NTY5OGMzMC1iNWQxLTExZTktYWMyZi1mZmU4MzExMjBlNTAiLCJpYXQiOjE1NjQ4MjQ3MTAsImV4cCI6MTU2NzQxNjcxMH0.LAfPoYaqRMH9UGvRaotx8ietxmFhCYXzeMSu75u5TdI","user":{"id":"85698c30-b5d1-11e9-ac2f-ffe831120e50","__typename":"User"},"__typename":"AuthPayload"}}`}</Text>
    </ScreenContainer>
  );
};
