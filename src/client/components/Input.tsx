import React from 'react';
import styled from 'styled-components';
import { sizes } from 'client/styles';
import { colors } from 'client/colors';

export type InputProps = React.ComponentProps<typeof StyledInput>;

export const DEFAULT_INPUT_WIDTH = '200px';

export const Input: React.FC<InputProps> = ({
  width = DEFAULT_INPUT_WIDTH,
  ...props
}) => {
  return <StyledInput {...props} width={width} />;
};

const StyledInput = styled.input`
  padding: ${sizes.xs};
  height: ${sizes.xxl};
  line-height: ${sizes.xxl};
  width: ${({ width }) => width};
  border: 0;
  background: ${colors.background};
`;
