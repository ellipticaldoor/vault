import React from 'react';
import styled from 'styled-components';
import { Size, SizeType, getSize, sizes, colors, Color } from '~/client/styles';

export type TextProps = {
  children?: string | string[];
  margin?: Size;
  padding?: Size;
  bold?: boolean;
  fontSize?: SizeType;
  color?: Color;
};

export const Text: React.FC<TextProps> = (props) => {
  if (!props.children) return null;

  return <StyledText {...props} />;
};

const StyledText = styled.div<TextProps>`
  margin: ${({ margin }) => getSize(margin)};
  padding: ${({ padding }) => getSize(padding)};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-size: ${({ fontSize }) => (fontSize ? getSize(fontSize) : sizes.md)};
  color: ${({ color }) => (color ? colors[color] : colors.text)};

  word-wrap: break-word;
`;
