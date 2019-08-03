import React from 'react';
import { TextLabel } from 'client/components';
import styled from 'styled-components';
import { sizes } from 'client/styles';

export type InputGroupProps = {
  label: string;
  children: any[];
};

export const InputGroup: React.FC<InputGroupProps> = ({ label, children }) => {
  return (
    <div>
      <TextLabel margin={{ bottom: 'md' }}>{label}</TextLabel>
      <InputGroupContainer>{children}</InputGroupContainer>
    </div>
  );
};

const InputGroupContainer = styled.div`
  margin-left: ${sizes.md};
`;
