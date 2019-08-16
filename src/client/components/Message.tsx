import React from 'react';
import styled from 'styled-components';
import { Text } from '~/client/components';
import { colors, lighten, border, sizes } from '~/client/styles';

type MessageKind = 'info' | 'error';

export type MessageProps = {
  kind: MessageKind;
  label?: string;
  message?: string;
};

export const Message: React.FC<MessageProps> = ({ kind, label, message }) => {
  if (!label || !message) return null;

  return (
    <StyledMessage kind={kind}>
      <Text bold margin={{ bottom: 'sm' }} color={getMessageColor(kind).color}>
        {label}
      </Text>
      <Text>{message}</Text>
    </StyledMessage>
  );
};

const getMessageColor = (kind: MessageKind) => {
  if (kind === 'error') {
    return {
      color: colors.error,
      background: lighten(colors.error, 0.4),
    };
  }
  return {
    color: colors.secondary,
    background: lighten(colors.secondary, 0.6),
  };
};

const StyledMessage = styled.div<MessageProps>`
  background: ${({ kind }) => getMessageColor(kind).background};
  border: 3px solid ${({ kind }) => getMessageColor(kind).color};

  border-radius: ${border.radius};
  margin-bottom: ${sizes.md};
  padding: ${sizes.md};
`;
