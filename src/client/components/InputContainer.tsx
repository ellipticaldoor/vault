import styled from 'styled-components';
import { Size, getSize, sizes } from 'client/styles';
import { colors } from 'client/colors';

export const InputContainer = styled.div<{ margin?: Size; padding?: Size }>`
  display: flex;
  align-items: center;
  margin: ${({ margin }) =>
    margin ? getSize(margin) : getSize({ bottom: 'md' })};
  padding: ${({ padding }) => (padding ? getSize(padding) : sizes.sm)};
  background: ${colors.base};
`;
