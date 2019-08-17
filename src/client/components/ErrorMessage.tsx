import React from 'react';
import styled from 'styled-components';
import { Text } from '~/client/components';
import { colors, lighten, border, sizes } from '~/client/styles';

const stripApolloErrorMessage = (message: string) =>
  message.replace('GraphQL error: ', '');

export type ErrorMessage = string | { message: string };

export type MessageProps = {
  label?: string;
  message?: ErrorMessage;
};

export const ErrorMessage: React.FC<MessageProps> = ({ label, message }) => {
  if (!message) return null;

  const finalMessage =
    typeof message === 'object'
      ? stripApolloErrorMessage(message.message)
      : message;

  return (
    <StyledErrorMessage>
      {label ? (
        <Text bold margin={{ bottom: 'sm' }} color={colors.error}>
          {label}
        </Text>
      ) : null}

      <Text>{finalMessage}</Text>
    </StyledErrorMessage>
  );
};

const StyledErrorMessage = styled.div<MessageProps>`
  background: ${lighten(colors.error, 0.4)};
  border: 3px solid ${colors.error};

  border-radius: ${border.radius};
  margin-bottom: ${sizes.md};
  padding: ${sizes.md};
`;
