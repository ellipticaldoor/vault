import styled from 'styled-components';
import { Size, getSize } from 'client/styles';

export const InputContainer = styled.div<{ margin?: Size }>`
  display: flex;
  align-items: center;
  margin: ${({ margin }) =>
    margin ? getSize(margin) : getSize({ bottom: 'md' })};
`;
