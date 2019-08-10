import React from 'react';
import styled from 'styled-components';
import { sizes, colors, border, outline } from '~/client/styles';

export type InputProps = React.ComponentProps<typeof StyledInput>;

export const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

export const DEFAULT_INPUT_WIDTH = '200px';

const StyledInput = styled.input`
  width: ${({ width }) => width || DEFAULT_INPUT_WIDTH};

  padding: ${sizes.xs};
  padding-right: 0px;
  background: ${colors.background};
  border: ${border.width};
  border-radius: ${border.radius};
  ${outline};
`;
