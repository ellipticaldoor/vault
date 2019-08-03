import React from 'react';
import { TextLabel } from 'client/components';
import styled from 'styled-components';
import { sizes } from 'client/styles';
import { colors } from 'client/colors';

export type InputGroupProps = {
  label: string;
  children: any[];
};

export const InputGroup: React.FC<InputGroupProps> = ({ label, children }) => {
  return (
    <InputGroupContainer>
      <TextLabel margin={{ bottom: 'md' }}>{label}</TextLabel>
      {children}
    </InputGroupContainer>
  );
};

const InputGroupContainer = styled.div`
  background: ${colors.lightBase};
  padding: ${sizes.sm} 0px 0px ${sizes.sm};
`;
