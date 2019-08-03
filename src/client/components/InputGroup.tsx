import React from 'react';
import { TextLabel } from 'client/components';
import styled from 'styled-components';
import { sizes, colors } from 'client/styles';

export type InputGroupProps = {
  label: string;
  children: any[];
};

export const InputGroup: React.FC<InputGroupProps> = ({ label, children }) => {
  return (
    <StyledInputGroup>
      <TextLabel margin={{ bottom: 'md' }}>{label}</TextLabel>
      {children}
    </StyledInputGroup>
  );
};

const StyledInputGroup = styled.div`
  background: ${colors.lightBase};
  padding: ${sizes.sm} 0px 0px ${sizes.sm};
`;
