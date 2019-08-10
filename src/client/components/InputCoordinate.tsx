import React from 'react';
import { TextLabel, InputNumber, InputContainer } from '~/client/components';
import { Size } from '~/client/styles';

export type CoordinateInputProps = {
  label: string;
  x: number;
  setX: (x: number) => void;
  y: number;
  setY: (y: number) => void;
  margin?: Size;
};

const INPUT_WIDTH = '80px';

export const InputCoordinate: React.FC<CoordinateInputProps> = (props) => {
  return (
    <InputContainer margin={props.margin}>
      <TextLabel margin={{ right: 'md' }}>{props.label}</TextLabel>
      <InputNumber
        label="x"
        value={props.x}
        onChange={props.setX}
        margin="none"
        padding="none"
        inputWidth={INPUT_WIDTH}
      />
      <InputNumber
        label="y"
        value={props.y}
        onChange={props.setY}
        margin={{ left: 'md' }}
        padding="none"
        inputWidth={INPUT_WIDTH}
      />
    </InputContainer>
  );
};
