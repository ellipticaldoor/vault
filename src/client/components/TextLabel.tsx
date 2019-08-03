import React from 'react';
import { Text } from 'client/components';
import { Size } from 'client/styles';

export type TextLabelProps = {
  children?: string | string[];
  bold?: boolean;
  margin?: Size;
};

export const TextLabel: React.FC<TextLabelProps> = ({
  children,
  bold,
  margin = { right: 'sm' },
  ...props
}) => {
  if (!children) {
    return null;
  }
  return (
    <Text {...props} margin={margin} bold={bold}>
      {children}
    </Text>
  );
};
