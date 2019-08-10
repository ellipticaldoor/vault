import React from 'react';
import styled from 'styled-components';
import {
  Size,
  border,
  colors,
  getSize,
  lighten,
  outline,
} from '~/client/styles';

export type ButtonProps = {
  onClick: () => void;
  title: string;
  margin?: Size;
  padding?: Size;
  display?: 'block' | 'inline-block';
  width?: string;
};

export const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} children={props.title} />;
};

const DEFAULT_MARGIN = getSize({ bottom: 'md' });

const DEFAULT_PADDING = getSize({
  top: 'sm',
  bottom: 'sm',
  left: 'md',
  right: 'md',
});

const DEFAULT_WIDTH = 'auto';

const StyledButton = styled.button<ButtonProps>`
  margin: ${({ margin }) => (margin ? getSize(margin) : DEFAULT_MARGIN)};
  padding: ${({ padding }) => (padding ? getSize(padding) : DEFAULT_PADDING)};
  display: ${({ display }) => display || 'block'};
  width: ${({ width }) => width || DEFAULT_WIDTH};

  border: ${border.width};
  border-radius: ${border.radius};
  background: ${colors.primary};
  color: ${colors.background};

  cursor: pointer;
  appearance: none;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  transition: background 0.2s, border 0.2s, box-shadow 0.2s, color 0.2s;
  ${outline};

  &:hover {
    background: ${lighten(colors.primary, 0.4)};
  }

  &:active {
    background: ${lighten(colors.primary, 0.8)};
  }
`;
