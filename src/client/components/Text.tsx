import React from 'react';
import styled from 'styled-components';
import { Size, SizeType, getSize, sizes } from 'client/styles';

export type TextProps = {
  children: string | string[];
  margin?: Size;
  padding?: Size;
  bold?: boolean;
  fontSize?: SizeType;
};

export const Text: React.FC<TextProps> = (props) => {
  return <TextContainer {...props} />;
};

const TextContainer = styled.div<{
  margin?: Size;
  padding?: Size;
  bold?: boolean;
  fontSize?: SizeType;
}>`
  margin: ${({ margin }) => getSize(margin)};
  padding: ${({ padding }) => getSize(padding)};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-size: ${({ fontSize }) => (fontSize ? getSize(fontSize) : sizes.md)};
  word-wrap: break-word;
`;