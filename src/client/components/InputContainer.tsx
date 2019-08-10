import styled from 'styled-components';
import { Size, getSize, sizes, colors, border } from '~/client/styles';

export type InputContainerProps = {
  margin?: Size;
  padding?: Size;
};

export const InputContainer = styled.div<InputContainerProps>`
  margin: ${({ margin }) =>
    margin ? getSize(margin) : getSize({ bottom: 'md' })};
  padding: ${({ padding }) => (padding ? getSize(padding) : sizes.sm)};

  background: ${colors.base};
  border-radius: ${border.radius};

  display: flex;
  align-items: center;
`;
