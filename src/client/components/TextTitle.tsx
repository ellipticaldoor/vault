import React from 'react';
import { Text } from 'client/components';

export type TextTitleProps = {
  children: string | string[];
};

export const TextTitle: React.FC<TextTitleProps> = (props) => {
  return <Text {...props} fontSize="lg" margin={{ bottom: 'lg' }} />;
};
