import styled from 'styled-components';
import { Size, getSize, sizes, colors } from 'client/styles';

export const InputContainer = styled.div<{ margin?: Size; padding?: Size }>`
  display: flex;
  align-items: center;
  margin: ${({ margin }) =>
    margin ? getSize(margin) : getSize({ bottom: 'md' })};
  padding: ${({ padding }) => (padding ? getSize(padding) : sizes.sm)};
  background: ${colors.base};
`;
