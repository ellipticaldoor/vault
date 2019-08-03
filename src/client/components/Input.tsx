import React from 'react';
import styled from 'styled-components';
import { sizes } from 'client/styles';

export type InputProps = React.ComponentProps<typeof InputContainer>;

export const DEFAULT_INPUT_WIDTH = '200px';

export const Input: React.FC<InputProps> = ({
  width = DEFAULT_INPUT_WIDTH,
  ...props
}) => {
  return <InputContainer {...props} width={width} />;
};

const InputContainer = styled.input`
  padding: ${sizes.xs};
  height: ${sizes.xxl};
  line-height: ${sizes.xxl};
  width: ${({ width }) => width};
`;
